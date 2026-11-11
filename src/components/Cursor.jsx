import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const [enabled] = useState(() => window.matchMedia('(hover: hover) and (pointer: fine)').matches)

  useEffect(() => {
    if (!enabled) return
    document.body.classList.add('has-cursor')
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, raf
    const move = (e) => {
      x = e.clientX
      y = e.clientY
      const t = e.target.closest('a, button, [data-cursor], input, select, textarea')
      ring.current?.classList.toggle('is-hover', !!t)
      const label = t?.getAttribute?.('data-cursor')
      ring.current?.setAttribute('data-label', label || '')
      ring.current?.classList.toggle('has-label', !!label)
    }
    const down = () => ring.current?.classList.add('is-down')
    const up = () => ring.current?.classList.remove('is-down')
    const loop = () => {
      rx += (x - rx) * 0.16
      ry += (y - ry) * 0.16
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    loop()
    addEventListener('mousemove', move)
    addEventListener('mousedown', down)
    addEventListener('mouseup', up)
    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('mousemove', move)
      removeEventListener('mousedown', down)
      removeEventListener('mouseup', up)
      document.body.classList.remove('has-cursor')
    }
  }, [enabled])

  if (!enabled) return null
  return (
    <>
      <div ref={ring} className="cursor-ring" />
      <div ref={dot} className="cursor-dot" />
    </>
  )
}
