import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'
import PlayerCard from './components/PlayerCard'
import ChoiceButton from './components/ChoiceButton'
import WinnerDisplay from './components/WinnerDisplay'
import ScoreBoard from './components/ScoreBoard'

const CHOICES = ['rock', 'paper', 'scissors']

const CHOICE_EMOJIS = {
  rock: '🪨',
  paper: '📄',
  scissors: '✂️'
}

function App() {
  const [gameState, setGameState] = useState('setup') // setup, playing, reveal, result
  const [player1, setPlayer1] = useState({ name: 'Player 1', choice: null, score: 0 })
  const [player2, setPlayer2] = useState({ name: 'Player 2', choice: null, score: 0 })
  const [winner, setWinner] = useState(null)
  const [showNameInput, setShowNameInput] = useState(true)

  // Determine winner logic
  const determineWinner = useCallback((choice1, choice2) => {
    if (choice1 === choice2) return 'tie'
    if (
      (choice1 === 'rock' && choice2 === 'scissors') ||
      (choice1 === 'paper' && choice2 === 'rock') ||
      (choice1 === 'scissors' && choice2 === 'paper')
    ) {
      return 'player1'
    }
    return 'player2'
  }, [])

  // Handle player choice
  const handleChoice = useCallback((player, choice) => {
    if (player === 1) {
      setPlayer1(prev => ({ ...prev, choice }))
    } else {
      setPlayer2(prev => ({ ...prev, choice }))
    }

    // Auto-advance to reveal state when both players have chosen
    setGameState(prev => {
      if (prev === 'playing') {
        const p1HasChoice = player === 1 ? choice : player1.choice
        const p2HasChoice = player === 2 ? choice : player2.choice
        if (p1HasChoice && p2HasChoice) {
          return 'reveal'
        }
      }
      return prev
    })
  }, [player1.choice, player2.choice])

  // Handle reveal and calculate winner
  const handleReveal = useCallback(() => {
    const result = determineWinner(player1.choice, player2.choice)
    setWinner(result)

    // Update scores
    if (result === 'player1') {
      setPlayer1(prev => ({ ...prev, score: prev.score + 1 }))
    } else if (result === 'player2') {
      setPlayer2(prev => ({ ...prev, score: prev.score + 1 }))
    }

    setGameState('result')
  }, [player1.choice, player2.choice, determineWinner])

  // Play again
  const playAgain = useCallback(() => {
    setPlayer1(prev => ({ ...prev, choice: null }))
    setPlayer2(prev => ({ ...prev, choice: null }))
    setWinner(null)
    setGameState('playing')
  }, [])

  // Reset game
  const resetGame = useCallback(() => {
    setPlayer1({ name: 'Player 1', choice: null, score: 0 })
    setPlayer2({ name: 'Player 2', choice: null, score: 0 })
    setWinner(null)
    setGameState('setup')
    setShowNameInput(true)
  }, [])

  // Start game
  const startGame = useCallback(() => {
    setShowNameInput(false)
    setGameState('playing')
  }, [])

  // Update player names
  const updatePlayerName = useCallback((player, name) => {
    if (player === 1) {
      setPlayer1(prev => ({ ...prev, name: name || 'Player 1' }))
    } else {
      setPlayer2(prev => ({ ...prev, name: name || 'Player 2' }))
    }
  }, [])

  return (
    <div className="app">
      <motion.div
        className="container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <motion.header
          className="header"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="title">
            <span className="title-emoji">🎮</span>
            Rock Paper Scissors
            <span className="title-emoji">🎮</span>
          </h1>
          {gameState !== 'setup' && (
            <motion.button
              className="reset-btn"
              onClick={resetGame}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Reset Game
            </motion.button>
          )}
        </motion.header>

        {/* Score Board */}
        <ScoreBoard player1={player1} player2={player2} />

        {/* Setup Phase - Name Input */}
        <AnimatePresence mode="wait">
          {gameState === 'setup' && showNameInput && (
            <motion.div
              className="setup-phase"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              <div className="name-inputs">
                <div className="name-input-group">
                  <label>Player 1 Name:</label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    onChange={(e) => updatePlayerName(1, e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && startGame()}
                  />
                </div>
                <div className="name-input-group">
                  <label>Player 2 Name:</label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    onChange={(e) => updatePlayerName(2, e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && startGame()}
                  />
                </div>
              </div>
              <motion.button
                className="start-btn"
                onClick={startGame}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Game
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Playing Phase */}
        <AnimatePresence mode="wait">
          {gameState === 'playing' && (
            <motion.div
              className="game-board"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="players-container">
                <PlayerCard
                  player={player1}
                  playerNumber={1}
                  onChoice={(choice) => handleChoice(1, choice)}
                  choices={CHOICES}
                  disabled={!!player1.choice}
                  showChoice={false}
                />

                <motion.div
                  className="vs-divider"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <span className="vs-text">VS</span>
                </motion.div>

                <PlayerCard
                  player={player2}
                  playerNumber={2}
                  onChoice={(choice) => handleChoice(2, choice)}
                  choices={CHOICES}
                  disabled={!!player2.choice}
                  showChoice={false}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reveal Phase */}
        <AnimatePresence mode="wait">
          {gameState === 'reveal' && (
            <motion.div
              className="reveal-phase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="reveal-container"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="choices-display">
                  <motion.div
                    className="choice-reveal"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <p className="choice-label">{player1.name}</p>
                    <div className="choice-emoji">
                      {CHOICE_EMOJIS[player1.choice]}
                    </div>
                  </motion.div>

                  <motion.div
                    className="vs-reveal"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                  >
                    VS
                  </motion.div>

                  <motion.div
                    className="choice-reveal"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <p className="choice-label">{player2.name}</p>
                    <div className="choice-emoji">
                      {CHOICE_EMOJIS[player2.choice]}
                    </div>
                  </motion.div>
                </div>

                <motion.button
                  className="reveal-btn"
                  onClick={handleReveal}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  Reveal Winner! 🎉
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result Phase */}
        <AnimatePresence mode="wait">
          {gameState === 'result' && (
            <WinnerDisplay
              winner={winner}
              player1={player1}
              player2={player2}
              onPlayAgain={playAgain}
              choiceEmojis={CHOICE_EMOJIS}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default App
