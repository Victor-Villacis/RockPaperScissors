import { useEffect, useRef } from 'react'
import * as d3Animations from '../utils/d3Animations'

/**
 * Custom hook for D3 animations in React
 */
export function useD3Animation(animationType, options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current && d3Animations[animationType]) {
      const { duration = 600, delay = 0, ...rest } = options
      d3Animations[animationType](ref.current, duration, delay, rest)
    }
  }, [animationType, options.duration, options.delay])

  return ref
}

/**
 * Hook for entrance animations
 */
export function useEntranceAnimation(type = 'scaleIn', duration = 600, delay = 0) {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      switch (type) {
        case 'scaleIn':
          d3Animations.scaleIn(ref.current, duration, delay)
          break
        case 'bounceIn':
          d3Animations.bounceIn(ref.current, duration, delay)
          break
        case 'fadeIn':
          d3Animations.fadeIn(ref.current, duration, delay)
          break
        case 'slideLeft':
          d3Animations.slideIn(ref.current, 'left', duration, delay)
          break
        case 'slideRight':
          d3Animations.slideIn(ref.current, 'right', duration, delay)
          break
        case 'rotateIn':
          d3Animations.rotateIn(ref.current, duration, delay)
          break
        default:
          d3Animations.scaleIn(ref.current, duration, delay)
      }
    }
  }, [type, duration, delay])

  return ref
}

/**
 * Hook for hover animations
 */
export function useHoverAnimation(scaleAmount = 1.1) {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseEnter = () => {
      d3Animations.pulse(element, scaleAmount, 200)
    }

    element.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [scaleAmount])

  return ref
}

/**
 * Hook for continuous float animation
 */
export function useFloatAnimation(distance = 10, duration = 2000) {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      d3Animations.startFloat(ref.current, distance, duration)
    }
  }, [distance, duration])

  return ref
}

export default {
  useD3Animation,
  useEntranceAnimation,
  useHoverAnimation,
  useFloatAnimation
}
