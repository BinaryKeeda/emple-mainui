import CodeBlock from "./CodeBlock";
import MCQQuestion from "./MCQQuestion";
import VideoTutorial from "./VideoTutorial";
import DataTable from "./DataTable";

const Content = ({ sections }) => {
  let heading1Count = 0;
  let heading2Count = 0;
  let latestHeading1Id = "";

  return (
    <div className="max-w-5xl mx-auto font-sans text-gray-800 leading-relaxed px-4 sm:px-6">
      {sections.map((section, i) => {
        switch (section.type) {
          case "heading1": {
            heading1Count++;
            heading2Count = 0;
            const id = `heading${heading1Count}`;
            section.id = id;
            latestHeading1Id = id;
            return (
              <h1
                key={i}
                id={id}
                className="scroll-mt-24 text-[35px] mt-[50px] font-semibold text-gray-900"
              >
                {section.text}
              </h1>
            );
          }

          case "heading2": {
            heading2Count++;
            const id = `${latestHeading1Id}-${heading2Count}`;
            section.id = id;
            return (
              <h2
                key={i}
                id={id}
                className="scroll-mt-24 text-[27px] mt-[40px] font-semibold text-gray-900"
              >
                {section.text}
              </h2>
            );
          }

          case "paragraph":
            return (
              <p key={i} className="text-[17px] mt-4 text-gray-800">
                {section.text}
              </p>
            );

          case "code":
            return (
              <div className="my-4" key={i}>
                <CodeBlock
                  code={section.code}
                  language={section.language || "python"}
                />
              </div>
            );

          case "list":
            return (
              <ul
                key={i}
                className="list-disc pl-6 text-[16px] mt-4 text-gray-800"
              >
                {section.items.map((item, j) => (
                  <li key={j} className="mb-1">
                    <strong>{item.label}:</strong>{" "}
                    {item.desc.startsWith("https") ? (
                      <a
                        href={item.desc}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        {item.desc}
                      </a>
                    ) : (
                      item.desc
                    )}
                  </li>
                ))}
              </ul>
            );

          case "video":
            return (
              <div className="my-6" key={i}>
                <VideoTutorial
                  title={section.title}
                  videoUrl={section.url}
                  description={section.description}
                />
              </div>
            );

          case "mcq":
            return (
              <div className="my-6" key={i}>
                <MCQQuestion
                  question={section.question}
                  code={section.code}
                  options={section.options}
                  correctIndex={section.correctIndex}
                />
              </div>
            );

          case "table":
            return (
              <div className="overflow-x-auto my-6" key={i}>
                <DataTable headers={section.headers} rows={section.rows} />
              </div>
            );

          case "image":
            return (
              <div className="my-6" key={i}>
                <img
                  src={section.src}
                  alt={section.alt}
                  className="rounded-lg shadow-md max-w-full h-auto"
                />
              </div>
            );

          case "quote":
            return (
              <blockquote
                key={i}
                className="italic border-l-4 pl-4 ml-2 text-gray-700 my-4"
              >
                {section.text}
              </blockquote>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default Content;
