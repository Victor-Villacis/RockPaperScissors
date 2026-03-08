import { useState, useCallback, useEffect, useRef } from 'react'
import { select } from 'd3-selection'
import { easeCubicOut, easeBackOut } from 'd3-ease'
import * as d3Animations from './utils/d3Animations'
import './App.css'
import PlayerCard from './components/PlayerCard'
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

  // Refs for D3 animations
  const containerRef = useRef(null)
  const headerRef = useRef(null)
  const resetBtnRef = useRef(null)
  const setupRef = useRef(null)
  const startBtnRef = useRef(null)
  const gameBoardRef = useRef(null)
  const vsDividerRef = useRef(null)
  const revealPhaseRef = useRef(null)
  const revealContainerRef = useRef(null)
  const revealChoice1Ref = useRef(null)
  const revealChoice2Ref = useRef(null)
  const revealVsRef = useRef(null)
  const revealBtnRef = useRef(null)

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

  // Initial animations
  useEffect(() => {
    if (containerRef.current) {
      d3Animations.fadeIn(containerRef.current, 500, 0)
    }
    if (headerRef.current) {
      d3Animations.slideIn(headerRef.current, 'top', 600, 200)
    }
  }, [])

  // Reset button animations
  useEffect(() => {
    const btn = resetBtnRef.current
    if (!btn || gameState === 'setup') return

    const handleMouseEnter = () => {
      select(btn)
        .transition()
        .duration(200)
        .ease(easeBackOut)
        .style('transform', 'scale(1.05)')
    }

    const handleMouseLeave = () => {
      select(btn)
        .transition()
        .duration(200)
        .ease(easeCubicOut)
        .style('transform', 'scale(1)')
    }

    const handleMouseDown = () => {
      select(btn)
        .transition()
        .duration(100)
        .style('transform', 'scale(0.95)')
    }

    const handleMouseUp = () => {
      select(btn)
        .transition()
        .duration(100)
        .style('transform', 'scale(1.05)')
    }

    btn.addEventListener('mouseenter', handleMouseEnter)
    btn.addEventListener('mouseleave', handleMouseLeave)
    btn.addEventListener('mousedown', handleMouseDown)
    btn.addEventListener('mouseup', handleMouseUp)

    return () => {
      btn.removeEventListener('mouseenter', handleMouseEnter)
      btn.removeEventListener('mouseleave', handleMouseLeave)
      btn.removeEventListener('mousedown', handleMouseDown)
      btn.removeEventListener('mouseup', handleMouseUp)
    }
  }, [gameState])

  // Setup phase animations
  useEffect(() => {
    if (setupRef.current && gameState === 'setup' && showNameInput) {
      d3Animations.scaleIn(setupRef.current, 400, 0)
    }
  }, [gameState, showNameInput])

  // Start button animations
  useEffect(() => {
    const btn = startBtnRef.current
    if (!btn) return

    const createButtonHandlers = () => {
      const handleMouseEnter = () => {
        select(btn)
          .transition()
          .duration(200)
          .ease(easeBackOut)
          .style('transform', 'scale(1.05)')
      }

      const handleMouseLeave = () => {
        select(btn)
          .transition()
          .duration(200)
          .ease(easeCubicOut)
          .style('transform', 'scale(1)')
      }

      const handleMouseDown = () => {
        select(btn)
          .transition()
          .duration(100)
          .style('transform', 'scale(0.95)')
      }

      const handleMouseUp = () => {
        select(btn)
          .transition()
          .duration(100)
          .style('transform', 'scale(1.05)')
      }

      return { handleMouseEnter, handleMouseLeave, handleMouseDown, handleMouseUp }
    }

    const handlers = createButtonHandlers()
    btn.addEventListener('mouseenter', handlers.handleMouseEnter)
    btn.addEventListener('mouseleave', handlers.handleMouseLeave)
    btn.addEventListener('mousedown', handlers.handleMouseDown)
    btn.addEventListener('mouseup', handlers.handleMouseUp)

    return () => {
      btn.removeEventListener('mouseenter', handlers.handleMouseEnter)
      btn.removeEventListener('mouseleave', handlers.handleMouseLeave)
      btn.removeEventListener('mousedown', handlers.handleMouseDown)
      btn.removeEventListener('mouseup', handlers.handleMouseUp)
    }
  }, [])

  // Game board animations
  useEffect(() => {
    if (gameBoardRef.current && gameState === 'playing') {
      select(gameBoardRef.current)
        .style('opacity', 0)
        .style('transform', 'translateY(20px)')
        .transition()
        .duration(500)
        .ease(easeCubicOut)
        .style('opacity', 1)
        .style('transform', 'translateY(0)')
    }
  }, [gameState])

  // VS divider animation
  useEffect(() => {
    const vsDivider = vsDividerRef.current
    if (!vsDivider || gameState !== 'playing') return

    const animate = () => {
      select(vsDivider)
        .transition()
        .duration(1000)
        .ease(easeCubicOut)
        .style('transform', 'scale(1.1) rotate(5deg)')
        .transition()
        .duration(1000)
        .ease(easeCubicOut)
        .style('transform', 'scale(1) rotate(-5deg)')
        .on('end', animate)
    }

    animate()
  }, [gameState])

  // Reveal phase animations
  useEffect(() => {
    if (gameState === 'reveal') {
      if (revealPhaseRef.current) {
        d3Animations.fadeIn(revealPhaseRef.current, 400, 0)
      }
      if (revealContainerRef.current) {
        d3Animations.scaleIn(revealContainerRef.current, 500, 100)
      }
      if (revealChoice1Ref.current) {
        d3Animations.slideIn(revealChoice1Ref.current, 'left', 600, 200)
      }
      if (revealChoice2Ref.current) {
        d3Animations.slideIn(revealChoice2Ref.current, 'right', 600, 200)
      }
      if (revealVsRef.current) {
        d3Animations.scaleIn(revealVsRef.current, 400, 500)
      }
      if (revealBtnRef.current) {
        select(revealBtnRef.current)
          .style('opacity', 0)
          .style('transform', 'translateY(20px)')
          .transition()
          .duration(400)
          .delay(800)
          .ease(easeCubicOut)
          .style('opacity', 1)
          .style('transform', 'translateY(0)')
      }
    }
  }, [gameState])

  // Reveal button hover effects
  useEffect(() => {
    const btn = revealBtnRef.current
    if (!btn) return

    const handleMouseEnter = () => {
      select(btn)
        .transition()
        .duration(200)
        .ease(easeBackOut)
        .style('transform', 'scale(1.05) translateY(0)')
    }

    const handleMouseLeave = () => {
      select(btn)
        .transition()
        .duration(200)
        .ease(easeCubicOut)
        .style('transform', 'scale(1) translateY(0)')
    }

    const handleMouseDown = () => {
      select(btn)
        .transition()
        .duration(100)
        .style('transform', 'scale(0.95) translateY(0)')
    }

    const handleMouseUp = () => {
      select(btn)
        .transition()
        .duration(100)
        .style('transform', 'scale(1.05) translateY(0)')
    }

    btn.addEventListener('mouseenter', handleMouseEnter)
    btn.addEventListener('mouseleave', handleMouseLeave)
    btn.addEventListener('mousedown', handleMouseDown)
    btn.addEventListener('mouseup', handleMouseUp)

    return () => {
      btn.removeEventListener('mouseenter', handleMouseEnter)
      btn.removeEventListener('mouseleave', handleMouseLeave)
      btn.removeEventListener('mousedown', handleMouseDown)
      btn.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <div className="app">
      <div ref={containerRef} className="container">
        {/* Header */}
        <header ref={headerRef} className="header">
          <h1 className="title">
            <span className="title-emoji">🎮</span>
            Rock Paper Scissors
            <span className="title-emoji">🎮</span>
          </h1>
          {gameState !== 'setup' && (
            <button
              ref={resetBtnRef}
              className="reset-btn"
              onClick={resetGame}
            >
              Reset Game
            </button>
          )}
        </header>

        {/* Score Board */}
        <ScoreBoard player1={player1} player2={player2} />

        {/* Setup Phase - Name Input */}
        {gameState === 'setup' && showNameInput && (
          <div ref={setupRef} className="setup-phase">
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
            <button
              ref={startBtnRef}
              className="start-btn"
              onClick={startGame}
            >
              Start Game
            </button>
          </div>
        )}

        {/* Playing Phase */}
        {gameState === 'playing' && (
          <div ref={gameBoardRef} className="game-board">
            <div className="players-container">
              <PlayerCard
                player={player1}
                playerNumber={1}
                onChoice={(choice) => handleChoice(1, choice)}
                choices={CHOICES}
                disabled={!!player1.choice}
                showChoice={false}
              />

              <div ref={vsDividerRef} className="vs-divider">
                <span className="vs-text">VS</span>
              </div>

              <PlayerCard
                player={player2}
                playerNumber={2}
                onChoice={(choice) => handleChoice(2, choice)}
                choices={CHOICES}
                disabled={!!player2.choice}
                showChoice={false}
              />
            </div>
          </div>
        )}

        {/* Reveal Phase */}
        {gameState === 'reveal' && (
          <div ref={revealPhaseRef} className="reveal-phase">
            <div ref={revealContainerRef} className="reveal-container">
              <div className="choices-display">
                <div ref={revealChoice1Ref} className="choice-reveal">
                  <p className="choice-label">{player1.name}</p>
                  <div className="choice-emoji">
                    {CHOICE_EMOJIS[player1.choice]}
                  </div>
                </div>

                <div ref={revealVsRef} className="vs-reveal">
                  VS
                </div>

                <div ref={revealChoice2Ref} className="choice-reveal">
                  <p className="choice-label">{player2.name}</p>
                  <div className="choice-emoji">
                    {CHOICE_EMOJIS[player2.choice]}
                  </div>
                </div>
              </div>

              <button
                ref={revealBtnRef}
                className="reveal-btn"
                onClick={handleReveal}
              >
                Reveal Winner! 🎉
              </button>
            </div>
          </div>
        )}

        {/* Result Phase */}
        {gameState === 'result' && (
          <WinnerDisplay
            winner={winner}
            player1={player1}
            player2={player2}
            onPlayAgain={playAgain}
            choiceEmojis={CHOICE_EMOJIS}
          />
        )}
      </div>
    </div>
  )
}

export default App
