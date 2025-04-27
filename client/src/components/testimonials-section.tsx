import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { QuoteIcon } from "lucide-react";

const testimonials = [
  {
    quote:
      "PayHub has completely transformed how we handle payments. The dashboard is intuitive, and the fraud protection has saved us thousands. Highly recommended for any e-commerce business!",
    author: "Sarah Johnson",
    role: "CEO, FashionStore",
    avatarFallback: "SJ",
  },
  {
    quote:
      "As a SaaS business, we needed a reliable subscription billing solution. PayHub's recurring payment system has been flawless, with superb retry logic that has significantly improved our revenue recovery.",
    author: "David Chen",
    role: "CTO, SoftwareCloud",
    avatarFallback: "DC",
  },
  {
    quote:
      "Our marketplace needed a solution for splitting payments between vendors. PayHub's system has been reliable and their API documentation is the best I've worked with. Their support team is also incredibly responsive.",
    author: "Maria Rodriguez",
    role: "Founder, ArtMarket",
    avatarFallback: "MR",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-primary text-sm font-medium mb-3">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Trusted by businesses worldwide
          </h2>
          <p className="text-lg text-slate-600">
            See what our customers have to say about PayHub's payment solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-slate-50 border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="text-primary">
                      <QuoteIcon className="h-6 w-6" />
                    </div>
                  </div>
                  <p className="text-slate-700 mb-6">{testimonial.quote}</p>
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarFallback className="bg-primary-100 text-primary">
                        {testimonial.avatarFallback}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-slate-800">
                        {testimonial.author}
                      </h4>
                      <p className="text-slate-500 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
