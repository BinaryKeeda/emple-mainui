import React from 'react';
import questions from '../solving/sample.json'
const ProblemData = () => {
    const question = questions[0];
    return (
        <div className='flex-1 p-6' >

            <h1 className='text-xl' >
                {question.title}
            </h1>
            <p className='border-2 text-xs items-center  gap-2 w-[70px] justify-center rounded-full bg-slate-50 text-[#010101] border-gray-50 px-5' >
                {question.difficulty}
            </p>
            <p className="mt-5 flex gap-3" >
                {question.description}
            </p>
            <p>
            </p>
            <p className='mt-4' >
                {question.explanation}
            </p>
            <p className='mt-5' >
                <h1>Sample Testcase</h1>
                {question.sampleTestCases.map((i, key) => (
                    <div key={key}>
                        <p>
                            Input : {i.input}
                        </p>
                        <p>
                            Output : 
                            {i.output}
                        </p>
                        <p>
                            Explanations : {i.explanation}
                        </p>
                    </div>

                ))}
            </p>
            <p className='mt-6' >
                <h1>Constraints</h1>
                {question.constraints.map(i => {
                    return (
                        <li key={i}>{i}</li>

                    )
                })}
            </p>
        </div>
    );
}

export default ProblemData;
