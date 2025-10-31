'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface BookingData {
  experienceId: string
  date: string
  time: string
  quantity: number
  price: number
}

interface ValidationErrors {
  fullName: string
  email: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const [bookingData, setBookingData] = useState<BookingData | null>(null)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    experience: '',
    date: '',
    time: '',
    quantity: 1,
    subtotal: 0,
    taxes: 0,
    total: 0
  })
  const [promoCode, setPromoCode] = useState('')
  const [promoDiscount, setPromoDiscount] = useState(0)
  const [promoError, setPromoError] = useState('')
  const [loading, setLoading] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
    fullName: '',
    email: ''
  })
  const [touched, setTouched] = useState({
    fullName: false,
    email: false
  })

  useEffect(() => {
    const savedBookingData = localStorage.getItem('bookingData')
    if (savedBookingData) {
      const data: BookingData = JSON.parse(savedBookingData)
      setBookingData(data)

      const subtotal = data.price * data.quantity
      const taxes = Math.round(subtotal * 0.18)

      setFormData(prev => ({
        ...prev,
        experience: 'Kayaking',
        date: data.date,
        time: data.time,
        quantity: data.quantity,
        subtotal,
        taxes,
        total: subtotal + taxes
      }))
    } else {
      router.push('/')
    }
  }, [router])

  const validateName = (name: string): string => {
    if (!name.trim()) {
      return 'Full name is required'
    }
    if (name.trim().length < 2) {
      return 'Name must be at least 2 characters long'
    }
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
      return 'Name can only contain letters and spaces'
    }
    return ''
  }

  const validateEmail = (email: string): string => {
    if (!email.trim()) {
      return 'Email is required'
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      return 'Please enter a valid email address'
    }
    return ''
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    if (name === 'fullName') {
      setValidationErrors(prev => ({
        ...prev,
        fullName: validateName(value)
      }))
    }

    if (name === 'email') {
      setValidationErrors(prev => ({
        ...prev,
        email: validateEmail(value)
      }))
    }
  }

  const handleBlur = (field: 'fullName' | 'email') => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }))

    if (field === 'fullName') {
      setValidationErrors(prev => ({
        ...prev,
        fullName: validateName(formData.fullName)
      }))
    }

    if (field === 'email') {
      setValidationErrors(prev => ({
        ...prev,
        email: validateEmail(formData.email)
      }))
    }
  }

  const validatePromoCode = async () => {
    if (!promoCode.trim()) return

    setPromoError('')
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/promo/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: promoCode })
      })

      const data = await response.json()

      if (response.ok) {
        const discount = data.type === 'percentage'
          ? Math.round(formData.subtotal * (data.discount / 100))
          : data.discount

        setPromoDiscount(discount)
        setFormData(prev => ({
          ...prev,
          total: prev.subtotal + prev.taxes - discount
        }))
      } else {
        setPromoError(data.message || 'Invalid promo code')
      }
    } catch (error) {
      setPromoError('Failed to validate promo code');
      console.log(error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const nameError = validateName(formData.fullName)
    const emailError = validateEmail(formData.email)

    setValidationErrors({
      fullName: nameError,
      email: emailError
    })

    setTouched({
      fullName: true,
      email: true
    })

    if (nameError || emailError) {
      return
    }

    if (!agreedToTerms) {
      alert('Please agree to the terms and safety policy')
      return
    }

    setLoading(true)

    try {
      const bookingPayload = {
        ...bookingData,
        customerName: formData.fullName.trim(),
        customerEmail: formData.email.trim().toLowerCase(),
        promoCode: promoCode || null,
        promoDiscount,
        finalTotal: formData.total
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingPayload)
      })

      const result = await response.json()

      if (response.ok) {
        localStorage.setItem('bookingResult', JSON.stringify({
          success: true,
          bookingId: result.bookingId,
          ...bookingPayload
        }))
        router.push('/result')
      } else {
        localStorage.setItem('bookingResult', JSON.stringify({
          success: false,
          error: result.message
        }))
        router.push('/result')
      }
    } catch (error) {
      localStorage.setItem('bookingResult', JSON.stringify({
        success: false,
        error: 'Booking failed. Please try again.'
      }))
      router.push('/result')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, '-')
  }

  const isFormValid = !validationErrors.fullName && !validationErrors.email &&
    formData.fullName.trim() && formData.email.trim() && agreedToTerms

  if (!bookingData) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">No Booking Data Found</h1>
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

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-black mb-6 text-sm hover:text-gray-600"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Checkout
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6 bg-[#EFEFEF] p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Full name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('fullName')}
                    placeholder="Your name"
                    className={`w-full px-4 py-3 bg-[#DDDDDD] border-0 rounded-lg focus:outline-none focus:ring-2 text-[#727272] ${touched.fullName && validationErrors.fullName
                      ? 'focus:ring-red-400 ring-2 ring-red-400'
                      : 'focus:ring-yellow-400'
                      }`}
                    required
                  />
                  {touched.fullName && validationErrors.fullName && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('email')}
                    placeholder="Your email"
                    className={`w-full px-4 py-3 bg-[#DDDDDD] border-0 rounded-lg focus:outline-none focus:ring-2 text-[#727272] ${touched.email && validationErrors.email
                      ? 'focus:ring-red-400 ring-2 ring-red-400'
                      : 'focus:ring-yellow-400'
                      }`}
                    required
                  />
                  {touched.email && validationErrors.email && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    placeholder="Promo code"
                    className="w-full px-4 py-3 bg-[#DDDDDD] border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-[#727272]"
                  />
                  <button
                    type="button"
                    onClick={validatePromoCode}
                    className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 font-medium"
                  >
                    Apply
                  </button>
                </div>
                {promoError && (
                  <p className="text-red-500 text-xs mt-2">{promoError}</p>
                )}
                {promoDiscount > 0 && (
                  <p className="text-green-500 text-xs mt-2">
                    Promo code applied! You saved ₹{promoDiscount}
                  </p>
                )}
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 rounded focus:ring-yellow-400"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the terms and safety policy <span className="text-red-500">*</span>
                </label>
              </div>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-[#EFEFEF] rounded-lg p-6 shadow-sm border sticky top-6">
              <div className="mb-2">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-gray-600 mb-1">Experience</h3>
                  <p className="text-sm text-gray-600">{formData.experience}</p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date</span>
                    <span className="font-medium text-gray-900">{formatDate(formData.date)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time</span>
                    <span className="font-medium text-gray-900">{formData.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Qty</span>
                    <span className="font-medium text-gray-900">{formData.quantity}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">₹{formData.subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Taxes</span>
                  <span className="font-medium text-gray-900">₹{formData.taxes}</span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-₹{promoDiscount}</span>
                  </div>
                )}
                <hr className="my-3" />
                <div className="flex justify-between font-semibold text-lg">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">₹{formData.total}</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading || !isFormValid}
                className={`w-full cursor-pointer py-3 rounded-lg font-medium transition-colors text-gray-900 ${loading || !isFormValid
                  ? 'bg-gray-300 cursor-not-allowed opacity-50'
                  : 'bg-[#FFD643] hover:bg-yellow-500'
                  }`}
              >
                {loading ? 'Processing...' : 'Pay and Confirm'}
              </button>

              {!isFormValid && !loading && (
                <p className="text-red-500 text-xs mt-2 text-center">
                  Please fill all required fields correctly
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
