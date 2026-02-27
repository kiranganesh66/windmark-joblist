import type { Job } from "../types/job.types"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const filterJobs = (jobs: Job[], filters: any) => {
  return jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      job.company.toLowerCase().includes(filters.search.toLowerCase()) ||
      job.description.toLowerCase().includes(filters.search.toLowerCase())

    const matchesLocation = filters.location
      ? job.location === filters.location
      : true

    const matchesEmployment =
      filters.employmentTypes.length > 0
        ? filters.employmentTypes.includes(job.employment_type)
        : true

    const matchesRemote = filters.remoteOnly
      ? job.is_remote_work === 1
      : true

    return matchesSearch && matchesLocation && matchesEmployment && matchesRemote
  })
}