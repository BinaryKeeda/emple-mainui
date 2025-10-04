import React, { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PythonCodeBlock from "./CodeBlock";

const MCQQuestion = ({ question, code, options, correctIndex }) => {
  const [selected, setSelected] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white p-3 rounded-lg">
      <h3 className="text-base mb-3 font-medium">{question}</h3>

      {code && <PythonCodeBlock code={code} />}

      <div className="mt-6 space-y-3">
        {options.map((opt, index) => {
          const isSelected = index === selected;
          const isCorrect = index === correctIndex;
          let optionClasses = "w-full border rounded px-4 py-2 text-left";

          if (selected !== null) {
            if (isSelected && isCorrect)
              optionClasses += " bg-green-100 border-green-500";
            else if (isSelected && !isCorrect)
              optionClasses += " bg-red-100 border-red-500";
            else if (!isSelected && isCorrect)
              optionClasses += " bg-green-50 border-green-400";
          } else {
            optionClasses += " hover:border-blue-400";
          }

          return (
            <button
              key={index}
              onClick={() => selected === null && setSelected(index)}
              className={optionClasses}
            >
              <div className="flex items-center justify-between">
                <span>{opt}</span>
                {selected !== null &&
                  isSelected &&
                  (isCorrect ? (
                    <CheckCircleIcon className="text-green-600" />
                  ) : (
                    <CancelIcon className="text-red-600" />
                  ))}
                {selected !== null && !isSelected && isCorrect && (
                  <CheckCircleIcon className="text-green-600" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MCQQuestion;
