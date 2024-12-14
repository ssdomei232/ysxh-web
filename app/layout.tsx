import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '影视星河',
  description: '影视星河摄影社团官方网站',
  keywords: ['影视星河,北京师范大学东营实验学校,摄影,社团'],
  authors: [{ name: '影视星河' }],
  creator: '影视星河',
  publisher: '影视星河',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-Hans">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}

