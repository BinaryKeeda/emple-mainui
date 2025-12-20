import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchContent } from "../api/fetchContent";
import TableFilters from "./TableFilters";
import PaginatedTable from "./PaginatedTable";
import Loader from "../../../layout/Loader";

const QuizTestList = ({ type }) => {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    difficulty: "",
    isAvailable: "",
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const queryKey = ["admin-" + type, { endpoint: `${type}`, params: filters }];

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: fetchContent,
    staleTime: 300000,
    cacheTime: 3600000,
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-white border-b shadow-sm p-4">
        <h1 className="text-2xl font-bold capitalize text-gray-800">
          {type} Management
        </h1>
      </div>

      {/* Filters */}
      <div className="p-4 mx-auto">
        <TableFilters filters={filters} setFilters={setFilters} type={type} />
      </div>

      {/* Loader */}
      {isLoading ? (
        <Loader/>
      ) : (
        <div className="px-4 pb-4 mx-auto">
          {/* Table */}
          <PaginatedTable data={data} type={type} />

          {/* Pagination Controls */}
          <div className="mt-6 flex justify-between items-center">
            <button
              disabled={filters.page <= 1}
              onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
              className="px-5 py-2 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            >
              ← Prev
            </button>

            <span className="text-sm text-gray-600">
              Page {data?.page} of {data?.totalPages}
            </span>

            <button
              disabled={filters.page >= data?.totalPages}
              onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
              className="px-5 py-2 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizTestList;
