import { Moon, Sun } from "lucide-react"

interface Props {
  dark: boolean
  setDark: React.Dispatch<React.SetStateAction<boolean>>
}

const DarkModeToggle = ({ dark, setDark }: Props) => {
  return (
    <button
      onClick={() => setDark(!dark)}
      className="flex items-center gap-2 px-3 py-2 rounded-lg border
                 bg-zinc-100 dark:bg-zinc-800
                 hover:bg-zinc-200 dark:hover:bg-zinc-700
                 transition"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
      <span className="text-sm">
        {dark ? "Light" : "Dark"}
      </span>
    </button>
  )
}

export default DarkModeToggle