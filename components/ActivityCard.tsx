'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ActivityProps {
  activity: {
    title: string
    coverImage: string
    description: string
    date: string
    organizer: string
  }
}

const ActivityCard: React.FC<ActivityProps> = ({ activity }) => {
  const [] = useState(false)

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative h-48">
        <Image
          src={activity.coverImage}
          alt={activity.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{activity.title}</h3>
        <p className="text-gray-600 mb-2">{activity.description}</p>
        <p className="text-sm text-gray-500 mb-2">日期：{activity.date}</p>
        <p className="text-sm text-gray-500 mb-2">组织者：{activity.organizer}</p>
      </div>
    </div>
  )
}

export default ActivityCard

