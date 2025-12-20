// useCodeExecutor.js
import axios from 'axios';
import { encodeBase64, decodeBase64 } from './base64Utils'; // assume helpers
import { getLanguageId } from './languageUtils'; // assume helpers

export const useCodeExecutor = ({ CODE_EXECUTION_API, headers }) => {
  const runTests = async (
    { code, language, testCases, problemName, problemId },
    onResultUpdate // callback for real-time updates
  ) => {
    const results = [];
    let passedCount = 0, totalTime = 0, totalMemory = 0;

    try {
      const submissions = testCases.map(test => ({
        source_code: encodeBase64(code),
        language_id: getLanguageId(language),
        stdin: encodeBase64(test.input),
        cpu_time_limit: 5,
        memory_limit: 128000
      }));

      const submitRes = await axios.post(
        `${CODE_EXECUTION_API}/submissions/batch?base64_encoded=true&wait=false`,
        { submissions }
      );

      const tokens = submitRes.data || [];

      await fetchResultsInBatchesWithUpdates(
        tokens,
        CODE_EXECUTION_API,
        headers,
        (partialResults) => {
          partialResults.forEach((output, index) => {
            if (!output || results[index]) return;
            const test = testCases[index];
            const decodedOutput = (output.stdout || '').trim();
            const expectedOutput = test.output.trim();
            const passed = decodedOutput === expectedOutput;

            const result = {
              input: test.input,
              output: decodedOutput,
              expected: expectedOutput,
              passed,
              error: output.stderr || output.compile_error || ''
            };

            results[index] = result;
            if (passed) passedCount++;
            totalTime += parseFloat(output.time || 0);
            totalMemory += parseInt(output.memory || 0);

            onResultUpdate?.(result, index, [...results]);
          });
        }
      );

      const avgTime = totalTime / testCases.length;
      const avgMemory = totalMemory / testCases.length;

      const summary = {
        passed: passedCount,
        failed: testCases.length - passedCount,
        total: testCases.length,
        avgTime: avgTime.toFixed(3),
        avgMemory: avgMemory.toFixed(2)
      };

      return { summary, results, review: {} };
    } catch (err) {
      console.error(err);
      return { summary: null, results: [], review: null };
    }
  };

  return { runTests };
};

export const fetchResultsInBatchesWithUpdates = async (
  tokens,
  CODE_EXECUTION_API,
  headers,
  onUpdate
) => {
  const maxAttempts = 10;
  const delay = 2000;
  const tokenStrings = tokens.map(t => typeof t === 'string' ? t : t.token);
  const resultState = Array(tokenStrings.length).fill(null);

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const res = await axios.get(
        `${CODE_EXECUTION_API}/submissions/batch?tokens=${tokenStrings.join(',')}&base64_encoded=true`,
        { headers }
      );

      const submissions = res.data.submissions;
      let updated = false;

      submissions.forEach((r, i) => {
        if (!resultState[i] && [3, 4, 6, 11].includes(r.status?.id)) {
          resultState[i] = {
            stdout: r.stdout ? decodeBase64(r.stdout).trim() : '',
            stderr: r.stderr ? decodeBase64(r.stderr).trim() : '',
            compile_error: r.compile_output ? decodeBase64(r.compile_output).trim() : '',
            time: r.time || '0',
            memory: r.memory || '0',
            status: r.status
          };
          updated = true;
        }
      });

      if (updated) {
        onUpdate(resultState.map(r => r || {}));
      }

      const allDone = resultState.every(r => r !== null);
      if (allDone) return resultState;

      await new Promise(r => setTimeout(r, delay));
    } catch (err) {
      console.error("Polling error:", err);
      break;
    }
  }

  return resultState.map(r => r || {
    stdout: '',
    stderr: 'Timed out',
    compile_error: '',
    time: '0',
    memory: '0',
    status: { id: -2, description: 'Timed out' }
  });
};


// runCode.js (caller logic)
export const runCode = async (language, code, isSubmit, runTests, contextData) => {
  const {
    setShowConfirmBox,
    setShowOutputWindow,
    setSummary,
    setResults,
    setIsExecuting,
    setCodeReview,
    setSubmitting,
    setProblemsSolved,
    user,
    problem,
    section,
    testResponse
  } = contextData;

  try {
    setShowConfirmBox(false);
    setShowOutputWindow(true);
    setSummary(null);
    setResults([]);
    setIsExecuting(true);
    setCodeReview(null);

    const { summary, results, review } = await runTests(
      {
        code,
        language,
        testCases: problem.testCases,
        problemName: problem.problemName,
        problemId: problem._id
      },
      (result, index, allResults) => {
        setResults([...allResults]);
      }
    );

    if (isSubmit) {
      setSubmitting(true);
      await axios.post(`${BASE_URL}/api/judge0/submit`, {
        userId: user?._id,
        problemId: problem?._id,
        responseId: testResponse?._id,
        language,
        sourceCode: code,
        codeReview: review,
        passedTestCases: summary.passed,
        totalTestCases: summary.total,
        executionTime: summary.avgTime,
        memoryUsed: summary.avgMemory,
        sectionId: section._id
      }, { withCredentials: true });

      setProblemsSolved(prev => [...prev, { problemId: problem._id }]);
      setShowOutputWindow(false);
      setSubmitting(false);
    } else {
      setSummary(summary);
      setCodeReview(review);
    }
  } catch (e) {
    console.error(e);
  } finally {
    setIsExecuting(false);
  }
};
