import { useEffect, useMemo, useState } from "react";
import { fetchJobs } from "../api/jobs.api";
import type { Job } from "../types/job.types";
import { filterJobs } from "../utils/filterJobs";
import { sortJobs } from "../utils/sortJobs";
import { exportCSV } from "../utils/exportCSV";
import { exportPDF } from "../utils/exportPDF";
import { useDebounce } from "../hooks/useDebounce";
import { useDarkMode } from "../hooks/useDarkMode";

import JobList from "../components/job/JobList";
import JobSkeleton from "../components/job/JobSkeleton";
import Pagination from "../components/common/Pagination";
import DarkModeToggle from "../components/common/DarkModeToggle";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  const { dark, setDark } = useDarkMode();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [useInfinite, setUseInfinite] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    location: "",
    employmentTypes: [] as string[],
    remoteOnly: false,
  });

  const [sortBy, setSortBy] = useState("newest");

  const debouncedSearch = useDebounce(filters.search, 500);
  useEffect(() => {
    const loadJobs = async () => {
      if (useInfinite && page > 1) {
        setIsFetchingMore(true);
      } else {
        setLoading(true);
      }

      try {
        const data = await fetchJobs(page);
        const newJobs = data.data || data.jobs || [];

        if (useInfinite && page > 1) {
          // append only
          setJobs((prev) => [...prev, ...newJobs]);
        } else {
          // first load OR pagination mode
          setJobs(newJobs);
        }

        setTotalPages(data.total || 1);
      } catch (err) {
        console.error("Error fetching jobs", err);
      } finally {
        setLoading(false);
        setIsFetchingMore(false);
      }
    };

    loadJobs();
  }, [page]);

  // FILTER + SORT MEMOIZED
  const processedJobs = useMemo(() => {
    const filtered = filterJobs(jobs, {
      ...filters,
      search: debouncedSearch,
    });

    return sortJobs(filtered, sortBy);
  }, [jobs, filters, debouncedSearch, sortBy]);

  // CLEAR SINGLE FILTER
  const removeFilter = (key: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: key === "employmentTypes" ? [] : "",
    }));
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Job Listing Portal</h1>

        <div className="flex gap-3 items-center">
          <button
            onClick={() => exportCSV(processedJobs)}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Export CSV
          </button>

          <button
            onClick={() => exportPDF(processedJobs)}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Export PDF
          </button>

          <DarkModeToggle dark={dark} setDark={setDark} />
        </div>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search jobs..."
        className="w-full px-4 py-2 rounded-lg border
           bg-white text-gray-900
           placeholder:text-gray-400
           dark:bg-gray-900 dark:text-white
           dark:placeholder:text-gray-500
           dark:border-gray-700"
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />

      {/* SORT + MODE TOGGLE */}
      <div className="flex flex-wrap gap-4 items-center">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="newest">Newest First</option>
          <option value="salaryHigh">Salary High to Low</option>
          <option value="salaryLow">Salary Low to High</option>
        </select>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={useInfinite}
            onChange={() => setUseInfinite(!useInfinite)}
          />
          Infinite Scroll
        </label>
      </div>

      {/* FILTER SUMMARY */}
      <div className="flex flex-wrap gap-2">
        {filters.search && (
          <div className="bg-blue-100 px-3 py-1 rounded flex gap-2">
            Search: {filters.search}
            <button onClick={() => removeFilter("search")}>x</button>
          </div>
        )}
      </div>

      {/* JOB LIST */}
      {loading && page === 1 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(5)].map((_, i) => (
            <JobSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          {useInfinite ? (
            <>
              <InfiniteScroll
                dataLength={jobs.length}
                next={() => setPage((prev) => prev + 1)}
                hasMore={page < totalPages}
                loader={<h4 className="text-center py-4">Loading...</h4>}
                scrollThreshold={0.9}
              >
                <JobList jobs={jobs} />
              </InfiniteScroll>

              {isFetchingMore && (
                <div className="text-center py-4">Loading more...</div>
              )}
            </>
          ) : (
            <>
              {!useInfinite && (
                <>
                  <JobList jobs={processedJobs} />

                  {processedJobs.length > 0 && (
                    <Pagination
                      page={page}
                      setPage={setPage}
                      totalPages={totalPages}
                    />
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
