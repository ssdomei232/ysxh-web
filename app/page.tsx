'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import ActivityCard from '@/components/ActivityCard'
import { Input } from "@/components/ui/input"
import { useConfig } from './hooks/useConfig'

export default function Home() {
  const { config } = useConfig()
  const [searchTerm, setSearchTerm] = useState('')
  const videoRef = useRef<HTMLVideoElement>(null)

  const filteredActivities = config.activities.filter(activity =>
    activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.organizer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("视频自动播放失败:", error)
      })
    }
  }, [])

  return (
    <main className="min-h-screen">
      <section className="h-screen relative overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="https://static.yingshixinghe.cn:4443/video.mp4" type="video/mp4" />
          您的浏览器不支持视频标签。
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-white">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold mb-4">欢迎来到影视星河</h1>
            <p className="text-xl mb-8">用镜头捕捉世界的美</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">社团活动</h2>
          <div className="mb-6">
            <Input
              type="text"
              placeholder="搜索活动、描述或组织者..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md mx-auto"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredActivities.map((activity, index) => (
              <ActivityCard key={index} activity={activity} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

