import React, { useEffect } from 'react'
import { Editor as Monaco } from '@monaco-editor/react';
import { DARK_STRONG } from '../utils/colors';
function Editor({ src, setStdin, stdin, lang, languages, changeSrc, changeLanguage }) {

    const changehandeler = (e) => {
        changeLanguage(e.target.value);
    }

    return (
        <section className={`flex-1 dark:bg-[${DARK_STRONG}] flex flex-col m-3 p-5 pl-0 mr-1 bg-white shadow-md h-[calc(100vh-100px)] rounded-2xl`}>
            <div className='flex-[0.9]' >
                <Monaco
                    options={{
                        minimap: { enabled: false },
                        theme: 'vs-light',
                        scrollBeyondLastLine: false,
                        lineNumbers: 'on',
                    }}
                    onChange={(value) => changeSrc(value)}
                    className='custom-scrollbar'
                    language={`${(lang.language)}`}
                // language={currLang.language}
                // onChange={setEditorVal}
                // value={editorVal}
                />
            </div>
            <div className='flex py-3 flex-[0.3] flex-col px-6' >
                <div className='h-[30px] flex justify-between items-center'>
                    <h1 className='text-gray-700'>Custom Input</h1>

                    <select name='languae' onChange={changehandeler} className='border' >{languages.map((i, idx) => {
                        return (
                            <option key={idx} onChange={changehandeler} value={idx}>{i.language}</option>
                        )
                    })}
                    </select>
                </div>
                <textarea className='border p-1' value={stdin} onChange={(e) => { setStdin(e.target.value) }} rows={5}></textarea>
            </div>
        </section>
    )
}

export default Editor