// import { PieChart } from '@mui/x-charts/PieChart'
// import { Box } from '@mui/material'
// import LinearProgressWithLabel from './LinearLabel'
// import { useSelector } from 'react-redux'
// import React from 'react'
// import Loader from '../../../layout/Loader'
// import { SectionHeader } from '../utils/Helpers'
// import { useRankData } from '../../../hooks/user/UserApi'
// import { useUser } from '../../../context/UserContext'

// const pieParams = {
//   margin: { right: 5, top: -4 },
//   slotProps: { legend: { hidden: true } }
// }

// // Harmonious light-orange theme
// const themeColors = {
//   aptitude: '#FFDAB3', // soft pastel peach
//   core: '#FFBC80', // warm light orange
//   misc: '#FFA64D' // slightly deeper orange
// }

// // Lighter shades for hover/faded effect
// const fadedColors = {
//   aptitude: '#FFDAB3', // soft pastel peach
//   core: '#FFBC80', // warm light orange
//   misc: '#FFA64D' // slightly deeper orange
// }

// function ProgressArea({
//   rankData,
//   rankDataLoading
// }: {
//   rankData: any,
//   rankDataLoading: boolean
// }) {

//   const aptitude = rankData?.getRank?.userRank?.solutions?.aptitude?.attempted || 0
//   const core = rankData?.getRank?.userRank?.solutions?.core?.attempted || 0
//   const misc = rankData?.getRank?.userRank?.solutions?.miscellaneous?.attempted || 0

//   const isEmpty = aptitude === 0 && core === 0 && misc === 0

//   const pieData = isEmpty
//     ? [
//       {
//         label: 'No data yet',
//         color: '#e5e7eb',
//         value: 1,
//         fadedColor: '#f3f4f6'
//       }
//     ]
//     : [
//       {
//         label: 'Aptitude',
//         color: themeColors.aptitude,
//         value: aptitude,
//         fadedColor: fadedColors.aptitude
//       },
//       {
//         label: 'Core',
//         color: themeColors.core,
//         value: core,
//         fadedColor: fadedColors.core
//       },
//       {
//         label: 'Miscellaneous',
//         color: themeColors.misc,
//         value: misc,
//         fadedColor: fadedColors.misc
//       }
//     ]

//   if (rankDataLoading) {
//     return (
//       <div className='flex items-center justify-center flex-[.5] p-6 bg-white rounded-xl shadow'>
//         <Loader />
//       </div>
//     )
//   }

//   return (
//     <div className='flex relative flex-col items-center justify-center flex-[0.7] h-full  bg-transparent'>
//       <div className='flex  flex-col bg-white items-center w-full p-5 rounded-lg shadow-md'>
//         {/* Legend */}
//         <div className='flex gap-2 justify-evenly w-full mb-3'>
//           {[
//             { label: 'Aptitude', color: themeColors.aptitude, value: aptitude },
//             { label: 'Core', color: themeColors.core, value: core },
//             { label: 'Miscellaneous', color: themeColors.misc, value: misc }
//           ].map(item => (
//             <div key={item.label} className='flex items-center gap-2 text-sm'>
//               <div
//                 className='w-3 h-3 rounded-full'
//                 style={{ backgroundColor: item.color }}
//               />
//               <span className='text-gray-600 font-medium'>
//                 {item.label}: {item.value}
//               </span>
//             </div>
//           ))}
//         </div>

//         {/* Pie Chart */}
//         <PieChart
//           width={300}
//           height={220}
//           {...pieParams}
//           series={[
//             {
//               data: pieData,
//               innerRadius: 18,
//               outerRadius: 100,
//               cornerRadius: 5,
//               startAngle: -45,
//               endAngle: 360,
//               cx: 150,
//               cy: 110,
//               highlightScope: { faded: 'global', highlighted: 'item' },
//               faded: {
//                 additionalRadius: -5,
//                 // color: item => item.color
//               },
//               arcLabelMinAngle: 15
//             }
//           ]}
//         />
//       </div>

