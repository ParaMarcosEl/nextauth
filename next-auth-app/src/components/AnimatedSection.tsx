import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const AnimatedSection = ({ title = "", children, bgFrom, bgTo }: { title: string; children: React.ReactNode; bgFrom: string; bgTo: string }) => {
  const { scrollYProgress } = useScroll();
  const background = useTransform(scrollYProgress, [0, 1], [bgFrom, bgTo]);

  return (
    <motion.section
        className="min-h-screen flex flex-col justify-center items-center text-white py-20 px-6 text-center"
        style={{ background }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
    >
      {!!title && <h2 className="text-5xl font-bold mb-6">{title}</h2>}
      <div className="max-w-2xl text-lg md:text-xl text-white">{children}</div>
    </motion.section>
  );
};

export default AnimatedSection;
