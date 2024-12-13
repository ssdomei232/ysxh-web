'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useConfig } from '../hooks/useConfig'

const ITEMS_PER_PAGE = 6

export default function Showcase() {
  const { config } = useConfig()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredShowcase = config.showcase.filter(photo =>
    photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    photo.author.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredShowcase.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentPhotos = filteredShowcase.slice(startIndex, endIndex)

  return (
    <main className="min-h-screen bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-center">摄影作品展示</h1>
        <div className="mb-6">
          <Input
            type="text"
            placeholder="搜索作品或作者..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md mx-auto"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPhotos.map((photo, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="relative h-64">
                <Image
                  src={photo.image}
                  alt={photo.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{photo.title}</h2>
                <p className="text-gray-600 mb-2">作者：{photo.author}</p>
                <p className="text-gray-500 text-sm">拍摄日期：{photo.date}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center items-center space-x-4">
          <Button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            上一页
          </Button>
          <span>第 {currentPage} 页，共 {totalPages} 页</span>
          <Button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            下一页
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </main>
  )
}