//       {/* Averages */}
//       <div className='flex flex-1 p-4 rounded-xl shadow-lg bg-white flex-col w-full mt-2'>
//         <span className='px-2 flex flex-col gap-1 pb-2'>
//           <SectionHeader title={'Average Marks'} />
//           <hr className='border-gray-300 mb-1 ' />
//         </span>
//         {[
//           {
//             label: 'Aptitude',
//             value: rankData?.userRank?.solutions?.aptitude?.average || 0
//           },
//           {
//             label: 'Core',
//             value: rankData?.userRank?.solutions?.core?.average || 0
//           },
//           {
//             label: 'Miscellaneous',
//             value: rankData?.userRank?.solutions?.miscellaneous?.average || 0
//           }
//         ].map(item => (
//           <div key={item.label} className='flex px-2 flex-col mb-2'>
//             <label className='text-xs font-medium text-gray-500 mb-1'>
//               {item.label}
//             </label>
//             <Box width='100%'>
//               <LinearProgressWithLabel value={item.value}  />
//             </Box>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default React.memo(ProgressArea)





// import { PieChart } from '@mui/x-charts/PieChart'
// import { Box } from '@mui/material'
// import LinearProgressWithLabel from './LinearLabel'
// import { useSelector } from 'react-redux'
// import React from 'react'
// import Loader from '../../../layout/Loader'
// import { SectionHeader } from '../utils/Helpers'
// import { useRankData } from '../../../hooks/user/UserApi'
// import { useUser } from '../../../context/UserContext'

// const pieParams = {
//   margin: { right: 5, top: -4 },
//   slotProps: { legend: { hidden: true } }
// }

// // Harmonious light-orange theme
// const themeColors = {
//   aptitude: '#FFDAB3',
//   core: '#FFBC80',
//   misc: '#FFA64D'
// }

// const fadedColors = {
//   aptitude: '#FFDAB3',
//   core: '#FFBC80',
//   misc: '#FFA64D'
// }

// function ProgressArea({
//   rankData,
//   rankDataLoading
// }: {
//   rankData: any,
//   rankDataLoading: boolean
// }) {

//   const aptitude = rankData?.getRank?.userRank?.solutions?.aptitude?.attempted || 0
//   const core = rankData?.getRank?.userRank?.solutions?.core?.attempted || 0
//   const misc = rankData?.getRank?.userRank?.solutions?.miscellaneous?.attempted || 0

//   const isEmpty = aptitude === 0 && core === 0 && misc === 0

//   // Get ranking data
//   const collegeRank = rankData?.getRank?.userRank?.collegeRank || null
//   const globalRank = rankData?.getRank?.userRank?.globalRank || null

//   if (rankDataLoading) {
//     return (
//       <div className='flex items-center justify-center flex-[.5] p-6 bg-white rounded-xl shadow'>
//         <Loader />
//       </div>
//     )
//   }

//   return (
//     <div className='flex relative flex-col items-center justify-center flex-[0.7] h-full bg-transparent'>
//       <div className='flex flex-col bg-white items-center w-full p-5 rounded-lg shadow-md'>
//         {/* Legend */}
//         <div className='flex gap-2 justify-evenly w-full mb-3'>
//           {[
//             { label: 'Aptitude', color: themeColors.aptitude, value: aptitude },
//             { label: 'Core', color: themeColors.core, value: core },
//             { label: 'Miscellaneous', color: themeColors.misc, value: misc }
//           ].map(item => (
//             <div key={item.label} className='flex items-center gap-2 text-sm'>
//               <div
//                 className='w-3 h-3 rounded-full'
//                 style={{ backgroundColor: item.color }}
//               />
//               <span className='text-gray-600 font-medium'>
//                 {item.label}: {item.value}
//               </span>
//             </div>
//           ))}
//         </div>

