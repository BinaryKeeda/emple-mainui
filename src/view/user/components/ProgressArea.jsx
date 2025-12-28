import { PieChart } from '@mui/x-charts/PieChart'
import { Box } from '@mui/material'
import LinearProgressWithLabel from './LinearLabel'
import { useSelector } from 'react-redux'
import React from 'react'
import Loader from '../../../layout/Loader'
import { SectionHeader } from '../utils/Helpers'

const pieParams = {
  margin: { right: 5, top: -4 },
  slotProps: { legend: { hidden: true } }
}

// Harmonious light-orange theme
const themeColors = {
  aptitude: '#FFDAB3', // soft pastel peach
  core: '#FFBC80', // warm light orange
  misc: '#FFA64D' // slightly deeper orange
}

// Lighter shades for hover/faded effect
const fadedColors = {
  aptitude: '#FFDAB3', // soft pastel peach
  core: '#FFBC80', // warm light orange
  misc: '#FFA64D' // slightly deeper orange
}

function ProgressArea () {
  const { data: rankData, loading } = useSelector(s => s.auth.rankData)

  const aptitude = rankData?.userRank?.solutions?.aptitude?.attempted || 0
  const core = rankData?.userRank?.solutions?.core?.attempted || 0
  const misc = rankData?.userRank?.solutions?.miscellaneous?.attempted || 0

  const isEmpty = aptitude === 0 && core === 0 && misc === 0

  const pieData = isEmpty
    ? [
        {
          label: 'No data yet',
          color: '#e5e7eb',
          value: 1,
          fadedColor: '#f3f4f6'
        }
      ]
    : [
        {
          label: 'Aptitude',
          color: themeColors.aptitude,
          value: aptitude,
          fadedColor: fadedColors.aptitude
        },
        {
          label: 'Core',
          color: themeColors.core,
          value: core,
          fadedColor: fadedColors.core
        },
        {
          label: 'Miscellaneous',
          color: themeColors.misc,
          value: misc,
          fadedColor: fadedColors.misc
        }
      ]

  // if (loading && !rankData) {
  //   return (
  //     <div className='flex items-center justify-center flex-[.5] p-6 bg-white rounded-xl shadow'>
  //       <Loader />
  //     </div>
  //   )
  // }

  return (
    <div className='flex relative flex-col items-center justify-center flex-[0.7] h-full  bg-transparent'>
      <div className='flex  flex-col bg-white items-center w-full p-5 rounded-lg shadow-md'>
        {/* Legend */}
        <div className='flex gap-2 justify-evenly w-full mb-3'>
          {[
            { label: 'Aptitude', color: themeColors.aptitude, value: aptitude },
            { label: 'Core', color: themeColors.core, value: core },
            { label: 'Miscellaneous', color: themeColors.misc, value: misc }
          ].map(item => (
            <div key={item.label} className='flex items-center gap-2 text-sm'>
              <div
                className='w-3 h-3 rounded-full'
                style={{ backgroundColor: item.color }}
              />
              <span className='text-gray-600 font-medium'>
                {item.label}: {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Pie Chart */}
        <PieChart
          width={300}
          height={220}
          {...pieParams}
          series={[
            {
              data: pieData,
              innerRadius: 18,
              outerRadius: 100,
              cornerRadius: 5,
              startAngle: -45,
              endAngle: 360,
              cx: 150,
              cy: 110,
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: {
                additionalRadius: -5,
                color: item => item.color
              },
              arcLabelMinAngle: 15
            }
          ]}
        />
      </div>

      {/* Averages */}
      <div className='flex flex-1 p-4 rounded-xl shadow-lg bg-white flex-col w-full mt-2'>
        <span className='px-2 flex flex-col gap-1 pb-2'>
          <SectionHeader title={'Average Marks'} />
           <hr className='border-gray-300 mb-1 ' />
        </span>
        {[
          {
            label: 'Aptitude',
            value: rankData?.userRank?.solutions?.aptitude?.average || 0
          },
          {
            label: 'Core',
            value: rankData?.userRank?.solutions?.core?.average || 0
          },
          {
            label: 'Miscellaneous',
            value: rankData?.userRank?.solutions?.miscellaneous?.average || 0
          }
        ].map(item => (
          <div key={item.label} className='flex px-2 flex-col mb-2'>
            <label className='text-xs font-medium text-gray-500 mb-1'>
              {item.label}
            </label>
            <Box width='100%'>
              <LinearProgressWithLabel value={item.value} color='primary' />
            </Box>
          </div>
        ))}
      </div>
    </div>
  )
}

export default React.memo(ProgressArea)
