'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface BookingResult {
  success: boolean
  bookingId?: string
  customerName?: string
  customerEmail?: string
  experience?: string
  date?: string
  time?: string
  quantity?: number
  finalTotal?: number
  error?: string
}

export default function ResultPage() {
  const router = useRouter()
  const [result, setResult] = useState<BookingResult | null>(null)
  useEffect(() => {
    const bookingResult = localStorage.getItem('bookingResult')

    if (bookingResult) {
      const timeout = setTimeout(() => {
        setResult(JSON.parse(bookingResult))
        localStorage.removeItem('bookingResult')
        localStorage.removeItem('bookingData')
      }, 0)

      return () => clearTimeout(timeout)
    } else {
      router.push('/')
    }
  }, [router])


  useEffect(() => {
    if (result === null) {
      const timeout = setTimeout(() => {
        router.push('/')
      }, 300)
      return () => clearTimeout(timeout)
    }
  }, [result, router])

  const handleBackToHome = () => {
    router.push('/')
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <main className="max-w-md mx-auto px-4">
        {result.success ? (
          <div className="text-center">

            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Booking Confirmed
            </h1>

            <p className="text-gray-500 text-sm mb-8">
              Ref ID: {result.bookingId}
            </p>

            <button
              onClick={handleBackToHome}
              className="bg-gray-200 hover:bg-gray-300 px-8 py-3 rounded-lg font-medium text-gray-700 transition-colors"
            >
              Back to Home
            </button>

          </div>
        ) : (
          <div className="text-center">

            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>

            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Booking Failed
            </h1>

            <p className="text-gray-500 text-sm mb-8">
              {result.error || 'Something went wrong. Please try again.'}
            </p>

            <div className="space-y-3 flex flex-col">
              <button
                onClick={() => router.back()}
                className=" cursor-pointer bg-yellow-400 hover:bg-yellow-500 p-1 rounded-sm font-medium transition-colors"
              >
                Try Again
              </button>

              <button
                onClick={handleBackToHome}
                className=" cursor-pointer bg-gray-200 hover:bg-gray-300 p-1 rounded-sm font-medium text-gray-700 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
