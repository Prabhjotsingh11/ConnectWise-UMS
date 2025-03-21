import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="max-w-6xl mx-auto p-10 bg-gradient-to-b from-[#f1f5f9] to-white shadow-xl rounded-2xl">
      {/* Heading */}
      <motion.h1
        className="text-4xl font-bold text-center text-[#023047] drop-shadow-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        About <span className="text-[#EB5E28]">ConnectWise</span>
      </motion.h1>

      {/* Intro Section */}
      <motion.p
        className="text-lg text-gray-700 text-center max-w-3xl mx-auto mt-6 leading-relaxed"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        ConnectWise is the go-to platform for residents looking to hire expert
        gig workers for home maintenance. Whether it's plumbing, electrical
        repairs, or HVAC servicing, we make it effortless to find and book
        reliable professionals at your convenience.
      </motion.p>

      {/* Who We Are */}
      <motion.section
        className="mt-12"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <h2 className="text-3xl font-semibold text-[#EB5E28] text-center">
          Who We Are
        </h2>
        <p className="text-gray-700 mt-4 text-center max-w-4xl mx-auto leading-relaxed">
          ConnectWise is a SaaS-based aggregator platform built to streamline
          home service bookings. Our goal is to bring convenience and
          reliability to residents while offering skilled professionals a
          platform to showcase their expertise.
        </p>
      </motion.section>

      {/* Our Mission */}
      <motion.section
        className="mt-12"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <h2 className="text-3xl font-semibold text-[#EB5E28] text-center">
          Our Mission
        </h2>
        <p className="text-gray-700 mt-4 text-center max-w-4xl mx-auto leading-relaxed">
          We are dedicated to making home maintenance stress-free. By connecting
          residents with skilled professionals, we ensure high-quality service
          and seamless management of household needs.
        </p>
      </motion.section>

      {/* What We Offer */}
      <motion.section
        className="mt-12 bg-white p-6 rounded-lg shadow-md"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <h2 className="text-3xl font-semibold text-[#EB5E28] text-center">
          What We Offer
        </h2>
        <ul className="list-none mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <li className="p-4 bg-[#FFEDD5] rounded-lg shadow-sm">
            ✅ A hassle-free way to book technicians for plumbing, electrical
            work, and HVAC maintenance.
          </li>
          <li className="p-4 bg-[#FFEDD5] rounded-lg shadow-sm">
            🔧 A user-friendly dashboard where gig workers can manage requests
            and availability.
          </li>
          <li className="p-4 bg-[#FFEDD5] rounded-lg shadow-sm">
            📌 A role-based system designed specifically for both residents and
            service providers.
          </li>
          <li className="p-4 bg-[#FFEDD5] rounded-lg shadow-sm">
            🔒 Secure and reliable technology for a smooth and professional
            experience.
          </li>
        </ul>
      </motion.section>

      {/* Why Choose ConnectWise */}
      <motion.section
        className="mt-12"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        <h2 className="text-3xl font-semibold text-[#EB5E28] text-center">
          Why Choose ConnectWise?
        </h2>
        <ul className="list-none mt-6 flex flex-wrap justify-center gap-4 text-gray-700">
          <li className="p-4 bg-[#DEF7EC] rounded-lg shadow-sm">
            🌟 Quick and easy booking with trusted professionals.
          </li>
          <li className="p-4 bg-[#DEF7EC] rounded-lg shadow-sm">
            🛠️ Reliable service providers who deliver high-quality work.
          </li>
          <li className="p-4 bg-[#DEF7EC] rounded-lg shadow-sm">
            ⚡ Cutting-edge technology that makes home maintenance simpler than
            ever.
          </li>
        </ul>
      </motion.section>

      {/* Contact Section */}
      <motion.p
        className="mt-12 text-center text-gray-700 font-semibold text-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.6 }}
      >
        Get in touch today and experience a smarter way to manage your home
        services.
      </motion.p>

      <motion.p
        className="mt-4 text-center text-[#023047] font-bold text-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        📧 Contact us:
        <a href="mailto:support@connectwise.com" className="underline ml-1">
          prabhjotbhatti1527@gmail.com
        </a>
      </motion.p>
    </div>
  );
};

export default AboutUs;
