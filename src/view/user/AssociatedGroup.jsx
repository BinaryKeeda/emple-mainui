import { useSelector } from "react-redux"
import { Link, useParams, useSearchParams } from "react-router-dom"
import { useSectionData } from "./hooks/useGroupData"
import QuizDisplay from "./components/QuizDisplay"
import TestDisplay from "./components/TestDisplay"
import { useUser } from "../../context/UserContext"

export default function AssociatedGroup() {
  const { user } = useUser()
  const userId = user._id
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const sectionId = searchParams.get("section")
  const tab = searchParams.get("tab")

  const { data, error } = useSectionData({ userId, id })

  if (error)
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-red-600 font-medium">
          Error loading sections: {JSON.stringify(error)}
        </p>
      </div>
    )

  if (!data)
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading sections...</div>
      </div>
    )

  const selectedSection = data?.data?.find(
    (s) => s.section._id === sectionId
  )?.section

  // ----- Section Card -----
  const SectionCard = ({ section }) => (
    <Link
      to={`?section=${section._id}`}
      className="
        group relative bg-white border border-gray-200 
        rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1
        transition-all duration-300 overflow-hidden
      "
    >
      <img
        src={section.logo}
        alt={section.name}
        className="h-40 w-full object-cover opacity-95 group-hover:opacity-100 transition-all"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
          {section.name}
        </h3>
        <p className="text-gray-500 text-sm">Click to explore</p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-all" />
    </Link>
  )

  // ----- Section Actions -----
  const SectionActions = ({ section }) => {
    const landingCards = [
      {
        head: "Quiz",
        type: "quiz",
        image:
          section.quizImage ||
          "https://res.cloudinary.com/drzyrq7d5/image/upload/v1757593501/quiz_ptz1ft.png",
      },
      {
        head: "Test Series",
        type: "test",
        image:
          section.testImage ||
          "https://res.cloudinary.com/dkybjjott/image/upload/v1750263010/WhatsApp_Image_2025-06-11_at_21.12.06-removebg-preview_losyhk.png",
      },
    ]

    const handleClick = (type) => {
      setSearchParams({ section: section._id, tab: type })
    }

    if (tab === "quiz")
      return <QuizDisplay sectionId={section._id} isGroup={true} />
    if (tab === "test")
      return <TestDisplay sectionId={section._id} isGroup={true} />

    return (
      <div className="flex px-5  gap-8 py-6">
        {landingCards.map((card, idx) => (
          <div
            key={idx}
            onClick={() => handleClick(card.type)}
            className="
              cursor-pointer flex flex-col items-center
              bg-white rounded-2xl border border-gray-200
              shadow-sm hover:shadow-md hover:-translate-y-1
              transition-all duration-300 overflow-hidden
              w-80
            "
          >
            <img
              src={card.image}
              alt={card.head}
              className="h-52 w-full object-contain  p-4"
            />
            <div className="flex flex-col items-center justify-center p-4 w-full">
              <hr className="w-2/3 border-gray-200 mb-3" />
              <h2 className="text-xl font-semibold text-gray-800 tracking-wide">
                {card.head}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Click to view {card.head.toLowerCase()}
              </p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // ----- Render -----
  return (
    <div className="min-h-screen">
      {!selectedSection ? (
        <>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.data?.map((item) => (
              <SectionCard key={item.section._id} section={item.section} />
            ))}
          </div>
        </>
      ) : (
        <>
          <SectionActions section={selectedSection} />
        </>
      )}
    </div>
  )
}
