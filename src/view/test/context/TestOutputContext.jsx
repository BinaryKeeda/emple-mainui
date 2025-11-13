// OutputWindowContext.js
import { createContext, useContext, useState } from 'react';

const OutputWindowContext = createContext();

export const OutputWindowProvider = ({ children }) => {
  const [showOutputWindow, setShowOutputWindow] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [summary, setSummary] = useState(null);
  const [codeReview, setCodeReview] = useState(null);
  const [ results,setResults]  = useState(null);
  const value = {
    results,setResults ,
    showOutputWindow, setShowOutputWindow,
    isExecuting, setIsExecuting,
    summary, setSummary,
    codeReview, setCodeReview,
  };

  return (
    <OutputWindowContext.Provider value={value}>
      {children}
    </OutputWindowContext.Provider>
  );
};

export const useOutputWindow = () => {
  const context = useContext(OutputWindowContext);
  if (!context) throw new Error('useOutputWindow must be used within OutputWindowProvider');
  return context;
};
