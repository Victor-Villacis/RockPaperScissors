import { useEffect, useRef } from 'react'
import { select } from 'd3-selection'
import { easeCubicOut, easeBackOut } from 'd3-ease'
import * as d3Animations from '../utils/d3Animations'
import './ChoiceButton.css'

const CHOICE_ICONS = {
  rock: '🪨',
  paper: '📄',
  scissors: '✂️'
}

const ChoiceButton = ({ choice, onClick, delay = 0, playerNumber }) => {
  const buttonRef = useRef(null)
  const iconRef = useRef(null)
  const labelRef = useRef(null)

  // Entrance animation
  useEffect(() => {
    if (buttonRef.current) {
      d3Animations.rotateIn(buttonRef.current, 600, delay)
    }
    if (labelRef.current) {
      d3Animations.fadeIn(labelRef.current, 400, delay + 200)
    }
  }, [delay])

  // Hover effects
  useEffect(() => {
    const button = buttonRef.current
    const icon = iconRef.current
    if (!button || !icon) return

    let floatAnimation = null

    const handleMouseEnter = () => {
      d3Animations.pulse(button, 1.15, 150)
      // Start floating icon animation
      floatAnimation = setInterval(() => {
        select(icon)
          .transition()
          .duration(300)
          .ease(easeCubicOut)
          .style('transform', 'translateY(-5px)')
          .transition()
          .duration(300)
          .ease(easeCubicOut)
          .style('transform', 'translateY(0)')
      }, 600)
    }

    const handleMouseLeave = () => {
      if (floatAnimation) {
        clearInterval(floatAnimation)
        select(icon)
          .transition()
          .duration(200)
          .style('transform', 'translateY(0)')
      }
    }

    const handleMouseDown = () => {
      select(button)
        .transition()
        .duration(100)
        .ease(easeCubicOut)
        .style('transform', 'scale(0.9)')
    }

    const handleMouseUp = () => {
      select(button)
        .transition()
        .duration(200)
        .ease(easeBackOut)
        .style('transform', 'scale(1)')
    }

    button.addEventListener('mouseenter', handleMouseEnter)
    button.addEventListener('mouseleave', handleMouseLeave)
    button.addEventListener('mousedown', handleMouseDown)
    button.addEventListener('mouseup', handleMouseUp)

    return () => {
      if (floatAnimation) clearInterval(floatAnimation)
      button.removeEventListener('mouseenter', handleMouseEnter)
      button.removeEventListener('mouseleave', handleMouseLeave)
      button.removeEventListener('mousedown', handleMouseDown)
      button.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <button
      ref={buttonRef}
      className={`choice-button choice-${choice} player-${playerNumber}-choice`}
      onClick={onClick}
    >
      <div ref={iconRef} className="choice-icon">
        {CHOICE_ICONS[choice]}
      </div>
      <span ref={labelRef} className="choice-label">
        {choice.charAt(0).toUpperCase() + choice.slice(1)}
      </span>
    </button>
  )
}

export default ChoiceButton
