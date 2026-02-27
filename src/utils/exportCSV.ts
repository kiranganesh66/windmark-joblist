import { saveAs } from "file-saver"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const exportCSV = (jobs: any[]) => {
  const headers = [
    "Title",
    "Company",
    "Location",
    "Salary From",
    "Salary To",
    "Employment Type",
    "Job Category",
    "Remote"
  ]

  const rows = jobs.map((job) => [
    job.title,
    job.company,
    job.location,
    job.salary_from,
    job.salary_to,
    job.employment_type,
    job.job_category,
    job.is_remote_work ? "Yes" : "No"
  ])

  const csvContent =
    [headers, ...rows].map((e) => e.join(",")).join("\n")

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  saveAs(blob, "jobs.csv")
}