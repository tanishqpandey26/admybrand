"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface FAQItem {
  id: string
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    id: "1",
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for all unused items in their original packaging. Simply contact our customer service team to initiate a return, and we'll provide you with a prepaid shipping label.",
  },
  {
    id: "2",
    question: "How long does shipping take?",
    answer:
      "Standard shipping typically takes 3-5 business days within the continental US. Express shipping options are available for 1-2 day delivery. International shipping times vary by location but generally take 7-14 business days.",
  },
  {
    id: "3",
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by destination. You can see the exact shipping cost and estimated delivery time at checkout before completing your purchase.",
  },
  {
    id: "4",
    question: "How can I track my order?",
    answer:
      "Once your order ships, you'll receive a tracking number via email. You can use this number to track your package on our website or directly with the shipping carrier. You'll also receive updates on your order status throughout the delivery process.",
  },
  {
    id: "5",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Shop Pay. All transactions are processed securely using industry-standard encryption.",
  },
  {
    id: "6",
    question: "Can I cancel or modify my order?",
    answer:
      "You can cancel or modify your order within 1 hour of placing it by contacting our customer service team. After this window, we may have already begun processing your order, but we'll do our best to accommodate changes when possible.",
  },
]

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (itemId: string) => {
    setOpenItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
  Find answers to common questions about our products, shipping, and policies. Can&apos;t find what you&apos;re looking
  for? Contact our support team.
</p>

      </div>

      <div className="space-y-4">
        {faqData.map((item) => (
          <Collapsible key={item.id} open={openItems.includes(item.id)} onOpenChange={() => toggleItem(item.id)}>
            <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
              <CollapsibleTrigger className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 focus:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset transition-colors duration-200">
                <h3 className="text-lg font-semibold text-gray-900 pr-4">{item.question}</h3>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                    openItems.includes(item.id) ? "transform rotate-180" : ""
                  }`}
                />
              </CollapsibleTrigger>

              <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                <div className="px-6 pb-4 pt-2">
                  <div className="h-px bg-gray-200 mb-4"></div>
                  <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        ))}
      </div>

      <div className="mt-12 text-center">
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Still have questions?</h3>
          <p className="text-gray-600 mb-4">
            Our customer support team is here to help you with any additional questions.
          </p>
          <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  )
}
