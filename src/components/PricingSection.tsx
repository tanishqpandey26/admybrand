"use client";

import { Check, X, Star, Zap, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Feature {
  name: string;
  basic: boolean;
  pro: boolean;
  enterprise: boolean;
}

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  icon: React.ReactNode;
  popular?: boolean;
  features: string[];
  buttonText: string;
  buttonVariant: "default" | "outline" | "secondary";
}

const features: Feature[] = [
  { name: "Up to 5 team members", basic: true, pro: true, enterprise: true },
  { name: "10GB storage", basic: true, pro: true, enterprise: true },
  { name: "Basic analytics", basic: true, pro: true, enterprise: true },
  { name: "Email support", basic: true, pro: true, enterprise: true },
  { name: "Up to 50 team members", basic: false, pro: true, enterprise: true },
  { name: "100GB storage", basic: false, pro: true, enterprise: true },
  { name: "Advanced analytics", basic: false, pro: true, enterprise: true },
  { name: "Priority support", basic: false, pro: true, enterprise: true },
  { name: "Custom integrations", basic: false, pro: false, enterprise: true },
  { name: "Unlimited team members", basic: false, pro: false, enterprise: true },
  { name: "1TB storage", basic: false, pro: false, enterprise: true },
  { name: "Real-time collaboration", basic: false, pro: false, enterprise: true },
  { name: "Advanced security", basic: false, pro: false, enterprise: true },
  { name: "24/7 phone support", basic: false, pro: false, enterprise: true },
  { name: "Custom branding", basic: false, pro: false, enterprise: true },
  { name: "API access", basic: false, pro: false, enterprise: true },
];

const pricingTiers: PricingTier[] = [
  {
    name: "Basic",
    price: "$9",
    period: "/month",
    description: "Perfect for individuals and small teams getting started",
    icon: <Star className="h-6 w-6" />,
    features: [
      "Up to 5 team members",
      "10GB storage",
      "Basic analytics",
      "Email support",
    ],
    buttonText: "Get Started",
    buttonVariant: "outline",
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "Ideal for growing teams that need more power and flexibility",
    icon: <Zap className="h-6 w-6" />,
    popular: true,
    features: [
      "Up to 50 team members",
      "100GB storage",
      "Advanced analytics",
      "Priority support",
      "Custom integrations",
    ],
    buttonText: "Start Free Trial",
    buttonVariant: "default",
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/month",
    description: "For large organizations with advanced security and compliance needs",
    icon: <Crown className="h-6 w-6" />,
    features: [
      "Unlimited team members",
      "1TB storage",
      "Real-time collaboration",
      "Advanced security",
      "24/7 phone support",
      "Custom branding",
    ],
    buttonText: "Contact Sales",
    buttonVariant: "secondary",
  },
];

const FeatureIcon = ({ included }: { included: boolean }) => (
  <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
    included 
      ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
      : 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600'
  }`}>
    {included ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
  </div>
);

export default function PricingSection() {
  return (
   <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
  <div className="max-w-7xl mx-auto">
    {/* Header */}
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Choose Your Plan
      </h2>
      <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Select the perfect plan for your needs. Upgrade or downgrade at any time.
      </p>
    </div>

    {/* Pricing Cards */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
      {pricingTiers.map((tier, index) => (
        <Card
          key={tier.name}
          className={`relative transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
            tier.popular
              ? 'border-2 border-primary shadow-xl scale-105'
              : 'border border-gray-200 dark:border-gray-700'
          }`}
        >
          {tier.popular && (
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
              Popular
            </Badge>
          )}

          <CardHeader className="text-center pb-8">
            <div
              className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                tier.popular
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
              }`}
            >
              {tier.icon}
            </div>
            <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400 mt-2">
              {tier.description}
            </CardDescription>
            <div className="mt-6">
              <span className="text-5xl font-bold text-gray-900 dark:text-white">
                {tier.price}
              </span>
              <span className="text-gray-600 dark:text-gray-400 text-lg">
                {tier.period}
              </span>
            </div>
          </CardHeader>

          <CardContent>
            <ul className="space-y-4">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>

          <CardFooter>
            <Button
              variant={tier.buttonVariant}
              size="lg"
              className="w-full text-base font-medium py-3"
            >
              {tier.buttonText}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>

    {/* Feature Comparison Table */}
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
      <div className="px-6 py-8 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
          Compare All Features
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
          See exactly what&apos;s included in each plan
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">
                Features
              </th>
              <th className="text-center py-4 px-6 font-semibold text-gray-900 dark:text-white">
                Basic
              </th>
              <th className="text-center py-4 px-6 font-semibold text-gray-900 dark:text-white relative">
                Pro
                <Badge className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs">
                  Popular
                </Badge>
              </th>
              <th className="text-center py-4 px-6 font-semibold text-gray-900 dark:text-white">
                Enterprise
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {features.map((feature, index) => (
              <tr
                key={feature.name}
                className={`transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                  index % 2 === 0
                    ? 'bg-white dark:bg-gray-800'
                    : 'bg-gray-50/50 dark:bg-gray-800/50'
                }`}
              >
                <td className="py-4 px-6 text-gray-900 dark:text-white font-medium">
                  {feature.name}
                </td>
                <td className="py-4 px-6 text-center">
                  <FeatureIcon included={feature.basic} />
                </td>
                <td className="py-4 px-6 text-center">
                  <FeatureIcon included={feature.pro} />
                </td>
                <td className="py-4 px-6 text-center">
                  <FeatureIcon included={feature.enterprise} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Bottom CTA */}
    <div className="text-center mt-16">
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Need a custom solution? We&apos;re here to help.
      </p>
      <Button variant="outline" size="lg" className="font-medium">
        Contact Our Sales Team
      </Button>
    </div>
  </div>
</section>

  );
}