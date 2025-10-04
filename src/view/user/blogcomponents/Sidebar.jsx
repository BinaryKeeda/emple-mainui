import { useState } from "react";

const Sidebar = ({ sections }) => {
  const grouped = [];
  let currentGroup = null;

  sections.forEach((section) => {
    if (section.type === "heading1") {
      currentGroup = { ...section, children: [] };
      grouped.push(currentGroup);
    } else if (section.type === "heading2" && currentGroup) {
      currentGroup.children.push(section);
    }
  });

  const [openIndex, setOpenIndex] = useState(null);

  const toggleSection = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <aside className="sticky bg-white lg:block hidden top-24 mt-[53px] self-start max-h-[80vh] overflow-y-auto p-4 space-y-8">
      {grouped.map((section, index) => (
        <div key={section.id}>
          <button
            onClick={() => toggleSection(index)}
            className="w-full flex justify-between items-center text-left text-[16px] font-semibold text-gray-800 transition border-b pb-2"
          >
            <span>{section.text}</span>
            <span className="text-lg">{openIndex === index ? "▾" : "▸"}</span>
          </button>

          {openIndex === index && section.children.length > 0 && (
            <ul className="mt-2 ml-0 space-y-1 text-sm text-gray-700">
              {section.children.map((sub, i) => (
                <li key={i}>
                  <a
                    href={`#${sub.id}`}
                    className="block hover:bg-blue-100 hover:text-blue-800 rounded-md px-2 py-1 transition"
                  >
                    {sub.text}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
