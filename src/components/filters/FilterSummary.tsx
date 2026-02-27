/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props {
  filters: any
  removeFilter: (key: string) => void
}

const FilterSummary = ({ filters, removeFilter }: Props) => {
  return (
    <div className="flex flex-wrap gap-2">

      {filters.search && (
        <Tag label={`Search: ${filters.search}`} onRemove={() => removeFilter("search")} />
      )}

      {filters.location && (
        <Tag label={`Location: ${filters.location}`} onRemove={() => removeFilter("location")} />
      )}

      {filters.remoteOnly && (
        <Tag label="Remote Only" onRemove={() => removeFilter("remoteOnly")} />
      )}

      {filters.employmentTypes?.length > 0 && (
        <Tag
          label={`Employment: ${filters.employmentTypes.join(", ")}`}
          onRemove={() => removeFilter("employmentTypes")}
        />
      )}

    </div>
  )
}

const Tag = ({ label, onRemove }: any) => (
  <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded flex gap-2 items-center">
    {label}
    <button onClick={onRemove}>✕</button>
  </div>
)

export default FilterSummary