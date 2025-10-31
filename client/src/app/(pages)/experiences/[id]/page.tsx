'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'

interface Slot {
  _id: string
  date: string
  times: string[]
  availableSpots: number
}

interface Experience {
  _id: string
  title: string
  location: string
  price: number
  image: string
  description: string
  fullDescription: string
  includes: string[]
  slots: Slot[]
}

export default function ExperienceDetails() {
  const params = useParams()
  const router = useRouter()
  const [experience, setExperience] = useState<Experience | null>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [bookingLoading, setBookingLoading] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchExperience(params.id as string)
    }
  }, [params.id])

  const fetchExperience = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/experiences/${id}`)
      const data = await response.json()
      setExperience(data)

      if (data.slots && data.slots.length > 0) {
        setSelectedDate(data.slots[0].date)
        if (data.slots[0].times.length > 0) {
          setSelectedTime(data.slots[0].times[0])
        }
      }
    } catch (error) {
      console.error('Error fetching experience:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select date and time')
      return
    }

    setBookingLoading(true)

    try {

      await new Promise(resolve => setTimeout(resolve, 500))

      const bookingData = {
        experienceId: experience?._id,
        date: selectedDate,
        time: selectedTime,
        quantity,
        price: experience?.price || 0
      }

      localStorage.setItem('bookingData', JSON.stringify(bookingData))
      router.push(`/experiences/${params.id}/checkout`)
    } catch (error) {
      console.error('Error preparing booking:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setBookingLoading(false)
    }
  }

  const getAvailableTimesForDate = (date: string) => {
    const slot = experience?.slots.find(s => s.date === date)
    return slot?.times || []
  }

  const getAvailableSpotsForDateTime = (date: string) => {
    const slot = experience?.slots.find(s => s.date === date)
    return slot?.availableSpots || 0
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return {
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      day: date.getDate().toString().padStart(2, '0')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50">
        <main className="max-w-6xl mx-auto px-4 py-6">

          <div className="flex items-center mb-6">
            <div className="w-4 h-4 bg-gray-300 rounded mr-2 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <div className="lg:col-span-2 space-y-6">

              <div className="h-72 lg:h-80 bg-gray-300 rounded-lg animate-pulse"></div>


              <div className="space-y-3">
                <div className="h-7 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/4 animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6 animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-4/5 animate-pulse"></div>
                </div>
              </div>


              <div className="space-y-4">
                <div className="h-6 bg-gray-300 rounded w-32 animate-pulse"></div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="px-3 py-1 bg-gray-300 rounded-sm animate-pulse w-16 h-8"></div>
                  ))}
                </div>
              </div>


              <div className="space-y-4">
                <div className="h-6 bg-gray-300 rounded w-32 animate-pulse"></div>
                <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="p-2 bg-gray-300 rounded-sm animate-pulse h-16"></div>
                  ))}
                </div>
                <div className="h-3 bg-gray-300 rounded w-48 animate-pulse"></div>
              </div>

              <div className="space-y-2">
                <div className="h-6 bg-gray-300 rounded w-20 animate-pulse"></div>
                <div className="bg-gray-200 p-2 rounded-sm">
                  <div className="flex space-x-4">
                    <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
                    <div className="h-4 bg-gray-300 rounded w-24 animate-pulse"></div>
                    <div className="h-4 bg-gray-300 rounded w-28 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>


            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 shadow-sm border sticky top-6">

                <div className="mb-4 flex justify-between items-center">
                  <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
                  <div className="h-8 bg-gray-300 rounded w-20 animate-pulse"></div>
                </div>


                <div className="mb-2 flex justify-between items-center">
                  <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gray-300 rounded-sm animate-pulse"></div>
                    <div className="h-5 bg-gray-300 rounded w-4 animate-pulse"></div>
                    <div className="w-6 h-6 bg-gray-300 rounded-sm animate-pulse"></div>
                  </div>
                </div>

                <div className="space-y-4 mb-6 mt-8">
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
                    <div className="h-4 bg-gray-300 rounded w-12 animate-pulse"></div>
                  </div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-300 rounded w-12 animate-pulse"></div>
                    <div className="h-4 bg-gray-300 rounded w-10 animate-pulse"></div>
                  </div>
                  <hr className="my-3" />
                  <div className="flex justify-between">
                    <div className="h-5 bg-gray-300 rounded w-12 animate-pulse"></div>
                    <div className="h-5 bg-gray-300 rounded w-16 animate-pulse"></div>
                  </div>
                </div>


                <div className="w-full h-12 bg-gray-300 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!experience) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Experience Not Found</h1>
          <button
            onClick={() => router.push('/')}
            className="bg-yellow-400 px-6 py-3 rounded-lg font-medium hover:bg-yellow-500"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  const subtotal = experience.price * quantity
  const taxes = Math.round(subtotal * 0.18)
  const total = subtotal + taxes
  const selectedSlotSpots = getAvailableSpotsForDateTime(selectedDate)
  const isBookingDisabled = selectedSlotSpots === 0 || !selectedDate || !selectedTime || bookingLoading

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <main className="max-w-6xl mx-auto px-4 py-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-black mb-6 text-sm hover:text-gray-600"
          disabled={bookingLoading}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Details
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 space-y-6">

            <div className="relative h-72 lg:h-80 rounded-lg overflow-hidden">
              <Image
                src={experience.image}
                alt={experience.title}
                fill
                className="object-cover"
              />
            </div>


            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{experience.title}</h1>
              <div className="flex items-center text-gray-600 text-sm mb-4">


                {experience.location}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {experience.fullDescription}
              </p>
            </div>


            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Choose date</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {experience.slots.map((slot) => {
                  const dateInfo = formatDate(slot.date)
                  const isAvailable = slot.availableSpots > 0
                  return (
                    <button
                      key={slot.date}
                      onClick={() => {
                        if (isAvailable && !bookingLoading) {
                          setSelectedDate(slot.date)
                          setSelectedTime(slot.times[0] || '')
                        }
                      }}
                      disabled={!isAvailable || bookingLoading}
                      className={`px-3 py-1 flex text-center rounded-sm transition-colors ${!isAvailable || bookingLoading
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : selectedDate === slot.date
                          ? 'bg-[#FFD643] text-gray-900'
                          : 'text-gray-400 border border-gray-300 bg-white hover:bg-gray-50'
                        }`}
                    >
                      <div className="mr-1">{dateInfo.month} </div>
                      <div>{dateInfo.day}</div>
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose time</h3>
              <div className="grid lg:grid-cols-6  md:grid-cols-4 grid-cols-3 gap-2 mb-4">
                {getAvailableTimesForDate(selectedDate).map((time) => {
                  const spots = getAvailableSpotsForDateTime(selectedDate)
                  const isAvailable = spots > 0
                  const isSoldOut = spots === 0
                  const isLimited = spots <= 5 && spots > 0

                  return (
                    <button
                      key={time}
                      onClick={() => isAvailable && !bookingLoading && setSelectedTime(time)}
                      disabled={!isAvailable || bookingLoading}
                      className={`p-2 flex relative rounded-sm text-center text-sm transition-colors ${!isAvailable || bookingLoading
                        ? 'border-gray-300 text-gray-400 border bg-gray-100 cursor-not-allowed'
                        : selectedTime === time
                          ? isSoldOut ? 'bg-gray-500' : 'bg-[#FFD643] text-gray-900'
                          : 'border-gray-300 text-gray-400 border bg-white '
                        }`}
                    >
                      <span className='mr-2'>{time}</span>
                      <div className='absolute bottom-1 right-1 '>
                        {isSoldOut && <span className="text-xs text-red-500">Sold out</span>}
                        {isLimited && <span className="text-xs text-red-500">{spots} left</span>}
                      </div>
                    </button>
                  )
                })}
              </div>
              <p className="text-xs text-gray-500">All times are in IST (GMT +5:30)</p>
            </div>


            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
              <div className="bg-gray-200 p-2 rounded-sm">
                {experience.includes && experience.includes.length > 0 && (
                  <div>
                    <ul className="text-sm flex text-gray-600 space-y-1">
                      {experience.includes.map((item, index) => (
                        <li key={index}>
                          {item} ,
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>


          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm border sticky top-6">

              <div className="mb-4 flex justify-between">
                <label className="block text-sm text-gray-500 mb-1">Starts at</label>
                <div className="text-2xl font-bold text-gray-900">₹{experience.price}</div>
              </div>


              <div className="mb-2 flex justify-between">
                <label className="block text-sm text-gray-500 mb-2">Quantity</label>
                <div className="flex items-center">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={bookingLoading}
                    className="w-6 h-6 rounded-sm border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    −
                  </button>
                  <span className="text-black text-md mx-3">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(selectedSlotSpots, quantity + 1))}
                    disabled={quantity >= selectedSlotSpots || bookingLoading}
                    className="w-6 h-6 rounded-sm border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
              </div>


              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Taxes</span>
                  <span>₹{taxes}</span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between font-semibold text-lg text-gray-900">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <button
                onClick={handleBooking}
                disabled={isBookingDisabled}
                className={`w-full cursor-pointer py-3 rounded-lg font-medium transition-colors flex items-center justify-center ${isBookingDisabled
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#FFD643] text-gray-900 hover:bg-yellow-500'
                  }`}
              >
                {bookingLoading ? (
                  <>
                    Processing...
                  </>
                ) : selectedSlotSpots === 0 ?
                  'Sold Out' :
                  'Confirm'
                }
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