//         {/* RANKING SECTION - REPLACED PIE CHART */}
//         <div className='w-full flex flex-col items-center justify-center py-6 mt-2'>
//           <h3 className='text-lg font-semibold text-gray-700 mb-5'>Your Rankings</h3>
          
//           <div className='flex gap-12 justify-center w-full'>
//             {/* College Rank */}
//             <div className='flex flex-col items-center'>
//               <div className='text-5xl font-bold text-orange-500 mb-2'>
//                 {collegeRank ? `#${collegeRank}` : '-'}
//               </div>
//               <div className='text-sm text-gray-500 font-medium'>College Rank</div>
//             </div>

//             {/* Global Rank */}
//             <div className='flex flex-col items-center'>
//               <div className='text-5xl font-bold text-blue-500 mb-2'>
//                 {globalRank ? `#${globalRank}` : '-'}
//               </div>
//               <div className='text-sm text-gray-500 font-medium'>Global Rank</div>
//             </div>
//           </div>

//           {/* No Data Message */}
//           {!collegeRank && !globalRank && (
//             <p className='text-gray-400 text-sm mt-4'>
//               Complete challenges to get ranked!
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Average Marks - SAME AS BEFORE */}
//       <div className='flex flex-1 p-4 rounded-xl shadow-lg bg-white flex-col w-full mt-2'>
//         <span className='px-2 flex flex-col gap-1 pb-2'>
//           <SectionHeader title={'Average Marks'} />
//           <hr className='border-gray-300 mb-1 ' />
//         </span>
//         {[
//           {
//             label: 'Aptitude',
//             value: rankData?.userRank?.solutions?.aptitude?.average || 0
//           },
//           {
//             label: 'Core',
//             value: rankData?.userRank?.solutions?.core?.average || 0
//           },
//           {
//             label: 'Miscellaneous',
//             value: rankData?.userRank?.solutions?.miscellaneous?.average || 0
//           }
//         ].map(item => (
//           <div key={item.label} className='flex px-2 flex-col mb-2'>
//             <label className='text-xs font-medium text-gray-500 mb-1'>
//               {item.label}
//             </label>
//             <Box width='100%'>
//               <LinearProgressWithLabel value={item.value} />
//             </Box>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default React.memo(ProgressArea)







































// import { PieChart } from '@mui/x-charts/PieChart'
// import { Box } from '@mui/material'
// import LinearProgressWithLabel from './LinearLabel'
// import { useSelector } from 'react-redux'
// import React from 'react'
// import Loader from '../../../layout/Loader'
// import { SectionHeader } from '../utils/Helpers'
// import { useRankData } from '../../../hooks/user/UserApi'
// import { useUser } from '../../../context/UserContext'

// const pieParams = {
//   margin: { right: 5, top: -4 },
//   slotProps: { legend: { hidden: true } }
// }

// // Harmonious light-orange theme
// const themeColors = {
//   aptitude: '#FFDAB3',
//   core: '#FFBC80',
//   misc: '#FFA64D'
// }

// const fadedColors = {
//   aptitude: '#FFDAB3',
//   core: '#FFBC80',
//   misc: '#FFA64D'
// }

// function ProgressArea({
//   rankData,
//   rankDataLoading
// }: {
//   rankData: any,
//   rankDataLoading: boolean
// }) {

//   const aptitude = rankData?.getRank?.userRank?.solutions?.aptitude?.attempted || 0
//   const core = rankData?.getRank?.userRank?.solutions?.core?.attempted || 0
//   const misc = rankData?.getRank?.userRank?.solutions?.miscellaneous?.attempted || 0

//   const isEmpty = aptitude === 0 && core === 0 && misc === 0

//   // Get ranking data
//   const collegeRank = rankData?.getRank?.userRank?.collegeRank || null
//   const globalRank = rankData?.getRank?.userRank?.globalRank || null

//   if (rankDataLoading) {
//     return (
//       <div className='flex items-center justify-center flex-[.5] p-6 bg-white rounded-xl shadow'>
//         <Loader />
//       </div>
//     )
//   }

