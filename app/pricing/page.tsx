import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const pricingPlans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Basic QR code generation for personal use',
    features: [
      'Generate up to 25 QR codes per month',
      'Basic download formats (PNG, JPEG)',
      'Standard QR code design',
      'Email support',
    ],
    button: {
      text: 'Get Started',
      href: '/login',
      variant: 'outline' as const,
    },
  },
  {
    name: 'Pro',
    price: '$5',
    period: 'per month',
    description: 'Everything you need for regular QR code use',
    features: [
      'Generate up to 200 QR codes per month',
      'All download formats',
      'Custom QR code colors',
      'QR code history & management',
      'Priority email support',
    ],
    button: {
      text: 'Subscribe Now',
      href: '/login',
      variant: 'default' as const,
    },
    popular: true,
  },
  {
    name: 'Business',
    price: '$10',
    period: 'per month',
    description: 'Advanced features for professional use',
    features: [
      'Unlimited QR code generation',
      'All download formats',
      'Custom QR code designs with your logo',
      'QR code analytics and tracking',
      'Team sharing capabilities',
      'API access',
      'Priority 24/7 support',
    ],
    button: {
      text: 'Subscribe Now',
      href: '/login',
      variant: 'outline' as const,
    },
  },
];

export default function PricingPage() {
  return (
    <div className="container py-12 md:py-16 lg:py-24">
      <div className="flex flex-col items-center text-center gap-4 mb-12">
        <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">Simple, Transparent Pricing</h1>
        <p className="text-muted-foreground max-w-[800px] md:text-xl/relaxed">
          Choose the plan that works best for your QR code generation needs
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pricingPlans.map((plan) => (
          <Card 
            key={plan.name} 
            className={`flex flex-col h-full ${plan.popular ? 'border-primary shadow-md' : ''}`}
          >
            {plan.popular && (
              <div className="bg-primary text-primary-foreground text-xs font-medium py-1 px-4 rounded-t-lg text-center">
                Most Popular
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-sm text-muted-foreground">/{plan.period}</span>
              </div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild variant={plan.button.variant} className="w-full">
                <Link href={plan.button.href}>{plan.button.text}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Need a custom plan?</h2>
        <p className="text-muted-foreground max-w-[600px] mx-auto mb-6">
          If you have specific requirements or need higher volumes, contact us for a customized solution.
        </p>
        <Button asChild variant="outline">
          <Link href="/contact">Contact Sales</Link>
        </Button>
      </div>
    </div>
  );
}