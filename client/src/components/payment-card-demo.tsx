import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function PaymentCardDemo() {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const benefits = [
    { text: "PCI DSS Compliant", description: "Adheres to the highest security standards" },
    { text: "Tokenization", description: "Secures sensitive card information" },
    { text: "3D Secure 2.0", description: "Additional security layer for transactions" },
    { text: "Fraud Prevention", description: "AI-powered detection systems" },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            className="w-full lg:w-1/2 order-2 lg:order-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="w-full max-w-md mx-auto cursor-pointer perspective-1000"
              onClick={handleCardClick}
            >
              <div
                className={`relative h-56 w-full transition-transform duration-500 preserve-3d ${
                  isFlipped ? "rotate-y-180" : ""
                }`}
              >
                {/* Front of card */}
                <div className="absolute w-full h-full rounded-xl p-6 flex flex-col justify-between bg-gradient-to-br from-primary to-blue-600 backface-hidden">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <div className="text-white text-right">
                      <p className="font-medium text-sm opacity-80">PayHub</p>
                      <p className="text-xs opacity-60">Secure Card</p>
                    </div>
                  </div>

                  <div className="w-12 h-9 bg-slate-200 bg-opacity-20 backdrop-blur-sm rounded"></div>

                  <div className="text-white">
                    <div className="flex justify-between mb-2">
                      <p className="text-sm opacity-80">Card Number</p>
                    </div>
                    <p className="text-xl tracking-widest font-medium mb-6">
                      •••• •••• •••• 4242
                    </p>
                    <div className="flex justify-between">
                      <div>
                        <p className="text-xs opacity-80 mb-1">Card Holder</p>
                        <p className="font-medium">JOHN DOE</p>
                      </div>
                      <div>
                        <p className="text-xs opacity-80 mb-1">Expires</p>
                        <p className="font-medium">12/25</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back of card */}
                <div className="absolute w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-slate-700 to-slate-900 backface-hidden rotate-y-180">
                  <div className="w-full h-12 bg-slate-800 my-6"></div>
                  <div className="px-6">
                    <div className="bg-slate-200 h-10 rounded-md flex items-center justify-end px-3 mb-4">
                      <p className="font-mono text-slate-800">123</p>
                    </div>
                    <div className="flex space-x-2 mb-2">
                      <div className="h-2 w-12 rounded bg-slate-500"></div>
                      <div className="h-2 w-16 rounded bg-slate-500"></div>
                    </div>
                    <div className="flex space-x-2 mb-2">
                      <div className="h-2 w-8 rounded bg-slate-500"></div>
                      <div className="h-2 w-12 rounded bg-slate-500"></div>
                      <div className="h-2 w-8 rounded bg-slate-500"></div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="h-2 w-14 rounded bg-slate-500"></div>
                      <div className="h-2 w-10 rounded bg-slate-500"></div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-center mt-2 text-slate-500">Click to flip</p>
            </div>
          </motion.div>

          <motion.div
            className="w-full lg:w-1/2 order-1 lg:order-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-primary text-sm font-medium mb-3">
              Payment Solutions
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
              Secure and seamless payment processing
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Our advanced payment system ensures safe transactions for both
              businesses and customers. With industry-leading encryption and
              security measures, your financial data is always protected.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCheck className="h-5 w-5 text-green-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">{benefit.text}</h3>
                    <p className="text-slate-600 text-sm">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button size="lg" asChild>
              <Link href="/register">
                Start accepting payments
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
