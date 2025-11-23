import { motion } from 'framer-motion'
import './ScoreBoard.css'

const ScoreBoard = ({ player1, player2 }) => {
  return (
    <motion.div
      className="scoreboard"
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <motion.div
        className="score-item"
        whileHover={{ scale: 1.05 }}
      >
        <span className="score-name">{player1.name}</span>
        <motion.span
          className="score-value"
          key={player1.score}
          initial={{ scale: 1.5, color: '#4ade80' }}
          animate={{ scale: 1, color: '#fff' }}
          transition={{ duration: 0.3 }}
        >
          {player1.score}
        </motion.span>
      </motion.div>

      <div className="score-divider">•</div>

      <motion.div
        className="score-item"
        whileHover={{ scale: 1.05 }}
      >
        <span className="score-name">{player2.name}</span>
        <motion.span
          className="score-value"
          key={player2.score}
          initial={{ scale: 1.5, color: '#4ade80' }}
          animate={{ scale: 1, color: '#fff' }}
          transition={{ duration: 0.3 }}
        >
          {player2.score}
        </motion.span>
      </motion.div>
    </motion.div>
  )
}

export default ScoreBoard
