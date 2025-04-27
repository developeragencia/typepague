import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-primary to-blue-600 animate-gradient">
      <div className="absolute inset-0 bg-grid-white/10 bg-grid-white/[0.2] bg-[size:var(--grid-size)_var(--grid-size)] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-white opacity-10 rounded-full"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white opacity-10 rounded-full"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div
            className="w-full lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Simplify Your{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Payments</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-green-500 opacity-30 z-0"></span>
              </span>
            </h1>
            <p className="mt-6 text-xl text-white text-opacity-90 max-w-xl">
              Secure, fast, and reliable payment solutions for businesses of all
              sizes. Streamline your financial operations with PayHub.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                variant="default" 
                className="bg-white text-primary hover:bg-gray-100"
                asChild
              >
                <Link href="/register">
                  Get Started
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-white border-white hover:bg-white/10"
                asChild
              >
                <Link href="#demo">
                  Watch Demo
                </Link>
              </Button>
            </div>
            <div className="mt-10 flex items-center justify-center lg:justify-start space-x-6">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-blue-400 border-2 border-white flex items-center justify-center text-white font-bold text-xs">JD</div>
                <div className="w-10 h-10 rounded-full bg-indigo-400 border-2 border-white flex items-center justify-center text-white font-bold text-xs">SC</div>
                <div className="w-10 h-10 rounded-full bg-purple-400 border-2 border-white flex items-center justify-center text-white font-bold text-xs">TK</div>
              </div>
              <div className="text-white text-sm">
                <span className="font-bold">4.9/5</span> from over 1,200+ reviews
              </div>
            </div>
          </motion.div>
          <motion.div
            className="w-full lg:w-1/2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-full max-w-md">
              <div className="absolute -top-6 -left-6 w-full h-full bg-blue-500 rounded-lg transform rotate-3"></div>
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-indigo-500 rounded-lg transform -rotate-3"></div>
              <div className="relative bg-white p-6 rounded-lg shadow-xl">
                <svg className="w-full h-auto" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="600" height="400" rx="16" fill="#F8FAFC"/>
                  <path d="M130 120H470C483.255 120 494 130.745 494 144V240C494 253.255 483.255 264 470 264H130C116.745 264 106 253.255 106 240V144C106 130.745 116.745 120 130 120Z" fill="#3B82F6"/>
                  <path d="M130 280H222C228.627 280 234 285.373 234 292V308C234 314.627 228.627 320 222 320H130C123.373 320 118 314.627 118 308V292C118 285.373 123.373 280 130 280Z" fill="#E2E8F0"/>
                  <path d="M255 280H347C353.627 280 359 285.373 359 292V308C359 314.627 353.627 320 347 320H255C248.373 320 243 314.627 243 308V292C243 285.373 248.373 280 255 280Z" fill="#E2E8F0"/>
                  <path d="M380 280H472C478.627 280 484 285.373 484 292V308C484 314.627 478.627 320 472 320H380C373.373 320 368 314.627 368 308V292C368 285.373 373.373 280 380 280Z" fill="#E2E8F0"/>
                  <circle cx="300" cy="192" r="40" fill="#60A5FA"/>
                  <path d="M282 192L294 204L318 180" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="300" cy="80" r="16" fill="#3B82F6"/>
                  <rect x="130" y="152" width="80" height="8" rx="4" fill="#60A5FA"/>
                  <rect x="130" y="172" width="60" height="8" rx="4" fill="#60A5FA"/>
                  <rect x="390" y="152" width="80" height="8" rx="4" fill="#60A5FA"/>
                  <rect x="410" y="172" width="60" height="8" rx="4" fill="#60A5FA"/>
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          className="w-full h-auto fill-current text-slate-50"
        >
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
        </svg>
      </div>
    </section>
  );
}
