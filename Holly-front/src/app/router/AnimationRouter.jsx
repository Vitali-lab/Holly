// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { opacity: 0 },
};

const pageTransition = {
  duration: 0.2,
  ease: "easeInOut",
};

export const AnimationRouter = ({ component }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      {component}
    </motion.div>
  );
};
