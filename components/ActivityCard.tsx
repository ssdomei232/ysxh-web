'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface ActivityProps {
  activity: {
    title: string
    coverImage: string
    description: string
    date: string
    participants: string[]
    organizer: string
  }
}

const ActivityCard: React.FC<ActivityProps> = ({ activity }) => {
  const [isExpanded, setIsExpanded] = useState(false)

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
        <div className="mt-4">
          <p className="text-sm font-semibold mb-1">参与者：</p>
          {activity.participants.length <= 3 ? (
            <ul className="list-disc list-inside">
              {activity.participants.map((participant, index) => (
                <li key={index} className="text-sm text-gray-600">{participant}</li>
              ))}
            </ul>
          ) : (
            <div>
              <ul className="list-disc list-inside">
                {activity.participants.slice(0, 3).map((participant, index) => (
                  <li key={index} className="text-sm text-gray-600">{participant}</li>
                ))}
              </ul>
              {isExpanded && (
                <ul className="list-disc list-inside mt-2">
                  {activity.participants.slice(3).map((participant, index) => (
                    <li key={index + 3} className="text-sm text-gray-600">{participant}</li>
                  ))}
                </ul>
              )}
              <button
                className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? (
                  <>
                    收起 <ChevronUp className="ml-1 w-4 h-4" />
                  </>
                ) : (
                  <>
                    展开更多 ({activity.participants.length - 3}) <ChevronDown className="ml-1 w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ActivityCard

