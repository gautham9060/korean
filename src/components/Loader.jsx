import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Loader({ onDone }) {
  const [n, setN] = useState(0)

  useEffect(() => {
    let v = 0
    const t = setInterval(() => {
      v = Math.min(100, v + Math.ceil(Math.random() * 9))
      setN(v)
      if (v >= 100) {
        clearInterval(t)
        setTimeout(onDone, 450)
      }
    }, 55)
    return () => clearInterval(t)
  }, [onDone])

  return (
    <motion.div
      className="loader"
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="loader-inner">
        <div className="loader-logo">
          {'KOEWAN'.split('').map((ch, i) => (
            <motion.span
              key={i}
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {ch}
            </motion.span>
          ))}
        </div>
        <div className="loader-bar">
          <span style={{ transform: `scaleX(${n / 100})` }} />
        </div>
        <div className="loader-meta">
          <span>Korean Beauty · Seoul</span>
          <span className="mono">{String(n).padStart(3, '0')}%</span>
        </div>
      </div>
    </motion.div>
  )
}
