import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function CtaSection() {
  return (
    <section id="contact" className="py-20 bg-gradient-to-r from-primary to-blue-600 animate-gradient relative">
      <div className="absolute inset-0 bg-grid-white/10 bg-[size:var(--grid-size)_var(--grid-size)] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to simplify your payment processes?
          </h2>
          <p className="text-lg text-white text-opacity-90 mb-10">
            Join thousands of businesses that trust PayHub for secure and reliable
            payment solutions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 shadow-lg"
              asChild
            >
              <Link href="/register">Create an account</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white/10"
              asChild
            >
              <Link href="#contact">Contact sales</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
