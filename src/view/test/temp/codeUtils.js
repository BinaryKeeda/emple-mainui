// import { BASE_URL } from "../../../lib/config"
// import axios from 'axios';

// export const runCodeBatch = async ({
//   code,
//   language,
//   testCases,
//   setIsExecuting,
//   setSummary,
//   setTestResults,
//   headers,
//   CODE_EXECUTION_API,
//   getLanguageId
// }) => {
//   setIsExecuting(true);
//     console.log(testCases)
//   const results = [];
//   let passedCount = 0;
//   let totalTime = 0;
//   let totalMemory = 0;

//   try {
//     // Step 1: Prepare submissions
//     const submissions = testCases.map(test => ({
//       source_code: code,
//       language_id: getLanguageId(language),
//       stdin: test.input,
//       cpu_time_limit: 5,
//       memory_limit: 128000
//     }));

//     // Step 2: Submit all in batch
//     const submitRes = await axios.post(
//       `${CODE_EXECUTION_API}/submissions/batch?base64_encoded=false&wait=false`,
//       { submissions },
//       { headers }
//     );

//     const tokens = submitRes.data || [];

//     // ✅ Step 3: Fetch all results reliably (with retries)
//     const outputs = await fetchResultsInBatches(tokens, CODE_EXECUTION_API, headers);
//     console.log(outputs)
//     // Step 4: Process results
//     outputs.forEach((output, index) => {
//       const test = testCases[index];
//       const decodedOutput = output.stdout;
//       const expectedOutput = test.output.trim();
//       const passed = decodedOutput === expectedOutput;

//       const errorMsg = output.stderr || output.compile_error || null;

//       if (passed) passedCount++;
//       totalTime += parseFloat(output.time || 0);
//       totalMemory += parseInt(output.memory || 0);

//       results.push({
//         input: test.input,
//         output: decodedOutput,
//         expected: expectedOutput,
//         passed,
//         error: errorMsg
//       });
//     });

//     setSummary({ passed: passedCount, failed: testCases.length - passedCount });
//     setTestResults(results);
//   } catch (err) {
//     console.error('Batch execution error:', err);
//   } finally {
//     setIsExecuting(false);
//   }
// };


// export const fetchResultsInBatches = async (tokens, CODE_EXECUTION_API, headers) => {
//   const maxAttempts = 10;
//   const delay = 2000;

//   // Normalize tokens to string list in case they are passed as objects
//   const tokenStrings = tokens.map(t => typeof t === 'string' ? t : t.token);

//   for (let attempt = 0; attempt < maxAttempts; attempt++) {
//     try {
//       const res = await axios.get(
//         `${CODE_EXECUTION_API}/submissions/batch?tokens=${tokenStrings.join(',')}&base64_encoded=false`,
//         { headers }
//       );

//       const results = res.data.submissions;

//       const allDone = results.every(r =>
//         [3, 4, 6, 11].includes(r.status?.id)
//       );

//       if (allDone) {
//         const res = results.map(r => ({
//           stdout: r.stdout?.trim() || '',
//           stderr: r.stderr?.trim() || '',
//           compile_error: r.compile_output?.trim() || '',
//           time: r.time || '0',
//           memory: r.memory || '0',
//           status: r.status
//         }));
//         return res;
//       }

//       await new Promise(resolve => setTimeout(resolve, delay));
//     } catch (err) {
//       console.error('Batch fetch error:', err);
//       return tokenStrings.map(() => ({
//         stdout: '',
//         stderr: 'Failed to fetch result.',
//         compile_error: '',
//         time: '0',
//         memory: '0',
//         status: { id: -1, description: 'Fetch error' }
//       }));
//     }
//   }

//   return tokenStrings.map(() => ({
//     stdout: '',
//     stderr: 'Timed out.',
//     compile_error: '',
//     time: '0',
//     memory: '0',
//     status: { id: -2, description: 'Timed out' }
//   }));
// };

import axios from 'axios';
import { BASE_URL } from "../../../lib/config";

// Browser-safe Base64 encode/decode
export const encodeBase64 = str =>
  typeof str === 'string' ? btoa(unescape(encodeURIComponent(str))) : '';

const decodeBase64 = str =>
  typeof str === 'string' ? decodeURIComponent(escape(atob(str))) : '';

// Main batch run function
// export const runCodeBatch = async ({
//   code,
//   language,
//   testCases,
//   setIsExecuting,
//   setSummary,
//   setTestResults,
//   headers,
//   CODE_EXECUTION_API,
//   getLanguageId
// }) => {
//   setIsExecuting(true);

//   const results = [];
//   let passedCount = 0;
//   let totalTime = 0;
//   let totalMemory = 0;

//   try {
//     // Step 1: Prepare base64-encoded submissions
//     const submissions = testCases.map(test => ({
//       source_code: encodeBase64(code),
//       language_id: getLanguageId(language),
//       stdin: encodeBase64(test.input),
//       cpu_time_limit: 5,
//       memory_limit: 128000
//     }));

