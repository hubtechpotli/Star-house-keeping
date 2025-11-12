import { Card, CardContent } from "@/components/ui/card"
import { Router, Clock, Headphones, Shield, Gamepad2, Lock, Server, Zap } from "lucide-react"

interface Feature {
  icon: "router" | "clock" | "headphones" | "shield" | "gamepad" | "lock" | "server" | "zap"
  title: string
  description: string
}

interface FeaturesSectionProps {
  theme: "blue" | "red" | "purple" | "green"
  title?: string
  subtitle?: string
  features?: Feature[]
}

const defaultFeatures: Feature[] = [
  {
    icon: "router",
    title: "Free Router",
    description: "High-performance Wi-Fi router included with every plan",
  },
  {
    icon: "clock",
    title: "Same-Day Installation",
    description: "Get connected within hours of Renting your plan",
  },
  {
    icon: "headphones",
    title: "24x7 Support",
    description: "Round-the-clock technical support for all customers",
  },
  {
    icon: "shield",
    title: "Parental Control",
    description: "Advanced parental controls to keep your family safe online",
  },
  {
    icon: "gamepad",
    title: "Gaming Services",
    description: "Low-latency gaming optimized for the best experience",
  },
  {
    icon: "lock",
    title: "Secure Network",
    description: "Enterprise-grade security to protect your data",
  },
  {
    icon: "server",
    title: "World-Class Data Center",
    description: "Tier-3 data centers ensuring 99.9% uptime",
  },
  {
    icon: "zap",
    title: "Lightning Fast",
    description: "Fiber-optic technology for blazing fast speeds",
  },
]

export function FeaturesSection({
  theme,
  title = "Why Choose Our Service",
  subtitle = "Experience the difference with our premium features and services",
  features = defaultFeatures,
}: FeaturesSectionProps) {
  const themeClasses = {
    blue: {
      primary: "text-blue-primary",
      secondary: "text-blue-secondary",
      bg: "bg-blue-light",
      icon: "bg-blue-primary text-white",
    },
    red: {
      primary: "text-red-primary",
      secondary: "text-red-secondary",
      bg: "bg-white",
      icon: "bg-red-primary text-white",
    },
    purple: {
      primary: "text-purple-600",
      secondary: "text-purple-500",
      bg: "bg-white",
      icon: "bg-purple-gradient text-white",
    },
    green: {
      primary: "text-green-primary",
      secondary: "text-green-secondary",
      bg: "bg-green-light",
      icon: "bg-green-primary text-white",
    },
  }

  const styles = themeClasses[theme]

  const getIcon = (iconName: string) => {
    const iconProps = { className: "w-6 h-6" }
    switch (iconName) {
      case "router":
        return <Router {...iconProps} />
      case "clock":
        return <Clock {...iconProps} />
      case "headphones":
        return <Headphones {...iconProps} />
      case "shield":
        return <Shield {...iconProps} />
      case "gamepad":
        return <Gamepad2 {...iconProps} />
      case "lock":
        return <Lock {...iconProps} />
      case "server":
        return <Server {...iconProps} />
      case "zap":
        return <Zap {...iconProps} />
      default:
        return <Zap {...iconProps} />
    }
  }

  return (
    <section className={`py-16 ${styles.bg}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-3xl lg:text-4xl font-bold mb-4 ${styles.primary}`}>{title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className={`w-16 h-16 ${styles.icon} rounded-full flex items-center justify-center mx-auto`}>
                  {getIcon(feature.icon)}
                </div>
                <h3 className={`text-xl font-semibold ${styles.primary}`}>{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
