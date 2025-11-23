import { motion } from 'framer-motion'
import './ChoiceButton.css'

const CHOICE_ICONS = {
  rock: '🪨',
  paper: '📄',
  scissors: '✂️'
}

const ChoiceButton = ({ choice, onClick, delay = 0, playerNumber }) => {
  return (
    <motion.button
      className={`choice-button choice-${choice} player-${playerNumber}-choice`}
      onClick={onClick}
      initial={{ scale: 0, rotate: -180, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay
      }}
      whileHover={{
        scale: 1.15,
        rotate: [0, -5, 5, -5, 0],
        transition: { duration: 0.3 }
      }}
      whileTap={{
        scale: 0.9,
        rotate: 0
      }}
    >
      <motion.div
        className="choice-icon"
        whileHover={{
          y: [-5, 0, -5],
          transition: {
            duration: 0.6,
            repeat: Infinity,
            repeatType: "reverse"
          }
        }}
      >
        {CHOICE_ICONS[choice]}
      </motion.div>
      <motion.span
        className="choice-label"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.2 }}
      >
        {choice.charAt(0).toUpperCase() + choice.slice(1)}
      </motion.span>
    </motion.button>
  )
}

export default ChoiceButton
