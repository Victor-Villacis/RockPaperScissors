import { motion } from 'framer-motion'
import './WinnerDisplay.css'

const WinnerDisplay = ({ winner, player1, player2, onPlayAgain, choiceEmojis }) => {
  const getWinnerMessage = () => {
    if (winner === 'tie') {
      return {
        title: "It's a Tie! 🤝",
        subtitle: "Great minds think alike!",
        emoji: "🤝"
      }
    } else if (winner === 'player1') {
      return {
        title: `${player1.name} Wins! 🎉`,
        subtitle: `${choiceEmojis[player1.choice]} beats ${choiceEmojis[player2.choice]}`,
        emoji: "🏆"
      }
    } else {
      return {
        title: `${player2.name} Wins! 🎉`,
        subtitle: `${choiceEmojis[player2.choice]} beats ${choiceEmojis[player1.choice]}`,
        emoji: "🏆"
      }
    }
  }

  const message = getWinnerMessage()

  const confettiVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: (i) => ({
      opacity: [0, 1, 1, 0],
      y: [0, 100, 200, 300],
      x: Math.random() * 200 - 100,
      rotate: Math.random() * 360,
      transition: {
        duration: 2,
        delay: i * 0.1,
        repeat: Infinity,
        repeatDelay: 1
      }
    })
  }

  return (
    <motion.div
      className="winner-display"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5 }}
    >
      {/* Confetti effect for winners */}
      {winner !== 'tie' && (
        <div className="confetti-container">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="confetti"
              custom={i}
              variants={confettiVariants}
              initial="hidden"
              animate="visible"
            >
              {['🎉', '🎊', '⭐', '✨', '🌟'][i % 5]}
            </motion.div>
          ))}
        </div>
      )}

      <motion.div
        className="winner-content"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.div
          className="winner-emoji"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 10,
            delay: 0.3
          }}
        >
          {message.emoji}
        </motion.div>

        <motion.h2
          className="winner-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {message.title}
        </motion.h2>

        <motion.p
          className="winner-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {message.subtitle}
        </motion.p>

        <motion.div
          className="match-summary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="match-choice">
            <span className="choice-emoji-large">{choiceEmojis[player1.choice]}</span>
            <span className="choice-player">{player1.name}</span>
          </div>
          <span className="match-vs">VS</span>
          <div className="match-choice">
            <span className="choice-emoji-large">{choiceEmojis[player2.choice]}</span>
            <span className="choice-player">{player2.name}</span>
          </div>
        </motion.div>

        <motion.button
          className="play-again-btn"
          onClick={onPlayAgain}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 10px 40px rgba(74, 222, 128, 0.3)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          Play Again 🎮
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

export default WinnerDisplay
