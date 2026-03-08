import { useEffect, useRef } from 'react'
import { select } from 'd3-selection'
import { interpolateNumber } from 'd3-interpolate'
import { easeCubicOut } from 'd3-ease'
import * as d3Animations from '../utils/d3Animations'
import './ScoreBoard.css'

const ScoreBoard = ({ player1, player2 }) => {
  const boardRef = useRef(null)
  const score1Ref = useRef(null)
  const score2Ref = useRef(null)
  const item1Ref = useRef(null)
  const item2Ref = useRef(null)
  const prevScore1 = useRef(player1.score)
  const prevScore2 = useRef(player2.score)

  // Initial entrance animation
  useEffect(() => {
    if (boardRef.current) {
      select(boardRef.current)
        .style('opacity', 0)
        .style('transform', 'translateY(-30px)')
        .transition()
        .duration(600)
        .delay(400)
        .ease(easeCubicOut)
        .style('opacity', 1)
        .style('transform', 'translateY(0)')
    }
  }, [])

  // Animate score changes for player 1
  useEffect(() => {
    if (score1Ref.current && prevScore1.current !== player1.score) {
      const node = select(score1Ref.current)

      // Pulse and color change
      node
        .style('color', '#4ade80')
        .style('transform', 'scale(1.5)')
        .transition()
        .duration(300)
        .ease(easeCubicOut)
        .style('transform', 'scale(1)')
        .style('color', '#fff')

      // Animate number counting
      node
        .transition()
        .duration(600)
        .ease(easeCubicOut)
        .tween('text', function() {
          const interpolate = interpolateNumber(prevScore1.current, player1.score)
          return function(t) {
            this.textContent = Math.round(interpolate(t))
          }
        })

      prevScore1.current = player1.score
    }
  }, [player1.score])

  // Animate score changes for player 2
  useEffect(() => {
    if (score2Ref.current && prevScore2.current !== player2.score) {
      const node = select(score2Ref.current)

      // Pulse and color change
      node
        .style('color', '#4ade80')
        .style('transform', 'scale(1.5)')
        .transition()
        .duration(300)
        .ease(easeCubicOut)
        .style('transform', 'scale(1)')
        .style('color', '#fff')

      // Animate number counting
      node
        .transition()
        .duration(600)
        .ease(easeCubicOut)
        .tween('text', function() {
          const interpolate = interpolateNumber(prevScore2.current, player2.score)
          return function(t) {
            this.textContent = Math.round(interpolate(t))
          }
        })

      prevScore2.current = player2.score
    }
  }, [player2.score])

  // Hover effects
  useEffect(() => {
    const item1 = item1Ref.current
    const item2 = item2Ref.current
    if (!item1 || !item2) return

    const createHoverHandler = (element) => {
      const handleMouseEnter = () => {
        select(element)
          .transition()
          .duration(200)
          .ease(easeCubicOut)
          .style('transform', 'scale(1.05)')
      }

      const handleMouseLeave = () => {
        select(element)
          .transition()
          .duration(200)
          .ease(easeCubicOut)
          .style('transform', 'scale(1)')
      }

      return { handleMouseEnter, handleMouseLeave }
    }

    const handlers1 = createHoverHandler(item1)
    const handlers2 = createHoverHandler(item2)

    item1.addEventListener('mouseenter', handlers1.handleMouseEnter)
    item1.addEventListener('mouseleave', handlers1.handleMouseLeave)
    item2.addEventListener('mouseenter', handlers2.handleMouseEnter)
    item2.addEventListener('mouseleave', handlers2.handleMouseLeave)

    return () => {
      item1.removeEventListener('mouseenter', handlers1.handleMouseEnter)
      item1.removeEventListener('mouseleave', handlers1.handleMouseLeave)
      item2.removeEventListener('mouseenter', handlers2.handleMouseEnter)
      item2.removeEventListener('mouseleave', handlers2.handleMouseLeave)
    }
  }, [])

  return (
    <div ref={boardRef} className="scoreboard">
      <div ref={item1Ref} className="score-item">
        <span className="score-name">{player1.name}</span>
        <span ref={score1Ref} className="score-value">
          {player1.score}
        </span>
      </div>

      <div className="score-divider">•</div>

      <div ref={item2Ref} className="score-item">
        <span className="score-name">{player2.name}</span>
        <span ref={score2Ref} className="score-value">
          {player2.score}
        </span>
      </div>
    </div>
  )
}

export default ScoreBoard
