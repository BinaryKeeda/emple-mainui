// // utils/aikenParser.js

// /**
//  * Parse Aiken format text into schema used by the backend
//  * Supports MCQ, MSQ, Text questions + MARKS and NEGATIVE
//  * @param {string} text - Raw Aiken format string
//  * @returns {Array} Parsed question objects
//  */
// export function parseAikenFormat(text) {
//   const lines = text
//     .split(/\r?\n/)
//     .map((l) => l.trim())
//     .filter((l) => l.length > 0)

//   const questions = []
//   let currentQ = null
//   let options = []
//   let marks = 1
//   let negative = 0

//   const flushQuestion = () => {
//     if (!currentQ) return

//     if (options.length > 0) {
//       const correctOptions = options.filter((o) => o.isAnswer)
//       if (correctOptions.length === 0) {
//         throw new Error(`No ANSWER specified for question: "${currentQ}"`)
//       }
//       const category = correctOptions.length > 1 ? 'MSQ' : 'MCQ'
//       questions.push({
//         question: currentQ,
//         category,
//         marks,
//         negative,
//         options: options.map((o) => ({
//           text: o.text,
//           isCorrect: o.isAnswer
//         }))
//       })
//     } else if (currentQ.answerText) {
//       questions.push({
//         question: currentQ.text,
//         category: 'Text',
//         marks,
//         negative,
//         answer: currentQ.answerText
//       })
//     }

//     // reset
//     currentQ = null
//     options = []
//     marks = 1
//     negative = 0
//   }

//   for (let i = 0; i < lines.length; i++) {
//     const line = lines[i]

//     // Option line
//     const matchOption = line.match(/^([A-Z])\.\s+(.*)$/)
//     if (matchOption) {
//       options.push({ key: matchOption[1], text: matchOption[2], isAnswer: false })
//       continue
//     }

//     // Answer line
//     const matchAnswer = line.match(/^ANSWER:\s*(.+)$/i)
//     if (matchAnswer) {
//       const answerVal = matchAnswer[1].trim()
//       if (options.length > 0) {
//         const correctKeys = answerVal.split(',').map((a) => a.trim().charAt(0).toUpperCase())
//         correctKeys.forEach((key) => {
//           const found = options.find((o) => o.key === key)
//           if (!found) throw new Error(`Invalid ANSWER key: ${key} in question "${currentQ}"`)
//           found.isAnswer = true
//         })
//       } else if (currentQ) {
//         currentQ = { text: currentQ, answerText: answerVal }
//       }
//       continue
//     }

//     // Marks line
//     const matchMarks = line.match(/^MARKS:\s*([0-9]+(?:\.[0-9]+)?)$/i)
//     if (matchMarks) {
//       marks = parseFloat(matchMarks[1])
//       continue
//     }

//     // Negative line
//     const matchNegative = line.match(/^NEGATIVE:\s*(-?[0-9]+(?:\.[0-9]+)?)$/i)
//     if (matchNegative) {
//       negative = parseFloat(matchNegative[1])
//       continue
//     }

//     // New question
//     if (currentQ) flushQuestion()
//     currentQ = line
//   }

//   flushQuestion()
//   return questions
// }

// utils/aikenParser.js

/**
 * Parse Aiken format text into schema used by the backend
 * Supports MCQ, MSQ, Text questions + MARKS and NEGATIVE
 * Allows multi-line questions
 * @param {string} text - Raw Aiken format string
 * @returns {Array} Parsed question objects
 */
export function parseAikenFormat(text) {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0)

  const questions = []
  let questionBuffer = []
  let options = []
  let marks = 1
  let negative = 0
  let answerText = null

  const flushQuestion = () => {
    if (questionBuffer.length === 0) return

    const qText = questionBuffer.join("\n").trim()

    if (options.length > 0) {
      const correctOptions = options.filter((o) => o.isAnswer)
      if (correctOptions.length === 0) {
        throw new Error(`No ANSWER specified for question: "${qText}"`)
      }
      const category = correctOptions.length > 1 ? "MSQ" : "MCQ"
      questions.push({
        question: qText,
        category,
        marks,
        negative,
        options: options.map((o) => ({
          text: o.text,
          isCorrect: o.isAnswer,
        })),
      })
    } else if (answerText !== null) {
      questions.push({
        question: qText,
        category: "Text",
        marks,
        negative,
        answer: answerText,
      })
    }

    // reset
    questionBuffer = []
    options = []
    marks = 1
    negative = 0
    answerText = null
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Option line
    const matchOption = line.match(/^([A-Z])\.\s+(.*)$/)
    if (matchOption) {
      options.push({ key: matchOption[1], text: matchOption[2], isAnswer: false })
      continue
    }

    // Answer line
    const matchAnswer = line.match(/^ANSWER:\s*(.+)$/i)
    if (matchAnswer) {
      const answerVal = matchAnswer[1].trim()
      if (options.length > 0) {
        const correctKeys = answerVal
          .split(",")
          .map((a) => a.trim().charAt(0).toUpperCase())
        correctKeys.forEach((key) => {
          const found = options.find((o) => o.key === key)
          if (!found) throw new Error(`Invalid ANSWER key: ${key} in question "${questionBuffer.join(" ")}"`)
          found.isAnswer = true
        })
      } else {
        answerText = answerVal
      }
      continue
    }

    // Marks line
    const matchMarks = line.match(/^MARKS:\s*([0-9]+(?:\.[0-9]+)?)$/i)
    if (matchMarks) {
      marks = parseFloat(matchMarks[1])
      continue
    }

    // Negative line
    const matchNegative = line.match(/^NEGATIVE:\s*(-?[0-9]+(?:\.[0-9]+)?)$/i)
    if (matchNegative) {
      negative = parseFloat(matchNegative[1])
      // 🔑 End of question block → flush here
      flushQuestion()
      continue
    }

    // Normal question text (multi-line supported)
    questionBuffer.push(line)
  }

  // Flush last question if exists
  flushQuestion()

  return questions
}

