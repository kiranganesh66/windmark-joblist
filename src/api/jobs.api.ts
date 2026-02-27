import axios from "axios"

const BASE_URL = "https://jsonfakery.com/jobs/paginated"

export const fetchJobs = async (page: number) => {
  const { data } = await axios.get(`${BASE_URL}?page=${page}`)
  return data
}