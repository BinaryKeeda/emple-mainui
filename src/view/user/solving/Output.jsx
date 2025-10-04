import _default from '@monaco-editor/react';
import { Close, Minimize, OpenInFull, Remove } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';

const Output = ({ showOutputWindow,setShowOutputWindow, output, executing,closeExectionWindow }) => {
    return (
        <>
            <div className={`absolute p-5 bg-slate-50 ${showOutputWindow && ( executing || output) ? '-translate-y-full': output ? '-translate-y-[100px]':'' } transition-all duration-300 rounded-t-lg  h-[calc(100vh-90px)] w-[calc(100%-20px)] ml-[10px] flex-1 `} >
                <div className='flex justify-end gap-5 items-center py-2' >
                        <Close onClick={closeExectionWindow} />
                        {
                           showOutputWindow &&( output || executing) ? 
                            <Remove className='cursor-pointer' onClick={()=>{setShowOutputWindow(false)}} />
                            :<OpenInFull sx={{fontSize:13}} className='cursor-pointer' onClick={()=>{setShowOutputWindow(true)}} />
                        }
                </div>
                {
                    executing ? (
                        <div className='flex gap-3 items-center'>Please wait while we are executing<div className='border-black border-2 border-t-transparent animate-spin rounded-full h-3 w-3' ></div></div>
                    ):
                        <div dangerouslySetInnerHTML = {{ __html: output }} >
            </div >
                    }
        </div >
        </>
    );
}

export default Output;
