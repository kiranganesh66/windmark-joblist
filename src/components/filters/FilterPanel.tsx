interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filters: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  locations: string[];
  categories: string[];
}

const FilterPanel = ({ filters, setFilters, locations, categories }: Props) => {
  return (
    <div
      className="p-4 border rounded-lg space-y-4 
                    bg-white dark:bg-zinc-900"
    >
      {/* Location */}
      <div>
        <label className="block text-sm mb-1">Location</label>
        <select
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          className="w-full border p-2 rounded"
        >
          <option value="">All</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Employment Type */}
      <div>
        <label className="block text-sm mb-1">Employment Type</label>
        <div className="space-y-2">
          {["Full-Time", "Part-Time", "Contract", "Internship"].map((type) => (
            <label key={type} className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={filters.employmentTypes.includes(type)}
                onChange={() => {
                  const exists = filters.employmentTypes.includes(type);

                  setFilters({
                    ...filters,
                    employmentTypes: exists
                      ? filters.employmentTypes.filter(
                          (t: string) => t !== type,
                        )
                      : [...filters.employmentTypes, type],
                  });
                }}
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm mb-1">Category</label>
        <select
          value={filters.category || ""}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="w-full border p-2 rounded"
        >
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Remote Toggle */}
      <label className="flex gap-2 items-center">
        <input
          type="checkbox"
          checked={filters.remoteOnly}
          onChange={() =>
            setFilters({ ...filters, remoteOnly: !filters.remoteOnly })
          }
        />
        Remote Only
      </label>
    </div>
  );
};

export default FilterPanel;
