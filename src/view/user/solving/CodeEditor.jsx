import React, { useState, useCallback } from "react";
import { Editor } from "@monaco-editor/react";
import { PlayArrow } from "@mui/icons-material";
import sample from './sample.json';

const functionSignatures = {
    java: "public class Main{\n\tpublic static void main(String []args){\n\t\t// write your code here\n\t}\n}",
    // python: 'if __name__ == "__main__":\n\t# write your code here',
    python: 'import sys\ndef twoSum(nums,target):\n\treturn [-1, -1]\nif __name__ == "__main__":\n\ttarget = int(input().strip())\n\tnums = list(map(int, input().strip().split()))\n\tprint(twoSum(nums,target))',
    c: '#include<stdio.h>\n\nint main(){\n\t // write your code here \n}',
    cpp: "#include<iostream>\nusing namespace std;\nint main(){\n\t // write your code here\n}",
    javascript: '// write your code here',
};

const languages = [
    { id: 50, name: "C (GCC 9.2.0)", value: "c" },
    { id: 54, name: "C++ (GCC 9.2.0)", value: "cpp" },
    { id: 62, name: "Java (OpenJDK 13.0.1)", value: "java" },
    { id: 63, name: "JavaScript (Node.js 12.14.0)", value: "javascript" },
    { id: 71, name: "Python (3.8.1)", value: "python" }
];

const TestCaseSection = () => {
    const [activeTestCase, setActiveTestCase] = useState(0);

    return (
        <section className="flex-1 flex flex-col">
            <div className="flex items-center gap-3">
                {sample.sampleTestCases.map((testCase, index) => (
                    <div className='mb-1' key={index}>
                        <button
                            className={`rounded-md border py-2 px-4 flex items-center text-center text-sm transition-all 
                                bg-slate-100 text-slate-600
                                hover:bg-slate-300 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
                            type="button"
                            onClick={() => setActiveTestCase(index)}
                        >
                            Case {index + 1}
                            <div className={`h-2 w-2 rounded-full ml-2 ${activeTestCase !== index ? 'bg-blue-300' : 'bg-green-500'}`} />
                        </button>
                    </div>
                ))}
            </div>
            <hr />
            <div className="border-[1px] overflow-y-scroll flex-1 border-t-0 border-gray-300 p-3">
                <h3 className="text-sm font-semibold">Input:</h3>
                <p className="bg-gray-100 p- text-wrap rounded">{sample.sampleTestCases[activeTestCase].input}</p>

                <h3 className="text-sm font-semibold mt-2">Expected Output:</h3>
                <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(sample.sampleTestCases[activeTestCase].output)}</pre>
                <h3 className="text-sm font-semibold mt-2">Your Output:</h3>
                <div className="flex bg-gray-100 p-2 rounded " >{
                    true ? <>
                    <div className="animate-spin border-2 border-gray-100">

                    </div></> :
                        <pre className="bg-gray" ></pre>}
                </div>
            </div>
        </section>
    );
};

const CodeEditor = ({ submitHandler, status }) => {
    const [currLang, setCurrLang] = useState("python");
    const [sourceCode, setSourceCode] = useState(functionSignatures["python"]);

    const changeHandler = (e) => {
        setCurrLang(e.target.value);
        setSourceCode(functionSignatures[e.target.value]);
    };

    const handleRun = useCallback(() => {
        const selectedLanguage = languages.find(lang => lang.value === currLang);
        if (!selectedLanguage) return;
        submitHandler(sourceCode, selectedLanguage.id);
    }, [sourceCode, currLang, submitHandler]);

    return (
        <div className="flex-[1] px-2 border-l-[1px] border-slate-200 pt-5 pb-3 box-border flex flex-col gap-3 h-[calc(100vh-70px)]">
            <div className="flex justify-between items-center pr-5">
                <select onChange={changeHandler} value={currLang}>
                    {languages.map((language) => (
                        <option key={language.id} value={language.value}>
                            {language.name}
                        </option>
                    ))}
                </select>
                <div className="flex gap-2" >
                    <button
                        onClick={handleRun}
                        className="flex text-xs items-center rounded-md border border-slate-300 py-2 px-3 text-center transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        disabled={status}
                    >
                        {
                            status ? status :
                                "Run"
                        }
                        <PlayArrow sx={{ fontSize: 20 }} />
                    </button>
                    <button
                        onClick={handleRun}
                        className="flex text-xs items-center rounded-md border border-slate-300 py-2 px-3 text-center transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                    >
                        Submit
                        {/* <PlayArrow sx={{ fontSize: 20 }} /> */}

                    </button>
                </div>
            </div>
            <div className="flex-1">
                <Editor
                    className="max-h-[100%] min-h-[50%]"
                    defaultLanguage="java"
                    language={currLang}
                    value={sourceCode}
                    onChange={(newValue) => setSourceCode(newValue || "")}
                    theme="vs-light"
                />
            </div>
            <TestCaseSection className="flex-1" />
        </div>
    );
};

export default CodeEditor;
