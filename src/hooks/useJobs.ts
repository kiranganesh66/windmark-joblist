// import { useEffect, useState } from "react"
// import { fetchJobs } from "../api/jobs.api"
// import { getCache, setCache } from "../utils/cache"
// import type { Job } from "../types/job.types"

// export const useJobs = (page: number, useInfinite: boolean) => {
//   const [jobs, setJobs] = useState<Job[]>([])
//   const [loading, setLoading] = useState(true)
//   const [totalPages, setTotalPages] = useState(1)

//   useEffect(() => {
//     const loadJobs = async () => {
//       const cacheKey = `jobs-page-${page}`
//     console.log("Loading jobs for page", page, "with cache key", cacheKey)
//       setLoading(true)

//       try {
//         const cached = getCache(cacheKey)

//         if (cached) {
//           if (useInfinite && page > 1) {
//             setJobs((prev) => [...prev, ...cached.data])
//           } else {
//             setJobs(cached.data)
//           }
//           setTotalPages(cached.total_pages)
//           setLoading(false)
//           return
//         }

//         const data = await fetchJobs(page)

//         setCache(cacheKey, data)

//         if (useInfinite && page > 1) {
//           setJobs((prev) => [...prev, ...data.data])
//         } else {
//           setJobs(data.data)
//         }

//         setTotalPages(data.total_pages || 1)
//       } catch (error) {
//         console.error("Error fetching jobs", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     loadJobs()
//   }, [page, useInfinite])

//   return { jobs, loading, totalPages }
// }