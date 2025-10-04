import * as xlsx from 'xlsx';

export const csvToJson = (file, quizId) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                
                const binaryString = e.target.result;

                const workbook = xlsx.read(binaryString, { type: 'binary' });

                const sheetName = workbook.SheetNames[0];
                const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

                const formattedData = jsonData.map((row) => ({
                    quizId,
                    question: row['question'],
                    marks: row['marks'],
                    negative: row['negative'] || 0,
                    category: "MCQ",
                    options: [
                        { text: row['option1'], isCorrect: true },
                        { text: row['option2'], isCorrect: false },
                        { text: row['option3'], isCorrect: false },
                        { text: row['option4'], isCorrect: false },
                    ],
                }));
                console.log(formattedData)
                resolve(formattedData);
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsBinaryString(file);
    });
};


export const jsonToFormattedData = (file, quizId) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target.result;
        const jsonData = JSON.parse(content);

        if (!Array.isArray(jsonData)) {
          return reject(new Error('JSON should be an array of questions.'));
        }

        const formattedData = jsonData.map((row, index) => {
          if (!row.question || !row.category || typeof row.marks !== 'number') {
            throw new Error(`Invalid or missing fields in question ${index + 1}`);
          }

          const common = {
            quizId,
            question: row.question,
            category: row.category,
            marks: row.marks,
            negative: Math.abs(row.negative || 0), // ensure negative mark is negative
          };

          if (row.category === 'Text') {
            if (!row.answer || typeof row.answer !== 'string') {
              throw new Error(`Missing or invalid answer in question ${index + 1}`);
            }

            return {
              ...common,
              answer: row.answer
            };
          } else if (row.category === 'MCQ' || row.category === 'MSQ') {
            if (
              !Array.isArray(row.options) ||
              row.options.length < 2 ||
              row.options.some(opt => typeof opt.text !== 'string' || typeof opt.isCorrect !== 'boolean')
            ) {
              throw new Error(`Invalid options in question ${index + 1}`);
            }

            return {
              ...common,
              options: row.options
            };
          } else {
            throw new Error(`Unsupported category '${row.category}' in question ${index + 1}`);
          }
        });

        resolve(formattedData);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsText(file);
  });
};

