import type { Job } from "../types/job.types";

export const sortJobs = (jobs: Job[], sortBy: string) => {
  const sorted = [...jobs];

  switch (sortBy) {
    case "newest":
      return sorted.sort(
        (a, b) =>
          new Date(b.created_at || "").getTime() -
          new Date(a.created_at || "").getTime(),
      );

    case "salaryHigh":
      return sorted.sort((a, b) => b.salary_to - a.salary_to);

    case "salaryLow":
      return sorted.sort((a, b) => a.salary_from - b.salary_from);

    default:
      return jobs;
  }
};
