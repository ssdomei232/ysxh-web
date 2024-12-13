import { promises as fs } from 'fs'
import { NextResponse } from 'next/server'

export async function GET() {
  const file = await fs.readFile(process.cwd() + '/data/config.yaml', 'utf8')
  return new NextResponse(file, {
    headers: {
      'Content-Type': 'text/yaml',
    },
  })
}

