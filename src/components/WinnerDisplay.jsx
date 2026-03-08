import { useEffect, useRef } from 'react'
import { select } from 'd3-selection'
import { easeCubicOut, easeBackOut } from 'd3-ease'
import * as d3Animations from '../utils/d3Animations'
import './WinnerDisplay.css'

const WinnerDisplay = ({ winner, player1, player2, onPlayAgain, choiceEmojis }) => {
  const displayRef = useRef(null)
  const contentRef = useRef(null)
  const emojiRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const summaryRef = useRef(null)
  const buttonRef = useRef(null)
  const confettiContainerRef = useRef(null)

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

  // Main entrance animation
  useEffect(() => {
    if (displayRef.current) {
      d3Animations.scaleIn(displayRef.current, 500, 0)
    }
  }, [])

  // Content animations
  useEffect(() => {
    if (contentRef.current) {
      select(contentRef.current)
        .style('opacity', 0)
        .style('transform', 'translateY(50px)')
        .transition()
        .duration(500)
        .delay(200)
        .ease(easeCubicOut)
        .style('opacity', 1)
        .style('transform', 'translateY(0)')
    }
  }, [])

  // Emoji animation
  useEffect(() => {
    if (emojiRef.current) {
      d3Animations.bounceIn(emojiRef.current, 800, 300)
    }
  }, [])

  // Title animation
  useEffect(() => {
    if (titleRef.current) {
      select(titleRef.current)
        .style('opacity', 0)
        .style('transform', 'translateY(20px)')
        .transition()
        .duration(500)
        .delay(400)
        .ease(easeCubicOut)
        .style('opacity', 1)
        .style('transform', 'translateY(0)')
    }
  }, [])

  // Subtitle animation
  useEffect(() => {
    if (subtitleRef.current) {
      d3Animations.fadeIn(subtitleRef.current, 500, 500)
    }
  }, [])

  // Summary animation
  useEffect(() => {
    if (summaryRef.current) {
      select(summaryRef.current)
        .style('opacity', 0)
        .style('transform', 'translateY(20px)')
        .transition()
        .duration(500)
        .delay(600)
        .ease(easeCubicOut)
        .style('opacity', 1)
        .style('transform', 'translateY(0)')
    }
  }, [])

  // Button animation
  useEffect(() => {
    if (buttonRef.current) {
      select(buttonRef.current)
        .style('opacity', 0)
        .style('transform', 'translateY(20px)')
        .transition()
        .duration(500)
        .delay(700)
        .ease(easeCubicOut)
        .style('opacity', 1)
        .style('transform', 'translateY(0)')
    }
  }, [])

  // Button hover effects
  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    const handleMouseEnter = () => {
      select(button)
        .transition()
        .duration(200)
        .ease(easeBackOut)
        .style('transform', 'scale(1.05) translateY(0)')
        .style('box-shadow', '0 10px 40px rgba(74, 222, 128, 0.3)')
    }

    const handleMouseLeave = () => {
      select(button)
        .transition()
        .duration(200)
        .ease(easeCubicOut)
        .style('transform', 'scale(1) translateY(0)')
        .style('box-shadow', '0 10px 30px rgba(74, 222, 128, 0.3)')
    }

    const handleMouseDown = () => {
      select(button)
        .transition()
        .duration(100)
        .style('transform', 'scale(0.95) translateY(0)')
    }

    const handleMouseUp = () => {
      select(button)
        .transition()
        .duration(100)
        .style('transform', 'scale(1.05) translateY(0)')
    }

    button.addEventListener('mouseenter', handleMouseEnter)
    button.addEventListener('mouseleave', handleMouseLeave)
    button.addEventListener('mousedown', handleMouseDown)
    button.addEventListener('mouseup', handleMouseUp)

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter)
      button.removeEventListener('mouseleave', handleMouseLeave)
      button.removeEventListener('mousedown', handleMouseDown)
      button.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  // Confetti animation
  useEffect(() => {
    if (winner !== 'tie' && confettiContainerRef.current) {
      const container = confettiContainerRef.current
      const confettiEmojis = ['🎉', '🎊', '⭐', '✨', '🌟']

      // Clear any existing confetti
      select(container).selectAll('*').remove()

      // Create confetti particles with D3
      const createConfettiWave = () => {
        for (let i = 0; i < 20; i++) {
          const confetti = select(container)
            .append('div')
            .attr('class', 'confetti')
            .style('position', 'absolute')
            .style('left', '50%')
            .style('top', '-50px')
            .style('font-size', '2rem')
            .style('opacity', 0)
            .style('pointer-events', 'none')
            .text(confettiEmojis[i % 5])

          const randomX = (Math.random() - 0.5) * 400
          const randomY = Math.random() * 600 + 300
          const randomRotate = Math.random() * 720 - 360

          confetti
            .transition()
            .duration(2000)
            .delay(i * 100)
            .ease(easeCubicOut)
            .style('left', `calc(50% + ${randomX}px)`)
            .style('top', `${randomY}px`)
            .style('transform', `rotate(${randomRotate}deg)`)
            .style('opacity', 1)
            .transition()
            .duration(500)
            .style('opacity', 0)
            .remove()
        }
      }

      // Create initial wave
      createConfettiWave()

      // Create waves periodically
      const interval = setInterval(createConfettiWave, 3000)

      return () => clearInterval(interval)
    }
  }, [winner])

  return (
    <div ref={displayRef} className="winner-display">
      {winner !== 'tie' && (
        <div ref={confettiContainerRef} className="confetti-container" />
      )}

      <div ref={contentRef} className="winner-content">
        <div ref={emojiRef} className="winner-emoji">
          {message.emoji}
        </div>

        <h2 ref={titleRef} className="winner-title">
          {message.title}
        </h2>

        <p ref={subtitleRef} className="winner-subtitle">
          {message.subtitle}
        </p>

        <div ref={summaryRef} className="match-summary">
          <div className="match-choice">
            <span className="choice-emoji-large">{choiceEmojis[player1.choice]}</span>
            <span className="choice-player">{player1.name}</span>
          </div>
          <span className="match-vs">VS</span>
          <div className="match-choice">
            <span className="choice-emoji-large">{choiceEmojis[player2.choice]}</span>
            <span className="choice-player">{player2.name}</span>
          </div>
        </div>

        <button
          ref={buttonRef}
          className="play-again-btn"
          onClick={onPlayAgain}
        >
          Play Again 🎮
        </button>
      </div>
    </div>
  )
}

export default WinnerDisplay