//   return (
//     <div className='flex relative flex-col items-center justify-center flex-[0.7] h-full bg-transparent'>
//       <div className='flex flex-col bg-white items-center w-full p-5 rounded-lg shadow-md'>
//         {/* Legend */}
//         <div className='flex gap-2 justify-evenly w-full mb-3'>
//           {[
//             { label: 'Aptitude', color: themeColors.aptitude, value: aptitude },
//             { label: 'Core', color: themeColors.core, value: core },
//             { label: 'Miscellaneous', color: themeColors.misc, value: misc }
//           ].map(item => (
//             <div key={item.label} className='flex items-center gap-2 text-sm'>
//               <div
//                 className='w-3 h-3 rounded-full'
//                 style={{ backgroundColor: item.color }}
//               />
//               <span className='text-gray-600 font-medium'>
//                 {item.label}: {item.value}
//               </span>
//             </div>
//           ))}
//         </div>

//         {/* NO UNIVERSITY SECTION */}
//         <div className='w-full flex flex-col items-center justify-center py-6 mt-2'>
//           <div className='relative w-48 h-48 flex items-center justify-center'>
//             {/* Outer Circle */}
//             <div className='absolute w-full h-full rounded-full bg-gray-200'></div>
            
//             {/* Inner Circle (creates donut effect) */}
//             <div className='absolute w-32 h-32 rounded-full bg-white'></div>
            
//             {/* Text in center */}
//             <div className='relative z-10 text-center'>
//               <p className='text-gray-500 font-medium text-lg'>No university</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Average Marks - SAME AS BEFORE */}
//       <div className='flex flex-1 p-4 rounded-xl shadow-lg bg-white flex-col w-full mt-2'>
//         <span className='px-2 flex flex-col gap-1 pb-2'>
//           <SectionHeader title={'Average Marks'} />
//           <hr className='border-gray-300 mb-1 ' />
//         </span>
//         {[
//           {
//             label: 'Aptitude',
//             value: rankData?.userRank?.solutions?.aptitude?.average || 0
//           },
//           {
//             label: 'Core',
//             value: rankData?.userRank?.solutions?.core?.average || 0
//           },
//           {
//             label: 'Miscellaneous',
//             value: rankData?.userRank?.solutions?.miscellaneous?.average || 0
//           }
//         ].map(item => (
//           <div key={item.label} className='flex px-2 flex-col mb-2'>
//             <label className='text-xs font-medium text-gray-500 mb-1'>
//               {item.label}
//             </label>
//             <Box width='100%'>
//               <LinearProgressWithLabel value={item.value} />
//             </Box>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default React.memo(ProgressArea)











// import { PieChart } from '@mui/x-charts/PieChart'
// import { Box } from '@mui/material'
// import LinearProgressWithLabel from './LinearLabel'
// import { useSelector } from 'react-redux'
// import React from 'react'
// import Loader from '../../../layout/Loader'
// import { SectionHeader } from '../utils/Helpers'
// import { useRankData } from '../../../hooks/user/UserApi'
// import { useUser } from '../../../context/UserContext'

// const pieParams = {
//   margin: { right: 5, top: -4 },
//   slotProps: { legend: { hidden: true } }
// }

// // Harmonious light-orange theme
// const themeColors = {
//   aptitude: '#FFDAB3',
//   core: '#FFBC80',
//   misc: '#FFA64D'
// }

// const fadedColors = {
//   aptitude: '#FFDAB3',
//   core: '#FFBC80',
//   misc: '#FFA64D'
// }

// function ProgressArea({
//   rankData,
//   rankDataLoading
// }: {
//   rankData: any,
//   rankDataLoading: boolean
// }) {

//   const aptitude = rankData?.getRank?.userRank?.solutions?.aptitude?.attempted || 0
//   const core = rankData?.getRank?.userRank?.solutions?.core?.attempted || 0
//   const misc = rankData?.getRank?.userRank?.solutions?.miscellaneous?.attempted || 0

