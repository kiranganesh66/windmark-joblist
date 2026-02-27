interface Props {
  page: number
  totalPages: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}

const Pagination = ({ page, totalPages, setPage }: Props) => {
  const getVisiblePages = () => {
    const pages: (number | string)[] = []

    const maxVisible = 5
    const half = Math.floor(maxVisible / 2)

    let start = Math.max(1, page - half)
    let end = Math.min(totalPages, page + half)

    // Adjust when near beginning
    if (page <= half) {
      end = Math.min(totalPages, maxVisible)
    }

    // Adjust when near end
    if (page + half >= totalPages) {
      start = Math.max(1, totalPages - maxVisible + 1)
    }

    // Show first page
    if (start > 1) {
      pages.push(1)
      if (start > 2) pages.push("...")
    }

    // Middle pages
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    // Show last page
    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...")
      pages.push(totalPages)
    }

    return pages
  }

  const pages = getVisiblePages()

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
      {/* Prev */}
      <button
        disabled={page === 1}
        onClick={() => setPage((prev) => prev - 1)}
        className="px-3 py-2 border rounded disabled:opacity-50"
      >
        Prev
      </button>

      {/* Page Numbers */}
      {pages.map((p, index) =>
        p === "..." ? (
          <span key={index} className="px-2">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => setPage(Number(p))}
            className={`px-3 py-2 border rounded transition-colors
              ${
                page === p
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-zinc-800 dark:text-white"
              }`}
          >
            {p}
          </button>
        )
      )}

      {/* Next */}
      <button
        disabled={page === totalPages}
        onClick={() => setPage((prev) => prev + 1)}
        className="px-3 py-2 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  )
}

export default Pagination