//     // Step 2: Submit all in batch
//     const submitRes = await axios.post(
//       `${CODE_EXECUTION_API}/submissions/batch?base64_encoded=true&wait=false`,
//       { submissions },
//       { headers }
//     );

//     const tokens = submitRes.data || [];

//     // Step 3: Fetch results with retries
//     const outputs = await fetchResultsInBatches(tokens, CODE_EXECUTION_API, headers);

//     // Step 4: Process and compare results
//     outputs.forEach((output, index) => {
//       const test = testCases[index];
//       const decodedOutput = output.stdout;
//       const expectedOutput = test.output.trim();
//       const passed = decodedOutput === expectedOutput;

//       const errorMsg = output.stderr || output.compile_error || '';

//       if (passed) passedCount++;
//       totalTime += parseFloat(output.time || 0);
//       totalMemory += parseInt(output.memory || 0);

//       results.push({
//         input: test.input,
//         output: decodedOutput,
//         expected: expectedOutput,
//         passed,
//         error: errorMsg
//       });
//     });

//     // Step 5: Update UI state
//     const avgTime = totalTime / testCases.length;
//     const avgMemory = totalMemory / testCases.length;

//     setSummary({ 
//       passed: passedCount, 
//       failed: testCases.length - passedCount ,
//       total:testCases.length,
//       avgTime: avgTime.toFixed(3),
//       avgMemory: avgMemory.toFixed(2)
//     });
//     setTestResults(results);
//   } catch (err) {
//     console.error('Batch execution error:', err);
//   } finally {
//     setIsExecuting(false);
//   }
// };

// Helper: Fetch submissions in batch with retries
export const fetchResultsInBatches = async ({setSummary,tokens, CODE_EXECUTION_API, headers}) => {
  const maxAttempts = 10;
  const delay = 2000;
  const tokenStrings = tokens.map(t => typeof t === 'string' ? t : t.token);
  const summary = {
      passed: 0,
      failed: 0,
      total: tokens.length,
      avgTime: 0,
      avgMemory: 0
  }
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/judge0/fetch`,
        {
          tokenStrings
        },
        {
          withCredentials:true
        }
      );
      //  const res = await axios.get(`${CODE_EXECUTION_API}/submissions/batch?tokens=${tokenStrings.join(',')}&base64_encoded=true` , {
      //     headers,withCredentials:true
      // })
      // res.json(data.data);
 
      const results = res.data.submissions;
      /// passed if ACCEPTED
      // results.forEach(r => {
      //   if (r.status.id === 3) summary.passed++;
      //   else summary.failed++;
      // });
      // setSummary({
      //   ...summary,
      //   avgTime: (results.reduce((sum, r) => sum + parseFloat(r.time || 0), 0) / results.length).toFixed(3),
      //   avgMemory: (results.reduce((sum, r) => sum + parseInt(r.memory || 0), 0) / results.length).toFixed(2)

      // })

      const allDone = results.every(r =>
        [3, 4, 6, 5, 11].includes(r.status?.id)
      );

      if (allDone) {
        return results.map(r => ({
          stdout: r.stdout ? decodeBase64(r.stdout).trim() : '',
          stderr: r.stderr ? decodeBase64(r.stderr).trim() : '',
          compile_error: r.compile_output ? decodeBase64(r.compile_output).trim() : '',
          time: r.time || '0',
          memory: r.memory || '0',
          status: r.status
        }));
      }

      await new Promise(resolve => setTimeout(resolve, delay));
    } catch (err) {
      console.error('Batch fetch error:', err);
      return tokenStrings.map(() => ({
        stdout: '',
        stderr: 'Failed to fetch result.',
        compile_error: '',
        time: '0',
        memory: '0',
        status: { id: -1, description: 'Fetch error' }
      }));
    }
  }

  return tokenStrings.map(() => ({
    stdout: '',
    stderr: 'Timed out.',
    compile_error: '',
    time: '0',
    memory: '0',
    status: { id: -2, description: 'Timed out' }
  }));
};


function cleanGeminiResponse (data) {
    if (!data) return null
    const cleaned = data.replace(/```json\n?/, '').replace(/```$/, '')
    try {
      return JSON.parse(cleaned)
    } catch (error) {
      console.error('Failed to parse cleaned JSON:', error)
      return null
    }
  }
export  const geminiReview = async ({code, setCodeReview ,problemName}) => {
    axios
      .post(`${BASE_URL}/api/v3/review/code`, {
        sourceCode: code,
        problem: problemName
      })
      .then(res => {
        const parsed = cleanGeminiResponse(res.data.data)
        setCodeReview(parsed)
        return parsed;
      })
      .catch(err => console.error(err))
}

  export {cleanGeminiResponse}