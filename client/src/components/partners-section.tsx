import { motion } from "framer-motion";
import { 
  ShoppingCart, 
  Search, 
  Monitor, 
  Smartphone, 
  Briefcase, 
  PenTool 
} from "lucide-react";

export default function PartnersSection() {
  const partnerLogos = [
    { Icon: ShoppingCart, name: "Amazon", delay: 0 },
    { Icon: Search, name: "Google", delay: 0.1 },
    { Icon: Monitor, name: "Microsoft", delay: 0.2 },
    { Icon: Smartphone, name: "Apple", delay: 0.3 },
    { Icon: Briefcase, name: "IBM", delay: 0.4 },
    { Icon: PenTool, name: "Adobe", delay: 0.5 },
  ];

  return (
    <section className="py-12 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">
            Trusted by industry leaders
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
          {partnerLogos.map(({ Icon, name, delay }) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay }}
              className="group"
            >
              <Icon 
                className="h-10 w-auto text-slate-400 group-hover:text-slate-800 transition-all duration-300" 
                aria-label={name} 
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
