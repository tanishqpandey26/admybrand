"use client"

import { useState } from "react"
import { Check, X, Calculator, Users, Zap, Shield } from "lucide-react"

interface PricingTier {
  id: string
  name: string
  description: string
  basePrice: number
  yearlyDiscount: number
  features: string[]
  limitations: string[]
  popular?: boolean
  icon: any
}

const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for individuals and small projects",
    basePrice: 9,
    yearlyDiscount: 0.2,
    icon: Users,
    features: ["Up to 5 projects", "10GB storage", "Basic analytics", "Email support", "Standard templates"],
    limitations: ["No custom branding", "Limited integrations", "Basic reporting only"],
  },
  {
    id: "professional",
    name: "Professional",
    description: "Ideal for growing businesses and teams",
    basePrice: 29,
    yearlyDiscount: 0.25,
    icon: Zap,
    popular: true,
    features: [
      "Unlimited projects",
      "100GB storage",
      "Advanced analytics",
      "Priority support",
      "Custom templates",
      "Team collaboration",
      "API access",
      "Custom branding",
    ],
    limitations: ["Limited white-label options"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations with advanced needs",
    basePrice: 99,
    yearlyDiscount: 0.3,
    icon: Shield,
    features: [
      "Everything in Professional",
      "Unlimited storage",
      "Advanced security",
      "24/7 phone support",
      "Custom integrations",
      "White-label solution",
      "Dedicated account manager",
      "SLA guarantee",
      "Advanced reporting",
      "SSO integration",
    ],
    limitations: [],
  },
]

const addOns = [
  {
    id: "extra-storage",
    name: "Extra Storage",
    description: "Additional 100GB storage",
    price: 5,
    icon: "💾",
  },
  {
    id: "premium-support",
    name: "Premium Support",
    description: "24/7 priority support with 1-hour response time",
    price: 15,
    icon: "🎧",
  },
  {
    id: "advanced-analytics",
    name: "Advanced Analytics",
    description: "Detailed insights and custom reports",
    price: 10,
    icon: "📊",
  },
]

export default function PricingCalculator() {
  const [isYearly, setIsYearly] = useState(false)
  const [selectedTier, setSelectedTier] = useState("professional")
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [teamSize, setTeamSize] = useState(5)

  const calculatePrice = (tier: PricingTier) => {
    let basePrice = tier.basePrice

    // Apply team size multiplier for Professional and Enterprise
    if (tier.id === "professional" && teamSize > 5) {
      basePrice += (teamSize - 5) * 5
    } else if (tier.id === "enterprise" && teamSize > 10) {
      basePrice += (teamSize - 10) * 8
    }

    // Apply yearly discount
    if (isYearly) {
      basePrice = basePrice * (1 - tier.yearlyDiscount)
    }

    return Math.round(basePrice)
  }

  const calculateAddOnsCost = () => {
    return selectedAddOns.reduce((total, addOnId) => {
      const addOn = addOns.find((a) => a.id === addOnId)
      return total + (addOn ? addOn.price : 0)
    }, 0)
  }

  const getTotalPrice = () => {
    const selectedTierData = pricingTiers.find((t) => t.id === selectedTier)
    if (!selectedTierData) return 0

    const tierPrice = calculatePrice(selectedTierData)
    const addOnsPrice = calculateAddOnsCost()
    return tierPrice + addOnsPrice
  }

  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns((prev) => (prev.includes(addOnId) ? prev.filter((id) => id !== addOnId) : [...prev, addOnId]))
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <Calculator className="h-12 w-12 text-blue-600" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Interactive Pricing Calculator</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Customize your plan based on your needs. Adjust team size, billing cycle, and add-ons to see real-time
          pricing.
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Billing Toggle */}
          <div className="text-center">
            <label className="block text-sm font-medium text-gray-700 mb-3">Billing Cycle</label>
            <div className="flex items-center justify-center space-x-3">
              <span className={`text-sm ${!isYearly ? "text-gray-900 font-medium" : "text-gray-500"}`}>Monthly</span>
              <button
              title="btn"
                onClick={() => setIsYearly(!isYearly)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isYearly ? "bg-blue-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isYearly ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className={`text-sm ${isYearly ? "text-gray-900 font-medium" : "text-gray-500"}`}>
                Yearly
                <span className="text-green-600 text-xs ml-1">(Save up to 30%)</span>
              </span>
            </div>
          </div>

          {/* Team Size Slider */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Team Size: {teamSize} {teamSize === 1 ? "user" : "users"}
            </label>
            <input
            title="team-size"
              type="range"
              min="1"
              max="50"
              value={teamSize}
              onChange={(e) => setTeamSize(Number.parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1</span>
              <span>50+</span>
            </div>
          </div>

          {/* Current Total */}
          <div className="text-center">
            <label className="block text-sm font-medium text-gray-700 mb-3">Total Price</label>
            <div className="text-3xl font-bold text-blue-600">
              ${getTotalPrice()}
              <span className="text-lg text-gray-500">/{isYearly ? "year" : "month"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {pricingTiers.map((tier) => {
          const Icon = tier.icon
          const price = calculatePrice(tier)
          const isSelected = selectedTier === tier.id

          return (
            <div
              key={tier.id}
              className={`relative bg-white rounded-xl shadow-lg p-6 transition-all duration-200 cursor-pointer ${
                isSelected ? "ring-2 ring-blue-500 shadow-xl" : "hover:shadow-xl"
              } ${tier.popular ? "border-2 border-blue-500" : ""}`}
              onClick={() => setSelectedTier(tier.id)}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <Icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{tier.description}</p>
                <div className="text-4xl font-bold text-gray-900">
                  ${price}
                  <span className="text-lg text-gray-500">/{isYearly ? "year" : "month"}</span>
                </div>
                {isYearly && tier.yearlyDiscount > 0 && (
                  <p className="text-green-600 text-sm mt-1">Save {Math.round(tier.yearlyDiscount * 100)}% yearly</p>
                )}
              </div>

              <div className="space-y-3 mb-6">
                {tier.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
                {tier.limitations.map((limitation, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <X className="h-5 w-5 text-red-400 flex-shrink-0" />
                    <span className="text-gray-500 text-sm">{limitation}</span>
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
                  isSelected
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {isSelected ? "Selected Plan" : "Select Plan"}
              </button>
            </div>
          )
        })}
      </div>

      {/* Add-ons */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Add-ons & Extras</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {addOns.map((addOn) => (
            <div
              key={addOn.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                selectedAddOns.includes(addOn.id)
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => toggleAddOn(addOn.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{addOn.icon}</span>
                  <div>
                    <h4 className="font-medium text-gray-900">{addOn.name}</h4>
                    <p className="text-sm text-gray-600">{addOn.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">${addOn.price}/mo</div>
                  <input
                  title="title"
                    type="checkbox"
                    checked={selectedAddOns.includes(addOn.id)}
                    onChange={() => toggleAddOn(addOn.id)}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary & CTA */}
      <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
        <p className="text-blue-100 mb-6">
          Your customized plan:{" "}
          <span className="font-bold">
            ${getTotalPrice()}/{isYearly ? "year" : "month"}
          </span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
            Start Free Trial
          </button>
          <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200">
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  )
}
