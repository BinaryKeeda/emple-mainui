const DataTable = ({ headers = [], rows = [] }) => {
  return (
    <table className="table-auto w-full border border-gray-300 my-6 text-sm">
      <thead className="bg-gray-100">
        <tr>
          {headers.map((header, idx) => (
            <th
              key={idx}
              className="border border-gray-300 px-4 py-2 text-left"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rIdx) => (
          <tr key={rIdx} className="hover:bg-gray-50">
            {row.map((cell, cIdx) => (
              <td key={cIdx} className="border border-gray-300 px-4 py-2">
                {typeof cell === "string" && cell.startsWith("<code>") ? (
                  <code dangerouslySetInnerHTML={{ __html: cell }} />
                ) : (
                  cell
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
