import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const solutions = [
  {
    title: "E-commerce",
    description: "Seamless checkout experiences that boost conversion rates and customer satisfaction.",
    tags: ["Online Payments", "Subscriptions", "Shopping Cart"],
    imageUrl: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=600&q=80",
    link: "#",
  },
  {
    title: "SaaS & Subscriptions",
    description: "Flexible billing tools for recurring revenue businesses with automatic retries and notifications.",
    tags: ["Recurring Billing", "Dunning", "Analytics"],
    imageUrl: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?auto=format&fit=crop&w=600&q=80",
    link: "#",
  },
  {
    title: "Marketplaces",
    description: "Powerful solutions for marketplaces with split payments, commissions, and payouts.",
    tags: ["Split Payments", "Payouts", "Multi-vendor"],
    imageUrl: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80",
    link: "#",
  },
];

export default function SolutionsSection() {
  return (
    <section id="solutions" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-primary text-sm font-medium mb-3">
            Solutions
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Tailored solutions for your business
          </h2>
          <p className="text-lg text-slate-600">
            Whether you're a small business or an enterprise, we have the right
            payment solutions for you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={solution.imageUrl}
                  alt={solution.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  {solution.title}
                </h3>
                <p className="text-slate-600 mb-4">{solution.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {solution.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={solution.link}
                  className="text-primary font-medium hover:text-primary/80 inline-flex items-center group"
                >
                  Learn more
                  <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
