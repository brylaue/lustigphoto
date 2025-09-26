import { NextResponse } from 'next/server'

export const dynamic = 'force-static'

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Sam Lustig Photography',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  })
}