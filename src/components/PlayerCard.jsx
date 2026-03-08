import { useEffect, useRef, useState } from 'react'
import { select } from 'd3-selection'
import { easeCubicOut } from 'd3-ease'
import ChoiceButton from './ChoiceButton'
import * as d3Animations from '../utils/d3Animations'
import './PlayerCard.css'

const PlayerCard = ({ player, playerNumber, onChoice, choices, disabled, showChoice }) => {
  const cardRef = useRef(null)
  const headerRef = useRef(null)
  const lockedRef = useRef(null)
  const gridRef = useRef(null)
  const selectedRef = useRef(null)
  const [prevDisabled, setPrevDisabled] = useState(disabled)

  // Initial entrance animation
  useEffect(() => {
    if (cardRef.current) {
      const direction = playerNumber === 1 ? 'left' : 'right'
      d3Animations.slideIn(cardRef.current, direction, 600, 300)
    }
  }, [playerNumber])

  // Animate header when disabled state changes
  useEffect(() => {
    if (headerRef.current && disabled !== prevDisabled) {
      const scale = disabled ? 1.02 : 1
      select(headerRef.current)
        .transition()
        .duration(300)
        .ease(easeCubicOut)
        .style('transform', `scale(${scale})`)
      setPrevDisabled(disabled)
    }
  }, [disabled, prevDisabled])

  // Animate locked indicator
  useEffect(() => {
    if (lockedRef.current && disabled && !showChoice) {
      d3Animations.bounceIn(lockedRef.current, 600, 0)
    }
  }, [disabled, showChoice])

  // Animate choices grid appearance/disappearance
  useEffect(() => {
    if (gridRef.current) {
      if (!disabled) {
        select(gridRef.current)
          .style('opacity', 0)
          .style('transform', 'translateY(20px)')
          .transition()
          .duration(400)
          .ease(easeCubicOut)
          .style('opacity', 1)
          .style('transform', 'translateY(0)')
      } else {
        select(gridRef.current)
          .transition()
          .duration(300)
          .ease(easeCubicOut)
          .style('opacity', 0)
          .style('transform', 'scale(0.8)')
      }
    }
  }, [disabled])

  // Animate selected choice
  useEffect(() => {
    if (selectedRef.current && showChoice && player.choice) {
      d3Animations.bounceIn(selectedRef.current, 600, 0)
    }
  }, [showChoice, player.choice])

  return (
    <div
      ref={cardRef}
      className={`player-card player-${playerNumber}`}
    >
      <div ref={headerRef} className="player-header">
        <h2 className="player-name">
          {player.name} {playerNumber === 1 ? '🎱' : '🎮'}
        </h2>
        {disabled && !showChoice && (
          <div ref={lockedRef} className="choice-locked">
            ✓ Choice Locked!
          </div>
        )}
      </div>

      {!disabled && (
        <div ref={gridRef} className="choices-grid">
          {choices.map((choice, index) => (
            <ChoiceButton
              key={choice}
              choice={choice}
              onClick={() => onChoice(choice)}
              delay={index * 100}
              playerNumber={playerNumber}
            />
          ))}
        </div>
      )}

      {showChoice && player.choice && (
        <div ref={selectedRef} className="selected-choice">
          <p>Choice: {player.choice}</p>
        </div>
      )}
    </div>
  )
}

export default PlayerCard
