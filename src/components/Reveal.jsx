import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

export function Reveal({ children, delay = 0, y = 40, className = '', as = 'div' }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1, delay, ease }}
    >
      {children}
    </M>
  )
}

/** Splits a line into words that rise up from a mask.
 *  In-view is observed on the wrapper (the words themselves start clipped). */
export function SplitText({ text, className = '', wordClassName = '', delay = 0, stagger = 0.06 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <span ref={ref} className={`split ${className}`} aria-label={text}>
      {text.split(' ').map((w, i) => (
        <span className="split-mask" key={i} aria-hidden="true">
          <motion.span
            className={`split-word ${wordClassName}`}
            initial={{ y: '115%', rotate: 6 }}
            animate={inView ? { y: 0, rotate: 0 } : undefined}
            transition={{ duration: 1.1, delay: delay + i * stagger, ease }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  )
}
