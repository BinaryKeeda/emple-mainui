import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkCold } from "react-syntax-highlighter/dist/esm/styles/prism";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const CodeBlock = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative bg-blue-50 border border-blue-200 rounded-xl shadow-md p-0 my-6">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 bg-white hover:bg-blue-100 border border-blue-300 text-blue-700 text-sm px-2 py-1 rounded flex items-center gap-1 shadow-sm transition-all"
      >
        {copied ? <CheckCircleIcon /> : <ContentCopyIcon />}
        {copied ? "Copied" : "Copy"}
      </button>

      <SyntaxHighlighter
        language="python"
        style={coldarkCold}
        customStyle={{
          backgroundColor: "#f0f8ff", // AliceBlue
          borderRadius: "10px",
          padding: "20px",
          fontSize: "14px",
        }}
        showLineNumbers
        wrapLines
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
