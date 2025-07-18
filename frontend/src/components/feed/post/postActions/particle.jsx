import { motion } from 'framer-motion';

const Particle = ({ angle, distance, color }) => {
  const duration = 0.8 + Math.random() * 0.5;

  return (
    <motion.div
      className={`absolute w-2 h-2 rounded-full ${color}`}
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        opacity: 0,
        scale: 0,
      }}
      transition={{
        duration: duration,
        ease: 'easeOut',
      }}
      style={{
        originX: 0,
        originY: 0,
      }}
    />
  );
};

export default Particle;
