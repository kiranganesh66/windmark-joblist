import type { Job } from "../../types/job.types"

interface Props {
  job: Job
}

const JobCard = ({ job }: Props) => {
  return (
    <div className="p-5 border rounded-xl shadow-sm 
                    bg-white dark:bg-zinc-900 
                    hover:shadow-md transition">

      <div className="flex justify-between items-start mb-2">
        <h2 className="text-lg font-semibold">{job.title}</h2>
        {job.is_remote_work === 1 && (
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
            Remote
          </span>
        )}
      </div>

      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        {job.company} • {job.location}
      </p>

      <p className="mt-2 text-sm line-clamp-2">
        {job.description}
      </p>

      <div className="mt-3 flex justify-between text-sm">
        <span>
          ₹{job.salary_from} - ₹{job.salary_to}
        </span>
        <span className="text-blue-600">
          {job.employment_type}
        </span>
      </div>

      <div className="mt-2 text-xs text-zinc-500">
        Category: {job.job_category}
      </div>

    </div>
  )
}

export default JobCard