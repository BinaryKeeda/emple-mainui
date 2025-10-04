import React from 'react';
import Questions from './sample.json';
import { useParams } from 'react-router-dom';
const Problem = ({ currProblem, output, executing }) => {
   return (
        <div className='flex-1 h-full max-h-[calc(100vh-70px)] overflow-scroll  p-6' >
            {/* {
                executing ? <div className='flex items-center gap-3' >
                    <h1>Your Code is being processed</h1>
                    <div className='h-5 w-5 border-2 border-black border-t-transparent animate-spin rounded-full' ></div>
                </div> :<>
            <div dangerouslySetInnerHTML={{ __html: output }} />

                </>
            } */}
            <h1 className='text-md font-bold'>{currProblem.title}</h1>
            <p className='mt-2'>{currProblem.description}</p>
            <p className='mt-2' > 
                {currProblem.explanation}
            </p>
            <br />
            <br />
            <p>
                {currProblem.sampleTestCases.map((testCase, key) => (
                    <div className='mb-6' key={key}>
                        {Object.entries(testCase).map(([field, value]) => (
                            <p className='' key={field}><strong>{field}:</strong> {JSON.stringify(value)}</p>
                        ))}
                    </div>
                ))}
            </p>
        </div>
    );
}

export default Problem;