//   const isEmpty = aptitude === 0 && core === 0 && misc === 0

//   // Get ranking data
//   const collegeRank = rankData?.getRank?.userRank?.collegeRank || null
//   const globalRank = rankData?.getRank?.userRank?.globalRank || null

//   if (rankDataLoading) {
//     return (
//       <div className='flex items-center justify-center flex-[.5] p-6 bg-white rounded-xl shadow'>
//         <Loader />
//       </div>
//     )
//   }

//   return (
//     <div className='flex relative flex-col items-center justify-center flex-[0.7] h-full bg-transparent'>
//       <div className='flex flex-col bg-white items-center w-full p-5 rounded-lg shadow-md'>
//         {/* Legend */}
//         <div className='flex gap-2 justify-evenly w-full mb-3'>
//           {[
//             { label: 'Aptitude', color: themeColors.aptitude, value: aptitude },
//             { label: 'Core', color: themeColors.core, value: core },
//             { label: 'Miscellaneous', color: themeColors.misc, value: misc }
//           ].map(item => (
//             <div key={item.label} className='flex items-center gap-2 text-sm'>
//               <div
//                 className='w-3 h-3 rounded-full'
//                 style={{ backgroundColor: item.color }}
//               />
//               <span className='text-gray-600 font-medium'>
//                 {item.label}: {item.value}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default React.memo(ProgressArea)





import { PieChart } from '@mui/x-charts/PieChart'
import { Box } from '@mui/material'
import LinearProgressWithLabel from './LinearLabel'
import { useSelector } from 'react-redux'
import React from 'react'
import Loader from '../../../layout/Loader'
import { SectionHeader } from '../utils/Helpers'
import { useRankData } from '../../../hooks/user/UserApi'
import { useUser } from '../../../context/UserContext'

const pieParams = {
  margin: { right: 5, top: -4 },
  slotProps: { legend: { hidden: true } }
}

// Harmonious light-orange theme
const themeColors = {
  aptitude: '#FFDAB3',
  core: '#FFBC80',
  misc: '#FFA64D'
}

const fadedColors = {
  aptitude: '#FFDAB3',
  core: '#FFBC80',
  misc: '#FFA64D'
}

function ProgressArea({
  rankData,
  rankDataLoading
}: {
  rankData: any,
  rankDataLoading: boolean
}) {

  const aptitude = rankData?.getRank?.userRank?.solutions?.aptitude?.attempted || 0
  const core = rankData?.getRank?.userRank?.solutions?.core?.attempted || 0
  const misc = rankData?.getRank?.userRank?.solutions?.miscellaneous?.attempted || 0

  const isEmpty = aptitude === 0 && core === 0 && misc === 0

  // Get ranking data
  const collegeRank = rankData?.getRank?.userRank?.collegeRank || null
  const globalRank = rankData?.getRank?.userRank?.globalRank || null

  if (rankDataLoading) {
    return (
      <div className='flex items-center justify-center flex-[.5] p-6 bg-white rounded-xl shadow'>
        <Loader />
      </div>
    )
  }

  return (
    <div className='w-full bg-white dark:bg-gray-800 rounded-xl shadow flex flex-col items-center justify-center h-[450px]'>
      {/* NO UNIVERSITY - Simple Text Only */}
      <div className='w-full flex flex-col items-center justify-center'>
        <div className='relative w-48 h-48 flex items-center justify-center'>
          {/* Outer Circle */}
          <div className='absolute w-full h-full rounded-full bg-gray-200 dark:bg-gray-700'></div>
          
          {/* Inner Circle (creates donut effect) */}
          <div className='absolute w-32 h-32 rounded-full bg-white dark:bg-gray-800'></div>
          
          {/* Text in center */}
          <div className='relative z-10 text-center'>
            <p className='text-gray-500 dark:text-gray-400 font-medium text-lg'>No university</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(ProgressArea)