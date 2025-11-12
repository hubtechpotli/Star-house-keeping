import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Wifi, Tv, Gamepad2, Router } from "lucide-react"

interface Plan {
  name: string
  speed: string
  price: string
  originalPrice?: string
  validity: string
  features: string[]
  ottChannels?: string
  liveChannels?: string
  freeRouter?: boolean
  popular?: boolean
  gaming?: boolean
}

interface PlanShowcaseProps {
  theme: "blue" | "red" | "purple" | "green"
  plans: Plan[]
  ottPlans?: Plan[]
  title?: string
  subtitle?: string
}

export function PlanShowcase({
  theme,
  plans,
  ottPlans,
  title = "Choose Your Perfect Plan",
  subtitle = "High-speed internet plans designed for every need",
}: PlanShowcaseProps) {
  const themeClasses = {
    blue: {
      primary: "bg-blue-primary text-white",
      secondary: "bg-blue-secondary text-white",
      accent: "bg-orange-500 text-white",
      text: "text-blue-primary",
      border: "border-blue-primary",
    },
    red: {
      primary: "bg-red-primary text-white",
      secondary: "bg-red-secondary text-white",
      accent: "bg-yellow-500 text-black",
      text: "text-red-primary",
      border: "border-red-primary",
    },
    purple: {
      primary: "bg-purple-gradient text-white",
      secondary: "bg-purple-600 text-white",
      accent: "bg-orange-500 text-white",
      text: "text-purple-600",
      border: "border-purple-600",
    },
    green: {
      primary: "bg-green-primary text-white",
      secondary: "bg-green-secondary text-white",
      accent: "bg-yellow-600 text-white",
      text: "text-green-primary",
      border: "border-green-primary",
    },
  }

  const styles = themeClasses[theme]

  const PlanCard = ({ plan }: { plan: Plan }) => (
    <Card className={`relative ${plan.popular ? `${styles.border} border-2` : ""}`}>
      <CardHeader className="text-center">
        <CardTitle className={`text-2xl font-bold ${styles.text}`}>{plan.name}</CardTitle>
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Wifi className={`w-5 h-5 ${styles.text}`} />
            <span className="text-3xl font-bold">{plan.speed}</span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-2">
              <span className="text-3xl font-bold">₹{plan.price}</span>
              {plan.originalPrice && <span className="text-lg text-gray-500 line-through">₹{plan.originalPrice}</span>}
            </div>
            <p className="text-sm text-gray-600">{plan.validity}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <Check className={`w-4 h-4 ${styles.text}`} />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>

        {plan.ottChannels && (
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
            <Tv className={`w-4 h-4 ${styles.text}`} />
            <span className="text-sm font-medium">{plan.ottChannels} OTT Channels</span>
          </div>
        )}

        {plan.liveChannels && (
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
            <Tv className={`w-4 h-4 ${styles.text}`} />
            <span className="text-sm font-medium">{plan.liveChannels} Live Channels</span>
          </div>
        )}

        {plan.gaming && (
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
            <Gamepad2 className={`w-4 h-4 ${styles.text}`} />
            <span className="text-sm font-medium">Gaming Optimized</span>
          </div>
        )}

        {plan.freeRouter && (
          <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
            <Router className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-600">Free Router Included</span>
          </div>
        )}

        <Button className={`w-full ${plan.popular ? styles.primary : styles.secondary}`}>Choose Plan</Button>
      </CardContent>
    </Card>
  )

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-3xl lg:text-4xl font-bold mb-4 ${styles.text}`}>{title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {ottPlans ? (
          <Tabs defaultValue="broadband" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="broadband">Broadband Only</TabsTrigger>
              <TabsTrigger value="combo">Broadband + OTT</TabsTrigger>
            </TabsList>

            <TabsContent value="broadband">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.map((plan, index) => (
                  <PlanCard key={index} plan={plan} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="combo">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ottPlans.map((plan, index) => (
                  <PlanCard key={index} plan={plan} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <PlanCard key={index} plan={plan} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
