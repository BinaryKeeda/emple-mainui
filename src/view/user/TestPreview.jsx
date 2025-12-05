import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../lib/config";
import { useParams } from "react-router-dom";
import { IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const TestSeriesPreview = () => {
  const [data, setData] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const { id: responseId } = useParams();

  useEffect(() => {
    const fetchTestResponse = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/test/response/${responseId}`,
          { withCredentials: true }
        );

        if (res.data?.status) {
          const result = res.data.data;
          setData(result);
          setAnalysis(
            computeAnalysis(result.response, result.testSnapshot)
          );
        }
      } catch (err) {
        console.error("Error fetching preview:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTestResponse();
  }, [responseId]);

  if (loading) return <p className="text-center py-6">Loading...</p>;
  if (!data) return <p className="text-center text-red-500 py-6">No data found</p>;

  const { response, testSnapshot } = data;

  if (!response || response.length === 0) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold">Test Preview</h2>
        <p className="mt-4 text-red-500">
          No responses available for this test.
        </p>
      </div>
    );
  }

  /* Pagination Handlers */
  const nextSection = () => {
    if (currentSectionIndex < testSnapshot.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    }
  };

  const prevSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

  const currentSectionSnap = testSnapshot[currentSectionIndex];
  const currentSectionResponse = response.find(
    (s) => s.sectionId === currentSectionSnap?.sectionId
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Test Preview</h2>

      {/* ---------- Pagination Header ---------- */}
      <div className="flex items-center justify-between mb-6 bg-white shadow p-4 rounded-xl border">
        <IconButton onClick={prevSection} disabled={currentSectionIndex === 0}>
          <ArrowBackIos />
        </IconButton>

        <h1 className="text-xl font-semibold text-gray-700">
          Section {currentSectionIndex + 1}: {currentSectionSnap?.title}
        </h1>

        <IconButton
          onClick={nextSection}
          disabled={currentSectionIndex === testSnapshot.length - 1}
        >
          <ArrowForwardIos />
        </IconButton>
      </div>

      {/* ---------- Section Renderer ---------- */}
      <div className="bg-white shadow-md rounded-xl border p-6">
        {currentSectionSnap.type === "quiz" && (
          <QuizSection
            section={currentSectionSnap}
            sectionResponse={currentSectionResponse}
          />
        )}

        {currentSectionSnap.type === "coding" && (
          <CodingSection
            section={currentSectionSnap}
            sectionResponse={currentSectionResponse}
          />
        )}
      </div>

      {/* ---------- Pagination Footer ---------- */}
      <div className="flex justify-between mt-6">
        <button
          onClick={prevSection}
          disabled={currentSectionIndex === 0}
          className="px-4 py-2 rounded-md bg-gray-200 disabled:opacity-50"
        >
          Previous
        </button>

        <button
          onClick={nextSection}
          disabled={currentSectionIndex === testSnapshot.length - 1}
          className="px-4 py-2 rounded-md bg-blue-600 text-white disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

/* ------------------------ QUIZ SECTION ------------------------ */

const QuizSection = ({ section, sectionResponse }) => {
  return (
    <div className="space-y-6">
      {section?.questions?.map((ques, idx) => {

        const userAnswer = sectionResponse?.quizAnswers?.[0]?.[ques?._id];
        console.log(userAnswer)

        return (
          <div
            key={ques?._id}
            className="bg-gray-50 p-4 rounded-xl border border-gray-200"
          >
            <pre className="text-lg font-medium text-gray-900 mb-3">
              {`Q${idx + 1}. ${ques.question}`}
            </pre>

            <div>
              {ques.answer &&
                <>
                  <label className="text-xs" htmlFor="">Correct Answer</label>
                  <pre className="bg-gray-50 px-4 py-3 rounded-lg border-2 border-gray-100">
                    {ques.answer}
                  </pre>
                  <label className="text-xs" htmlFor="">Your Answer</label>
                  <pre className={`bg-gray-50 px-4 py-3 rounded-lg border-[1px] ${ userAnswer !== ques?.answer ?  'border-red-500':'border-green-100' }`}>
                    {userAnswer ?? "Not Attempted"}
                  </pre>
                </>
              }
            </div>
            <div className="flex flex-col gap-3">
              
              {ques?.options?.map((op, opIndex) => {
                const isCorrect = op?.isCorrect;
                const a = ["1", "2", "3"]
                const str = "1"
                a.includes(str);
                const isUserAnswer =  ques?.category == 'MSQ' ?  userAnswer?.includes(op?.text)  : userAnswer === op?.text;

                return (
                  <div
                    key={opIndex}
                    className={`
                      px-4 py-3 rounded-md border 
                      flex justify-between items-center
                      ${isCorrect ? "bg-green-100 border-green-400" : "bg-white"}
                      ${isUserAnswer && !isCorrect ? "bg-red-100 border-red-400" : ""}
                    `}
                  >
                    <span className="text-gray-900">{op?.text}</span>

                    <div className="flex gap-3 text-sm">
                      {isCorrect && (
                        <span className="text-green-700 font-semibold">✓ Correct</span>
                      )}
                      {isUserAnswer && (
                        <span className="text-blue-700 font-semibold">
                          Your Answer
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* ------------------------ CODING SECTION ------------------------ */

const CodingSection = ({ section, sectionResponse }) => {
  return (
    <div className="space-y-10">
      {section?.problems?.map((problem) => (
        <div key={problem._id} className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-800">{problem.title}</h1>

          <SectionCard title="Description">
            <p className="text-gray-700 whitespace-pre-line">
              {problem.description}
            </p>
          </SectionCard>

          {problem.constraints?.length > 0 && (
            <SectionCard title="Constraints">
              <ul className="list-disc pl-6 text-gray-700">
                {problem.constraints.map((c, idx) => (
                  <li key={idx}>{c}</li>
                ))}
              </ul>
            </SectionCard>
          )}

          {problem.examples?.length > 0 && (
            <SectionCard title="Examples">
              {problem.examples.map((ex, idx) => (
                <div key={idx} className="bg-gray-100 p-4 rounded-md border mb-4">
                  <p className="font-medium text-gray-800">Input:</p>
                  <pre className="text-gray-700">{ex.input}</pre>

                  <p className="font-medium text-gray-800 mt-2">Output:</p>
                  <pre className="text-gray-700">{ex.output}</pre>

                  {ex.explanation && (
                    <>
                      <p className="font-medium text-gray-800 mt-2">
                        Explanation:
                      </p>
                      <pre className="text-gray-700">
                        {ex.explanation}
                      </pre>
                    </>
                  )}
                </div>
              ))}
            </SectionCard>
          )}

          <SectionCard title="Your Submitted Code">
            <pre className="bg-black text-green-400 p-4 rounded-lg overflow-auto text-sm">
              {sectionResponse?.codingAnswers[0][problem._id]?.code || ""}
            </pre>
          </SectionCard>

          <SectionCard title="Testcases">
            <pre className="bg-gray-900 text-gray-200 p-4 rounded-lg overflow-auto text-sm">
              {sectionResponse?.codingAnswers[0][problem._id]?.total ?? 0}
            </pre>
          </SectionCard>

          <SectionCard title="Passed">
            <pre className="bg-gray-800 text-white p-4 rounded-lg text-sm">
              {String(sectionResponse?.codingAnswers[0][problem._id]?.passed) ?? 0}
            </pre>
          </SectionCard>
        </div>
      ))}
    </div>
  );
};

/* ------------------------ Reusable Card ------------------------ */
const SectionCard = ({ title, children }) => (
  <div className="bg-white p-5 rounded-lg shadow border border-gray-200">
    <h2 className="text-xl font-semibold text-gray-700 mb-3">{title}</h2>
    {children}
  </div>
);

export default TestSeriesPreview;
