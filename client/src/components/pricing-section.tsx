import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function PricingSection() {
  const { data: plans = [], isLoading } = useQuery({
    queryKey: ["/api/plans"],
  });

  if (isLoading) {
    return (
      <section id="pricing" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-primary text-sm font-medium mb-3">
              Pricing
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-slate-600">
              Choose the plan that fits your business needs. No hidden fees or long-term contracts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[0, 1, 2].map((i) => (
              <div 
                key={i}
                className="bg-white rounded-xl overflow-hidden shadow-lg border border-slate-100 relative h-[450px] animate-pulse"
              >
                <div className="h-full bg-slate-100"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-primary text-sm font-medium mb-3">
            Pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-slate-600">
            Choose the plan that fits your business needs. No hidden fees or long-term contracts.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border ${
                plan.isPopular
                  ? "border-2 border-primary relative transform md:-translate-y-4"
                  : "border-slate-100"
              } relative`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0">
                  <Badge className="rounded-bl-lg rounded-tr-xl">POPULAR</Badge>
                </div>
              )}
              <div className={`p-6 border-b border-slate-100 ${plan.isPopular ? "bg-blue-50" : ""}`}>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold text-slate-800">
                    ${plan.price}
                  </span>
                  <span className="text-slate-500 ml-2">
                    /{plan.billingCycle}
                  </span>
                </div>
                <p className="text-slate-600 text-sm">
                  {plan.name === "Starter"
                    ? "Perfect for small businesses and startups."
                    : plan.name === "Professional"
                    ? "Ideal for growing businesses with higher volume."
                    : "For large businesses with high transaction volumes."}
                </p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.isPopular ? "default" : "outline"}
                  className="w-full"
                  asChild
                >
                  <Link href={plan.name === "Enterprise" ? "#contact" : "/register"}>
                    {plan.name === "Enterprise" ? "Contact sales" : "Get started"}
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
