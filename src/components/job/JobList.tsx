import JobCard from "./JobCard"
import type { Job } from "../../types/job.types"

interface Props {
  jobs: Job[]
}

const JobList = ({ jobs }: Props) => {
  if (!jobs.length) {
    return (
      <div className="text-center py-10 text-zinc-500">
        No jobs found.
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  )
}

export default JobList