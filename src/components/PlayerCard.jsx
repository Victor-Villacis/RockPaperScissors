import { motion, AnimatePresence } from 'framer-motion'
import ChoiceButton from './ChoiceButton'
import './PlayerCard.css'

const PlayerCard = ({ player, playerNumber, onChoice, choices, disabled, showChoice }) => {
  return (
    <motion.div
      className={`player-card player-${playerNumber}`}
      initial={{ opacity: 0, x: playerNumber === 1 ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <motion.div
        className="player-header"
        animate={{
          scale: disabled ? 1.02 : 1
        }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="player-name">
          {player.name} {playerNumber === 1 ? '🎱' : '🎮'}
        </h2>
        {disabled && !showChoice && (
          <motion.div
            className="choice-locked"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            ✓ Choice Locked!
          </motion.div>
        )}
      </motion.div>

      <AnimatePresence mode="wait">
        {!disabled && (
          <motion.div
            className="choices-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
          >
            {choices.map((choice, index) => (
              <ChoiceButton
                key={choice}
                choice={choice}
                onClick={() => onChoice(choice)}
                delay={index * 0.1}
                playerNumber={playerNumber}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {showChoice && player.choice && (
        <motion.div
          className="selected-choice"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        >
          <p>Choice: {player.choice}</p>
        </motion.div>
      )}
    </motion.div>
  )
}

export default PlayerCard
