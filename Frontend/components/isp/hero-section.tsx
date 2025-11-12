import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface HeroSectionProps {
  theme: "blue" | "red" | "purple" | "green"
  headline: string
  subheadline: string
  ctaText: string
  ctaSecondary?: string
  backgroundImage?: string
  features?: string[]
}

export function HeroSection({
  theme,
  headline,
  subheadline,
  ctaText,
  ctaSecondary,
  backgroundImage,
  features = [],
}: HeroSectionProps) {
  const themeClasses = {
    blue: {
      bg: "bg-blue-light",
      primary: "bg-blue-primary text-white",
      secondary: "border-blue-primary text-blue-primary",
      text: "text-blue-primary",
      accent: "text-orange-500",
    },
    red: {
      bg: "bg-white",
      primary: "bg-red-primary text-white",
      secondary: "border-red-primary text-red-primary",
      text: "text-red-primary",
      accent: "text-yellow-500",
    },
    purple: {
      bg: "bg-white",
      primary: "bg-purple-gradient text-white",
      secondary: "border-purple-600 text-purple-600",
      text: "text-purple-600",
      accent: "text-orange-500",
    },
    green: {
      bg: "bg-green-light",
      primary: "bg-green-primary text-white",
      secondary: "border-green-primary text-green-primary",
      text: "text-green-primary",
      accent: "text-yellow-600",
    },
  }

  const styles = themeClasses[theme]

  return (
    <section className={`${styles.bg} py-16 lg:py-24`}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {features.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {features.map((feature, index) => (
                  <Badge key={index} variant="outline" className={`${styles.secondary} border`}>
                    {feature}
                  </Badge>
                ))}
              </div>
            )}

            <h1 className={`text-4xl lg:text-6xl font-bold leading-tight ${styles.text}`}>{headline}</h1>

            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">{subheadline}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className={`${styles.primary} px-8 py-3 text-lg font-semibold`}>
                {ctaText}
              </Button>
              {ctaSecondary && (
                <Button
                  variant="outline"
                  size="lg"
                  className={`${styles.secondary} px-8 py-3 text-lg font-semibold border-2`}
                >
                  {ctaSecondary}
                </Button>
              )}
            </div>
          </div>

          <div className="relative">
            {backgroundImage ? (
              <img
                src={backgroundImage || "/placeholder.svg"}
                alt=" Service"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            ) : (
              <div
                className={`w-full h-96 ${styles.bg} border-2 ${styles.secondary} rounded-lg flex items-center justify-center`}
              >
                <div className="text-center space-y-4">
                  <div className={`w-16 h-16 ${styles.primary} rounded-full mx-auto flex items-center justify-center`}>
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                  </div>
                  <p className={`${styles.text} font-semibold`}>High-Speed Internet</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
