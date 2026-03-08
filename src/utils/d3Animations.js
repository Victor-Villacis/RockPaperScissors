import { select } from 'd3-selection'
import { transition } from 'd3-transition'
import { easeCubicOut, easeBackOut, easeBounceOut, easeElasticOut } from 'd3-ease'

// Create D3 transition - needed for D3 to work properly
select.prototype.transition = transition

/**
 * Fade in animation
 */
export function fadeIn(element, duration = 500, delay = 0) {
  select(element)
    .style('opacity', 0)
    .transition()
    .duration(duration)
    .delay(delay)
    .ease(easeCubicOut)
    .style('opacity', 1)
}

/**
 * Fade out animation
 */
export function fadeOut(element, duration = 500, delay = 0) {
  select(element)
    .transition()
    .duration(duration)
    .delay(delay)
    .ease(easeCubicOut)
    .style('opacity', 0)
}

/**
 * Scale entrance animation
 */
export function scaleIn(element, duration = 600, delay = 0) {
  select(element)
    .style('transform', 'scale(0)')
    .style('opacity', 0)
    .transition()
    .duration(duration)
    .delay(delay)
    .ease(easeBackOut)
    .style('transform', 'scale(1)')
    .style('opacity', 1)
}

/**
 * Bounce in animation
 */
export function bounceIn(element, duration = 800, delay = 0) {
  select(element)
    .style('transform', 'scale(0) rotate(-180deg)')
    .style('opacity', 0)
    .transition()
    .duration(duration)
    .delay(delay)
    .ease(easeBounceOut)
    .style('transform', 'scale(1) rotate(0deg)')
    .style('opacity', 1)
}

/**
 * Slide in from direction
 */
export function slideIn(element, direction = 'left', duration = 600, delay = 0) {
  const transforms = {
    left: 'translateX(-100px)',
    right: 'translateX(100px)',
    top: 'translateY(-100px)',
    bottom: 'translateY(100px)'
  }

  select(element)
    .style('transform', transforms[direction])
    .style('opacity', 0)
    .transition()
    .duration(duration)
    .delay(delay)
    .ease(easeCubicOut)
    .style('transform', 'translateX(0) translateY(0)')
    .style('opacity', 1)
}

/**
 * Pulse animation
 */
export function pulse(element, scale = 1.1, duration = 300) {
  select(element)
    .transition()
    .duration(duration)
    .ease(easeCubicOut)
    .style('transform', `scale(${scale})`)
    .transition()
    .duration(duration)
    .ease(easeCubicOut)
    .style('transform', 'scale(1)')
}

/**
 * Shake animation
 */
export function shake(element, intensity = 10, duration = 500) {
  const node = select(element)
  const shakes = 4
  const interval = duration / (shakes * 2)

  for (let i = 0; i < shakes; i++) {
    node
      .transition()
      .duration(interval)
      .delay(i * interval * 2)
      .style('transform', `translateX(${intensity}px)`)
      .transition()
      .duration(interval)
      .style('transform', 'translateX(0)')
  }
}

/**
 * Rotate entrance
 */
export function rotateIn(element, duration = 600, delay = 0) {
  select(element)
    .style('transform', 'rotate(-180deg) scale(0)')
    .style('opacity', 0)
    .transition()
    .duration(duration)
    .delay(delay)
    .ease(easeBackOut)
    .style('transform', 'rotate(0deg) scale(1)')
    .style('opacity', 1)
}

/**
 * Elastic bounce
 */
export function elasticBounce(element, duration = 800, delay = 0) {
  select(element)
    .style('transform', 'scale(0)')
    .transition()
    .duration(duration)
    .delay(delay)
    .ease(easeElasticOut)
    .style('transform', 'scale(1)')
}

/**
 * Float animation (continuous)
 */
export function startFloat(element, distance = 10, duration = 2000) {
  const node = select(element)

  function animate() {
    node
      .transition()
      .duration(duration)
      .ease(easeCubicOut)
      .style('transform', `translateY(-${distance}px)`)
      .transition()
      .duration(duration)
      .ease(easeCubicOut)
      .style('transform', 'translateY(0)')
      .on('end', animate)
  }

  animate()
}

/**
 * Number counter animation
 */
export function animateNumber(element, fromValue, toValue, duration = 600) {
  const node = select(element)
  const difference = toValue - fromValue

  node
    .transition()
    .duration(duration)
    .ease(easeCubicOut)
    .tween('text', function() {
      const interpolate = d3.interpolateNumber(fromValue, toValue)
      return function(t) {
        this.textContent = Math.round(interpolate(t))
      }
    })
}

/**
 * Confetti particle animation
 */
export function createConfetti(container, count = 20) {
  const containerNode = select(container)
  const width = container.offsetWidth
  const height = container.offsetHeight

  for (let i = 0; i < count; i++) {
    const confetti = containerNode
      .append('div')
      .style('position', 'absolute')
      .style('left', `${width / 2}px`)
      .style('top', '0')
      .style('font-size', '2rem')
      .style('pointer-events', 'none')
      .text(['🎉', '🎊', '⭐', '✨', '🌟'][i % 5])

    const randomX = (Math.random() - 0.5) * width
    const randomRotation = Math.random() * 720 - 360

    confetti
      .transition()
      .duration(2000 + Math.random() * 1000)
      .delay(i * 50)
      .ease(easeCubicOut)
      .style('left', `${width / 2 + randomX}px`)
      .style('top', `${height}px`)
      .style('transform', `rotate(${randomRotation}deg)`)
      .style('opacity', 0)
      .remove()
  }
}

/**
 * Sequential stagger animation
 */
export function staggerIn(elements, duration = 400, staggerDelay = 100) {
  elements.forEach((element, index) => {
    scaleIn(element, duration, index * staggerDelay)
  })
}

export default {
  fadeIn,
  fadeOut,
  scaleIn,
  bounceIn,
  slideIn,
  pulse,
  shake,
  rotateIn,
  elasticBounce,
  startFloat,
  animateNumber,
  createConfetti,
  staggerIn
}
