import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useStore } from '../context/StoreContext'
import { BagIcon, HeartIcon } from './Icons'

const links = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Collection' },
  { to: '/shop?c=Serums', label: 'Skincare' },
  { to: '/shop?c=Makeup', label: 'Makeup' },
  { to: '/about', label: 'Our Story' },
]

export default function Navbar() {
  const { count, wishlist, setCartOpen } = useStore()
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY, scrollYProgress } = useScroll()
  const location = useLocation()

  useMotionValueEvent(scrollY, 'change', (v) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(v > prev && v > 200 && !open)
    setScrolled(v > 30)
  })

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setOpen(false), [location])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? 'scrolled' : ''}`}
        animate={{ y: hidden ? '-110%' : '0%' }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link to="/" className="logo" aria-label="Koewan home">
          KOE<span>W</span>AN
        </Link>

        <nav className="nav-links">
          {links.map((l) => (
            <Link key={l.label} to={l.to} className={`nav-link ${location.pathname + location.search === l.to ? 'active' : ''}`}>
              <span data-text={l.label}>{l.label}</span>
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <Link to="/wishlist" className="icon-btn" aria-label="Wishlist">
            <HeartIcon />
            {wishlist.length > 0 && <span className="badge-dot">{wishlist.length}</span>}
          </Link>
          <button className="icon-btn" aria-label="Open bag" onClick={() => setCartOpen(true)}>
            <BagIcon />
            <AnimatePresence>
              {count > 0 && (
                <motion.span key={count} className="badge-dot" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <button className={`burger ${open ? 'open' : ''}`} aria-label="Menu" onClick={() => setOpen((o) => !o)}>
            <span />
            <span />
          </button>
        </div>
        <motion.div className="nav-progress" style={{ scaleX: scrollYProgress }} />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            {links.map((l, i) => (
              <motion.div
                key={l.label}
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 + i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link to={l.to} className="mobile-link">
                  <small>0{i + 1}</small>
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <motion.p className="mobile-foot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
              Korean beauty · Seoul · Jeju · Bengaluru
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
