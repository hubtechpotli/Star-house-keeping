import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

interface Testimonial {
  name: string
  city: string
  rating: number
  comment: string
  plan?: string
}

interface TestimonialsSectionProps {
  theme: "blue" | "red" | "purple" | "green"
  title?: string
  subtitle?: string
  testimonials?: Testimonial[]
}

const defaultTestimonials: Testimonial[] = [
  {
    name: "Rajesh Kumar",
    city: "Lucknow",
    rating: 5,
    comment: "Setup same day! Amazing speed and customer service. Best  in the city.",
    plan: "100 Mbps Plan",
  },
  {
    name: "Priya Sharma",
    city: "Ghaziabad",
    rating: 5,
    comment: "Call within 10 minutes of Renting. Very professional installation team.",
    plan: "200 Mbps + OTT",
  },
  {
    name: "Amit Singh",
    city: "Noida",
    rating: 5,
    comment: "Excellent gaming experience with zero lag. Highly recommended for gamers.",
    plan: "500 Mbps Gaming",
  },
  {
    name: "Sunita Gupta",
    city: "Delhi",
    rating: 4,
    comment: "Great value for money. OTT bundle is fantastic for family entertainment.",
    plan: "150 Mbps + OTT",
  },
  {
    name: "Vikash Yadav",
    city: "Kanpur",
    rating: 5,
    comment: "24x7 support is really helpful. Never faced any connectivity issues.",
    plan: "300 Mbps Plan",
  },
  {
    name: "Neha Agarwal",
    city: "Agra",
    rating: 5,
    comment: "Free router works perfectly. Installation was completed in 2 hours.",
    plan: "100 Mbps Plan",
  },
]

export function TestimonialsSection({
  theme,
  title = "What Our Customers Say",
  subtitle = "Join thousands of satisfied customers across India",
  testimonials = defaultTestimonials,
}: TestimonialsSectionProps) {
  const themeClasses = {
    blue: {
      primary: "text-blue-primary",
      secondary: "text-blue-secondary",
      bg: "bg-white",
      accent: "text-orange-500",
    },
    red: {
      primary: "text-red-primary",
      secondary: "text-red-secondary",
      bg: "bg-gray-50",
      accent: "text-yellow-500",
    },
    purple: {
      primary: "text-purple-600",
      secondary: "text-purple-500",
      bg: "bg-gray-50",
      accent: "text-orange-500",
    },
    green: {
      primary: "text-green-primary",
      secondary: "text-green-secondary",
      bg: "bg-white",
      accent: "text-yellow-600",
    },
  }

  const styles = themeClasses[theme]

  return (
    <section className={`py-16 ${styles.bg}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-3xl lg:text-4xl font-bold mb-4 ${styles.primary}`}>{title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <Quote className={`w-8 h-8 ${styles.primary} opacity-20`} />
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-gray-700 italic">"{testimonial.comment}"</p>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-semibold ${styles.primary}`}>{testimonial.name}</h4>
                    <span className="text-sm text-gray-500">{testimonial.city}</span>
                  </div>
                  {testimonial.plan && <p className={`text-sm ${styles.secondary}`}>{testimonial.plan}</p>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
