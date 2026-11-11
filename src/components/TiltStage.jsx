import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/** 3D tilt container with a light sheen that follows the pointer. */
export default function TiltStage({ children, max = 14, className = '', glare = true }) {
  const ref = useRef(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const sx = useSpring(px, { stiffness: 120, damping: 14 })
  const sy = useSpring(py, { stiffness: 120, damping: 14 })
  const rotateY = useTransform(sx, [0, 1], [-max, max])
  const rotateX = useTransform(sy, [0, 1], [max, -max])
  const gx = useTransform(sx, (v) => `${v * 100}%`)
  const gy = useTransform(sy, (v) => `${v * 100}%`)
  const bg = useTransform([gx, gy], ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.14), transparent 45%)`)

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  const reset = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <div className={`tilt-wrap ${className}`} ref={ref} onMouseMove={onMove} onMouseLeave={reset}>
      <motion.div className="tilt-inner" style={{ rotateX, rotateY }}>
        {children}
        {glare && <motion.div className="tilt-glare" style={{ background: bg }} />}
      </motion.div>
    </div>
  )
}
