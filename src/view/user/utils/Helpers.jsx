export function SectionHeader({ title }) {
  return (
    <div className="flex justify-start w-full rounded-md">
      <span className="text-lg text-start font-medium bg-gradient-to-r from-black via-gray-600 to-gray-500 bg-clip-text text-transparent">
        {title}
      </span>
    </div>
  )
}
