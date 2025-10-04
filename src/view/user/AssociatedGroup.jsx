// import React from 'react'
// import { useSelector } from 'react-redux'
// import { useSearchParams, useParams, Link } from 'react-router-dom'
import QuizDisplay from './components/QuizDisplay'
import TestDisplay from './components/TestDisplay'
// import { useSectionData } from './hooks/useGroupData'

import { useSelector } from "react-redux"
import { Link, useParams, useSearchParams } from "react-router-dom"
import { useSectionData } from "./hooks/useGroupData"



// const TestList = ({ sectionId }) => (
//   <div className="p-4 bg-gray-900 text-white rounded-lg">
//     <h2 className="text-xl font-semibold">Test List for Section {sectionId}</h2>
//   </div>
// )

// export default function AssociatedGroup() {
//   const { user } = useSelector(s => s.auth)
//   const userId = user._id;
//   const { id } = useParams() // groupId
//   const [searchParams, setSearchParams] = useSearchParams()
//   const sectionId = searchParams.get('section')
//   const tab = searchParams.get('tab') // "quiz" or "test"
//   const {data , error} = useSectionData({userId: userId});
//   if(error) JSON.stringify(error)
//   // {JSON.strin gify(data)}
//   // // Find the selected section
//   // const selectedSection = user.groups[id]?.sections.find(
//   //   s => s._id === sectionId
//   // )

//   // ----- Section Card Component -----
//   const SectionCard = ({ section }) => (
//     <Link
//       to={`?section=${section._id}`}
//       className='
//         bg-gray-800 text-white rounded-lg shadow-lg
//         p-4 hover:bg-gray-700 transition-all
//         flex flex-col justify-between
//       '
//     >
//       <h3 className='text-lg font-semibold mb-2'>{section.name}</h3>
//       <p className='text-gray-300 text-sm'>
//         {section.lessons
//           ? `${section.lessons.length} lessons`
//           : 'No lessons yet'}
//       </p>
//     </Link>
//   )

//   // ----- Section Actions Component -----
//   const SectionActions = ({ section }) => {
//     const landingCards = [
//       {
//         head: 'Quiz',
//         type: 'quiz',
//         image: section.quizImage || 'https://res.cloudinary.com/drzyrq7d5/image/upload/v1757593501/quiz_ptz1ft.png'
//       },
//       {
//         head: 'Test Series',
//         type: 'test',
//         image: section.testImage || 'https://res.cloudinary.com/dkybjjott/image/upload/v1750263010/WhatsApp_Image_2025-06-11_at_21.12.06-removebg-preview_losyhk.png'
//       }
//     ]

//     const handleClick = (type) => {
//       setSearchParams({ section: section._id, tab: type })
//     }

//     // If a tab is selected, only show the corresponding component
//     if (tab === 'quiz') return <QuizDisplay sectionId={section._id} isGroup={true} />
//     if (tab === 'test') return <TestDisplay sectionId={section._id} isGroup={true} />

//     return (
//       <div className='flex gap-5'>
//         {landingCards.map((card, idx) => (
//           <div
//             key={idx}
//             onClick={() => handleClick(card.type)}
//             className='flex items-center p-5 min-w-96 cursor-pointer flex-col overflow-hidden rounded-[22px] border border-gray-100 bg-primary shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:border-gray-700 dark:shadow-black/40'
//           >
//             <img
//               src={card.image}
//               alt={card.head}
//               className='h-[200px] w-full object-contain'
//             />
//             <hr className='mt-5 mx-5 w-52' />
//             <div className='flex flex-1 items-center justify-center p-5'>
//               <h2 className='text-lg font-semibold text-gray-800 dark:text-white'>
//                 {card.head}
//               </h2>
//             </div>
//           </div>
//         ))}
//       </div>
//     )
//   }

//   // ----- Render -----
//   return (
//     // <div className='p-4'>
//     //   {selectedSection ? (
//     //     <SectionActions section={selectedSection} />
//     //   ) : (
//     //     <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
//     //       {user.groups[id]?.sections.map(section => (
//     //         <SectionCard key={section._id} section={section} />
//     //       ))}
//     //     </div>
//     //   )}
//     // </div>
//     <></>
//   )
// }


export default function AssociatedGroup() {
  const { user } = useSelector(s => s.auth)
  const userId = user._id
  const { id } = useParams() // groupId
  const [searchParams, setSearchParams] = useSearchParams()
  const sectionId = searchParams.get('section')
  const tab = searchParams.get('tab') // "quiz" or "test"

  const { data, error } = useSectionData({ userId })
  if (error) return <p className="text-red-500">Error: {JSON.stringify(error)}</p>
  if (!data) return <p className="text-gray-400">Loading...</p>

  // Pick the currently selected section
  const selectedSection = data?.data?.find(
    (s) => s.section._id === sectionId
  )?.section
  const SectionActions = ({ section }) => {
    const landingCards = [
      {
        head: 'Quiz',
        type: 'quiz',
        image: section.quizImage || 'https://res.cloudinary.com/drzyrq7d5/image/upload/v1757593501/quiz_ptz1ft.png'
      },
      {
        head: 'Test Series',
        type: 'test',
        image: section.testImage || 'https://res.cloudinary.com/dkybjjott/image/upload/v1750263010/WhatsApp_Image_2025-06-11_at_21.12.06-removebg-preview_losyhk.png'
      }
    ]

    const handleClick = (type) => {
      setSearchParams({ section: section._id, tab: type })
    }

    // If a tab is selected, only show the corresponding component
    if (tab === 'quiz') return <QuizDisplay sectionId={section._id} isGroup={true} />
    if (tab === 'test') return <TestDisplay sectionId={section._id} isGroup={true} />

    return (
      <div className='flex gap-5'>
        {landingCards.map((card, idx) => (
          <div
            key={idx}
            onClick={() => handleClick(card.type)}
            className='flex items-center p-5 min-w-96 cursor-pointer flex-col overflow-hidden rounded-[22px] border border-gray-100 bg-primary shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:border-gray-700 dark:shadow-black/40'
          >
            <img
              src={card.image}
              alt={card.head}
              className='h-[200px] w-full object-contain'
            />
            <hr className='mt-5 mx-5 w-52' />
            <div className='flex flex-1 items-center justify-center p-5'>
              <h2 className='text-lg font-semibold text-gray-800 dark:text-white'>
                {card.head}
              </h2>
            </div>
          </div>
        ))}
      </div>
    )
  }
  // ----- Section Card Component -----
  const SectionCard = ({ section }) => (
    <Link
      to={`?section=${section._id}`}
      className="
        bg-[#242424] text-white rounded-lg shadow-lg
        p-4 hover:bg-[#1c1c1c] transition-all
        flex flex-col justify-between
      "
    >
      <img src={section.image} className='h-32' alt="" />
      <h3 className="text-lg font-semibold mt-2 rounded-md mb-2">{section.name}</h3>
      <p className="text-gray-300 text-sm">Click to open</p>
    </Link>
  )

  // ----- Render -----
  return (
    <div className="p-4">
      {selectedSection ? (
        <SectionActions section={selectedSection} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data?.data?.map((item) => (
            <SectionCard key={item.section._id} section={item.section} />
          ))}
        </div>
      )}
    </div>
  )
}
