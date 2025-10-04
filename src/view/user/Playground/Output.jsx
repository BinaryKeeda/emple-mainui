import { Editor as Monaco } from '@monaco-editor/react';
import axios from 'axios'
import React, { useEffect } from 'react'
import { CODE_EXECUTION_API, headers } from '../../../lib/config';
import { Chip } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import { DARK_STRONG } from '../utils/colors';

function Output({stdin,setStdin, setStatus, status,output ,setOutput ,src,lang}) {

    const SubmitHandler = async () => {
        try {
            const res = await axios.post(`${CODE_EXECUTION_API}/submissions`,
                {
                    "source_code": src,
                    "language_id": lang.id,
                    "stdin": stdin,
                    "expected_output": "",
                    "cpu_time_limit": 5,
                    "memory_limit": 128000
                }
                , { headers: headers })
            const token = res.data.token;
            FetchResults(token);
        } catch (e) {
            console.log(e);
        }
    }


    const FetchResults = async (token) => {
        setStatus("queued"); // Initial state

        for (let i = 0; i < 10; i++) {
            try {
                setStatus("executing"); // While polling

                const resultRes = await axios.get(`${CODE_EXECUTION_API}/submissions/${token}`, { headers });
                const data = resultRes.data;

                // If execution completed
                if ((data.status && data.status.id === 3) || (data.status && data.status.id == 4)) {
                    setStatus("completed");
                    // setSampleTestCaseResult([data]);
                    // alert(JSON.stringify(data.stdout))
                    setOutput(data.stdout);
                    return;
                }
                
                if(data.status && data.status.id == 11){
                    setStatus("error")
                    setOutput(data.stdout || data.stderr);
                    return;
                }
                if(data.status && data.status.id == 6){
                    setStatus("error")
                    setOutput(data.status.description)
                    return;
                }
                console.log("Submission still executing, retrying...");
                await new Promise(resolve => setTimeout(resolve, 2000));

            } catch (error) {
                console.error("Error fetching submission result:", error);
                setStatus("error");
                // setSampleTestCaseResult([{ error: "Failed to fetch results" }]);
                setOutput("Failed to fetch")
                return;
            }
        }

        setStatus("timeout");
        setSampleTestCaseResult([{ error: "Result not ready. Try again later." }]);
    };

    return (
        <section className={`flex-1 m-3 ml-1 dark:bg-[${DARK_STRONG}] dark:text-gray-200 bg-white shadow-md h-[calc(100vh-100px)] rounded-2xl`}>
            <div className="flex pr-5 justify-between ">
                <div className='flex p-2 items-center border-transparet'>
                    <CustomButton callback={SubmitHandler} title={"Run"} />
                    <ArrowSvg />
                    <CustomButton title={"Output"} />
                </div>
                <div className='flex p-2 items-center border-transparet' >
                    <div className='text-sm text-slate-600'>
                        {getStatusComponent(status)}
                    </div>
                </div>
            </div>
            <div className='p-6'>
                {
                    output ?
                    <OutputBox output={output} />
                    // <div dangerouslySetInnerHTML={{ __html: output }}></div>
                    :<OutputBox output={"Please write the code"} />
                }
            </div>
            <div className='flex text-inherit flex-wrap px-5 gap-2'>
                <Chip color='primary'  className='cursor-pointer' label={"Array"} />
                <Chip color='primary'  className='cursor-pointer' label={"Linked List"} />
                <Chip color='primary'  className='cursor-pointer' label={"Doubly Linked List"} />
                <Chip color='primary'  className='cursor-pointer' label={"Circular Linked List"} />
                <Chip color='primary'  className='cursor-pointer' label={"Stack"} />
                <Chip color='primary'  className='cursor-pointer' label={"Queue"} />
                <Chip color='primary'  className='cursor-pointer' label={"Deque"} />
                <Chip color='primary'  className='cursor-pointer' label={"Priority Queue"} />
                <Chip color='primary'  className='cursor-pointer' label={"Heap"} />
                <Chip color='primary'  className='cursor-pointer' label={"Trie"} />
                <Chip color='primary'  className='cursor-pointer' label={"Hash Table / Hash Map"} />
                <Chip color='primary'  className='cursor-pointer' label={"Set"} />
                <Chip color='primary'  className='cursor-pointer' label={"Binary Tree"} />
                <Chip color='primary'  className='cursor-pointer' label={"Binary Search Tree"} />
                <Chip color='primary'  className='cursor-pointer' label={"AVL Tree"} />
                <Chip color='primary'  className='cursor-pointer' label={"Red-Black Tree"} />
                <Chip color='primary'  className='cursor-pointer' label={"Segment Tree"} />
                <Chip color='primary'  className='cursor-pointer' label={"Fenwick Tree (BIT)"} />
                <Chip color='primary'  className='cursor-pointer' label={"Graph (Adjacency List)"} />
                <Chip color='primary'  className='cursor-pointer' label={"Graph (Adjacency Matrix)"} />
                <Chip color='primary'  className='cursor-pointer' label={"Disjoint Set (Union-Find)"} />
                <Chip color='primary'  className='cursor-pointer' label={"Suffix Tree / Suffix Array"} />
                <Chip color='primary'  className='cursor-pointer' label={"K-D Tree"} />
            </div>


        </section>
    )
}

export default Output



const ArrowSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-1.5">
        <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
    </svg>
)

const CustomButton = ({ title, callback }) => (
    <button onClick={callback} className="flex dark:text-gray-200 items-center rounded-md  py-2 px-4 text-center text-sm transition-all  hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
        {title}
    </button>
)

function getStatusComponent(status) {
    switch (status) {
        case 'executing':
            return <div className='bg-orange-400 text-white p-2 rounded-md text-xs flex'>
                <ArrowSvg />
                In Progress
            </div>
        case 'completed':
            return <div className='bg-green-400 text-white p-2 rounded-md text-xs flex'>
                <ArrowSvg />
                Completed
            </div>
        case 'failed':
            return <div className='bg-red-400 text-white p-2 rounded-md text-xs flex'>
                <ArrowSvg />
                Failed
            </div>
        case 'error':
            return <div className='bg-red-400 text-white p-2 rounded-md text-xs flex'>
                <ArrowSvg />
                Failed
            </div>
        default:
            return <div className='bg-gray-400 text-white p-2 rounded-md text-xs items-center gap-2 flex'>
                <PlayArrow />
                Not Started
            </div>
    }
}





const OutputBox = ({ output }) => {
  return (
    <div className="">
      <h2 className="text-gray-600 text-sm mb-2">Output</h2>
      <Monaco
        height="48vh"
        defaultLanguage="text"
        value={output}
        theme=''
        options={{
          readOnly: true,
          minimap: { enabled: false },
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          wordWrap: 'on'
        }}
      />
    </div>
  );
};

