"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"

interface Testimonial {
  id: string
  name: string
  title: string
  company: string
  content: string
  rating: number
  image: string
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    title: "Marketing Director",
    company: "TechCorp Inc.",
    content:
      "This platform has completely transformed how we manage our marketing campaigns. The intuitive interface and powerful analytics have helped us increase our ROI by 150%. I can't imagine working without it now.",
    rating: 5,
    image: "/user-1.png?height=80&width=80",
  },
  {
    id: "2",
    name: "Michael Chen",
    title: "CEO",
    company: "StartupXYZ",
    content:
      "As a startup founder, I need tools that are both powerful and easy to use. This solution delivered exactly that. The customer support is exceptional, and the features have scaled perfectly with our growth.",
    rating: 5,
    image: "/user-2.png?height=80&width=80",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    title: "Product Manager",
    company: "InnovateLabs",
    content:
      "The collaboration features have revolutionized how our team works together. We've reduced project completion time by 40% and improved communication across all departments. Highly recommended!",
    rating: 5,
    image: "/user-1.png?height=80&width=80",
  },
  {
    id: "4",
    name: "David Thompson",
    title: "Operations Manager",
    company: "GlobalTech Solutions",
    content:
      "Implementation was seamless, and the results were immediate. Our operational efficiency has improved dramatically, and the reporting features give us insights we never had before.",
    rating: 5,
    image: "/user-2.png?height=80&width=80",
  },
  {
    id: "5",
    name: "Lisa Park",
    title: "Creative Director",
    company: "Design Studio Pro",
    content:
      "The creative workflow tools are outstanding. Our design team can now collaborate in real-time, and client feedback integration has streamlined our entire creative process.",
    rating: 5,
    image: "/user-1.png?height=80&width=80",
  },
]

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-5 w-5 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
  Don&apos;t just take our word for it. Here&apos;s what real customers have to say about their experience with our
  platform.
</p>

      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Main Testimonial Display */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mx-4 relative overflow-hidden">
          {/* Quote Icon */}
          <div className="absolute top-6 right-6 text-blue-100">
            <Quote className="h-16 w-16" />
          </div>

          {/* Testimonial Content */}
          <div className="relative z-10">
            {/* Stars */}
            <div className="flex justify-center mb-6">{renderStars(testimonials[currentIndex].rating)}</div>

            {/* Review Text */}
            <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 text-center max-w-4xl mx-auto">
              {"\"" + testimonials[currentIndex].content + "\""}
            </blockquote>

            {/* Customer Info */}
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
              {/* Customer Photo */}
              <div className="relative">
                <img
                  src={testimonials[currentIndex].image || "/placeholder.svg"}
                  alt={testimonials[currentIndex].name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-blue-100"
                />
              </div>

              {/* Customer Details */}
              <div className="text-center md:text-left">
                <h4 className="text-xl font-semibold text-gray-900">{testimonials[currentIndex].name}</h4>
                <p className="text-blue-600 font-medium">{testimonials[currentIndex].title}</p>
                <p className="text-gray-500">{testimonials[currentIndex].company}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-6 w-6 text-gray-600" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center space-x-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              index === currentIndex ? "bg-blue-600 scale-110" : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      {/* Customer Logos/Thumbnails */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <p className="text-center text-gray-500 mb-6">Trusted by leading companies worldwide</p>
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => goToSlide(index)}
              className={`flex flex-col items-center space-y-2 p-3 rounded-lg transition-all duration-200 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                index === currentIndex ? "opacity-100 bg-blue-50" : "opacity-60 hover:bg-gray-50"
              }`}
            >
              <img
                src={testimonial.image || "/placeholder.svg"}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="text-center">
                <p className="text-sm font-medium text-gray-900">{testimonial.name}</p>
                <p className="text-xs text-gray-500">{testimonial.company}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Auto-play Control */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          {isAutoPlaying ? "Pause" : "Resume"} auto-play
        </button>
      </div>
    </section>
  )
}
