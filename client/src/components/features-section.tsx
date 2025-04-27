import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  ShieldAlert, 
  CreditCard, 
  Globe 
} from "lucide-react";

const features = [
  {
    icon: <ShieldCheck className="h-6 w-6 text-primary" />,
    title: "Secure Transactions",
    description: "End-to-end encryption and advanced fraud protection ensure your transactions are always secure.",
    color: "bg-blue-100",
  },
  {
    icon: <Zap className="h-6 w-6 text-green-500" />,
    title: "Lightning Fast",
    description: "Process payments in milliseconds, providing a seamless experience for you and your customers.",
    color: "bg-green-100",
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-indigo-500" />,
    title: "Real-time Analytics",
    description: "Gain valuable insights with comprehensive analytics and reporting tools.",
    color: "bg-indigo-100",
  },
  {
    icon: <ShieldAlert className="h-6 w-6 text-primary" />,
    title: "Fraud Protection",
    description: "Advanced AI-powered fraud detection keeps your business and customers protected.",
    color: "bg-blue-100",
  },
  {
    icon: <CreditCard className="h-6 w-6 text-green-500" />,
    title: "Multiple Payment Methods",
    description: "Support for credit cards, digital wallets, bank transfers, and more payment options.",
    color: "bg-green-100",
  },
  {
    icon: <Globe className="h-6 w-6 text-indigo-500" />,
    title: "Global Support",
    description: "Process payments in 135+ currencies with localized checkout experiences for your customers.",
    color: "bg-indigo-100",
  },
];

export default function FeaturesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-primary text-sm font-medium mb-3">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Everything you need for seamless payments
          </h2>
          <p className="text-lg text-slate-600">
            Our comprehensive platform provides all the tools you need to manage,
            process, and analyze your payments securely.
          </p>
        </div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-slate-100"
              variants={itemVariants}
            >
              <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-6`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
