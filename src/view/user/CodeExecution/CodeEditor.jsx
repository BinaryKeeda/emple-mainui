import React, { useEffect, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import questions from '../solving/sample.json';
import { KeyboardArrowUp, OpenInFull, PlayArrow } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { headers } from '../../../lib/config';

const CodeEditor = () => {
    const [showTestResult, setShowTestResult] = useState(false);
    const BASE_URL = 'http://65.2.4.200/submissions';
    const { id } = useParams();
    const question = questions.find(q => q.id === id) || questions[0];
    const [sampleTestCaseResult, setSampleTestCaseResult] = useState();
    const [executing, setExecuting] = useState(false);
    const [currLang, setCurrLang] = useState(question.functionSignatures[0]);
    const [editorVal, setEditorVal] = useState(question.functionSignatures[0].signature);
    const [output, setOutput] = useState(null);
    const [executionErr, setExecutionErr] = useState(null);

    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            setTimeout(() => {
                window.dispatchEvent(new Event("resize"));
            }, 100);
        });
        resizeObserver.observe(document.body);
        return () => resizeObserver.disconnect();
    }, [sampleTestCaseResult]);

    const changeHandler = (e) => {
        const selectedIndex = e.target.value;
        setCurrLang(question.functionSignatures[selectedIndex]);
        setEditorVal(question.functionSignatures[selectedIndex].signature);
    };

    const runTestCases = async () => {
        try {
            setShowTestResult(true);
            setExecuting(true);
            const testCases = question.testCases;
            const batchSubmissions = testCases.map(testCase => ({
                source_code: editorVal,
                language_id: currLang.languageId,
                stdin: testCase.input,
                expected_output: testCase.output,
                cpu_time_limit:1.5
            }));

            const submissionRes = await axios.post(`${BASE_URL}/batch`, { submissions: batchSubmissions });
            // if (!submissionRes.data?.tokens) throw new Error("Batch submission failed: No tokens received.");
            const tokens = submissionRes.data.map(item => item.token);
            await fetchBatchResults(tokens);
        } catch (error) {
            console.error("Error submitting batch:", error);
        }
    };

    const fetchBatchResults = async (tokens) => {
        let finalResults = [];
        
        for (let i = 0; i < 10; i++) { // Retry up to 10 times
            try {
                const resultRes = await axios.get(`${BASE_URL}/batch`, {
                    params: { tokens: tokens.join(",") }
                }, {headers}) ;
    
                const submissions = resultRes.data.submissions;
    
                finalResults = submissions.map((res, index) => ({
                    token: res.token,
                    status: res.status?.description || "Unknown",  // ✅ Handle missing status.description
                    stdin: question.testCases[index]?.input || "N/A",  // ✅ Fetch from testCases
                    expected_output: question.testCases[index]?.output || "N/A",
                    stdout: res.stdout || "N/A",
                    stderr: res.stderr || "N/A",
                    compile_output: res.compile_output || "N/A",
                    execution_time: res.time || "N/A",
                    memory: res.memory || "N/A"
                }));
    
                setSampleTestCaseResult(finalResults);
    
                // ✅ Stop retrying if all submissions are processed
                if (submissions.every(res => res.status.id > 2)) {
                    return;
                }
    
                console.log("Some submissions are still in progress, retrying...");
                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (error) {
                console.error("Error fetching batch results:", error);
                setSampleTestCaseResult([{ error: "Failed to fetch results" }]);
                return;
            } finally {
                setExecuting(false);
            }
        }
    
        console.log("Max retries reached, returning final results.");
        setSampleTestCaseResult(finalResults);
    };
    
    
    return (
        <div className='flex-[1.2] flex-col flex max-h-[calc(100vh-55px)]'>
            <section className='flex-1'>
                <div className='px-3 py-2 flex justify-between items-center z-40 gap-3'>
                    <select onChange={changeHandler} className="rounded-md border py-2 px-4 text-xs shadow-sm">
                        {question.functionSignatures.map((func, index) => (
                            <option value={index} key={index}>{func.language}</option>
                        ))}
                    </select>
                    <div className='flex gap-3 items-center'>
                        <IconButton><KeyboardArrowUp /></IconButton>
                        <IconButton><OpenInFull sx={{ fontSize: 15 }} /></IconButton>
                        <button onClick={runTestCases} className="rounded-md border py-2 px-4 text-xs shadow-sm">Run <PlayArrow sx={{ fontSize: 16 }} /></button>
                        <button className="rounded-md border py-2 px-4 text-xs shadow-sm">Submit</button>
                    </div>
                </div>
                <div className='h-[86%] custom-scrollbar'>
                    <Editor
                        options={{
                            minimap: { enabled: false },
                            theme: 'vs-light',
                            scrollBeyondLastLine: false,
                            lineNumbers: 'on',
                        }}
                        className='custom-scrollbar'
                        language={currLang.language}
                        onChange={setEditorVal}
                        value={editorVal}
                    />
                </div>
            </section>
            <section className='flex-1 overflow-y-auto flex flex-col gap-2'>
                <hr />
                <div className='flex mt-1 items-center gap-1 px-1'>
                    <button className="rounded-md  text-slate-500 px-4 text-xs">Test Cases</button>
                    <hr className='w-[1px] h-[20px] bg-slate-300 300' />
                    <button className="rounded-md  text-gray-500 px-4 text-xs">Test Result</button>
                </div>
                <div className='text-gray-700 text-xs px-7 py-2 overflow-scroll  flex justify-center items-center flex-1'>
                    <div className='text-gray-700 text-xs overflow-y-scroll  flex justify-center items-center flex-1'>
                        <div className='text-gray-700 overflow-y-scroll custom-scrollbar  text-xs flex justify-center items-center flex-1'>
                            {showTestResult ? (
                                sampleTestCaseResult && !executing ? (
                                    <div className="w-full  ">
                                        {sampleTestCaseResult.map((result, index) => (
                                            <div key={index} className="border-b py-2">
                                                <p><strong>Test Case {index + 1}:</strong></p>
                                                <p>🔹 <strong>Input:</strong> {result.stdin}</p>
                                                <p>✅ <strong>Expected:</strong> {result.expected_output}</p>
                                                <p>📤 <strong>Output:</strong> {result.stdout || "Error"}</p>
                                                <p>🛑 <strong>Status:</strong> {result.status}</p>
                                                <p>⏱ <strong>Runtime:</strong> {result.execution_time} sec</p>
                                                <p>💾 <strong>Memory Used:</strong> {result.memory} KB</p>
                                            </div>
                                        ))}
                                    </div>
                                ) :<div className='flex gap-3' >Please Wait <div className='animate-spin h-5 w-5 border-2 border-t-transparent border-black rounded-full' /></div>
                            ) : "Please run the code"} 
                        </div>

                    </div>


                </div>
            </section>
        </div>
    );
};

export default CodeEditor;