import { useCallback } from "react"
import axios from "axios"
import {  encodeBase64, fetchResultsInBatches } from "./codeUtils"
import { BASE_URL } from "../../../lib/config"
const getLanguageId = lang => {
  const map = {
    cpp: 54,
    c: 50,
    java: 62,
    python: 71
  }
  return map[lang] || 71
}

export const useCodeExecutor = ({ CODE_EXECUTION_API, headers ,setTokens, setSummary}) => {
  const runTests = useCallback(async ({ code, language, testCases, problemName ,setSummary , problemId }) => {
    const results = []
    let passedCount = 0, totalTime = 0, totalMemory = 0

    try {
      const submissions = testCases.map(test => ({
        source_code: encodeBase64(code),
        language_id: getLanguageId(language),
        stdin: encodeBase64(test.input),
        cpu_time_limit: 5,
        memory_limit: 128000
      }))

      // const submitRes = await axios.post(
      //   `${CODE_EXECUTION_API}/submissions/batch?base64_encoded=true&wait=false`,
      //   { submissions },
      //   { headers }
      // )

      // const tokens = submitRes.data || []

      const res = await axios.post(`${BASE_URL}/api/judge0/eval` , {
        code,
        language,
        problemId
      } , {withCredentials:true});
      const data = res.data;
      const tokens  = data;
      setTokens(tokens);
      sessionStorage.setItem(`problem-token-${problemId}`, JSON.stringify(tokens));
      const outputs = await fetchResultsInBatches({tokens,setSummary, CODE_EXECUTION_API, headers})

      outputs.forEach((output, index) => {
        // const test = testCases[index]
        const decodedOutput = (output.stdout || '').trim()

        const passed = output.status.description == "Accepted"
        // console.log(output)

        if (passed) passedCount++
        totalTime += parseFloat(output.time || 0)
        totalMemory += parseInt(output.memory || 0)

        results.push({
          input: index < 2 ? testCases[index].input : "",
          output: decodedOutput,
          expected: index < 2 ? testCases[index].output.trim() : "",
          passed,
          error: output.stderr || output.compile_error || ''
        })
      })

      const avgTime = totalTime / testCases.length
      const avgMemory = totalMemory / testCases.length

      const summary = {
        passed: passedCount,
        failed: outputs.length - passedCount,
        total: outputs.length,
        avgTime: avgTime.toFixed(3),
        avgMemory: avgMemory.toFixed(2)
      }

      // const geminiRes = await axios.post(`${BASE_URL}/api/code/review`, {
      //   sourceCode: code,
      //   problem: problemName
      // }, {withCredentials:true})

      // const review = cleanGeminiResponse(geminiRes.data.data)
      const review = {}
      // console.log(summary)
      return { summary, results, review }
    } catch (err) {
      console.error(err)
      return { summary: null, results: [], review: null }
    }
  }, [CODE_EXECUTION_API, getLanguageId, headers])

  return { runTests }
}
