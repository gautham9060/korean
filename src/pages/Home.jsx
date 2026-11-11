import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useInView, useScroll, useTransform, animate } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import ProductArt from '../components/ProductArt'
import ProductCard from '../components/ProductCard'
import TiltStage from '../components/TiltStage'
import Magnetic from '../components/Magnetic'
import Marquee from '../components/Marquee'
import { Reveal, SplitText } from '../components/Reveal'
import { ArrowIcon, StarIcon } from '../components/Icons'
import { formatPrice, getProduct, products } from '../data/products'

const heroIds = ['midnight-ginseng-serum', 'centella-barrier-cream', 'snail-glow-essence', 'glass-skin-sun-shield']

function Hero() {
  const [i, setI] = useState(0)
  const p = getProduct(heroIds[i])
  const color = p.colors[0]
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yArt = useTransform(scrollYProgress, [0, 1], [0, 160])
  const yText = useTransform(scrollYProgress, [0, 1], [0, -80])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % heroIds.length), 5200)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="hero" ref={ref} style={{ '--a': color.a, '--b': color.b }}>
      <div className="hero-bg">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="grid-floor" />
        <div className="noise" />
      </div>

      <motion.div className="hero-copy" style={{ y: yText, opacity: fade }}>
        <motion.span className="eyebrow pill" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <i className="live-dot" /> Seoul Night Edit · 2026
        </motion.span>
        <h1 className="hero-title">
          <SplitText text="Glow," delay={0.35} />
          <br />
          <span className="flicker serif-i">
            <SplitText text="after dark." delay={0.5} wordClassName="neon-text" />
          </span>
        </h1>
        <motion.p className="hero-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}>
          Korean skincare and makeup made with fermented ginseng, rice and centella. Formulated in Seoul, bottled in black glass. A night-time ritual, lit in neon.
        </motion.p>
        <motion.div className="hero-ctas" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
          <Magnetic>
            <Link to="/shop" className="btn btn-neon"><span>Shop the Collection</span><ArrowIcon width={18} /></Link>
          </Magnetic>
          <Magnetic>
            <Link to={`/product/${p.id}`} className="btn btn-ghost">Discover {p.name}</Link>
          </Magnetic>
        </motion.div>
        <motion.div className="hero-stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
          <div><strong>4.9</strong><span><StarIcon width={12} /> 2,400+ reviews</span></div>
          <div><strong>100%</strong><span>Cruelty-free</span></div>
          <div><strong>48h</strong><span>Global delivery</span></div>
        </motion.div>
      </motion.div>

      <motion.div className="hero-stage" style={{ y: yArt }}>
        <div className="orbit orbit-1"><i /></div>
        <div className="orbit orbit-2"><i /></div>
        <div className="orbit orbit-3" />
        <div className="hero-halo" />
        <TiltStage max={18} glare={false} className="hero-tilt">
          <AnimatePresence mode="wait">
            <motion.div
              key={p.id}
              className="hero-art float"
              initial={{ opacity: 0, scale: 0.7, rotate: -12, filter: 'blur(20px)' }}
              animate={{ opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.15, rotate: 10, filter: 'blur(20px)' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductArt type={p.type} a={color.a} b={color.b} />
            </motion.div>
          </AnimatePresence>
        </TiltStage>

        <AnimatePresence mode="wait">
          <motion.div
            key={p.id + 'tag'}
            className="hero-tag glass"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="eyebrow">{p.category}</span>
            <strong>{p.name}</strong>
            <span className="neon-price">{formatPrice(p.price)}</span>
          </motion.div>
        </AnimatePresence>

        <div className="hero-dots">
          {heroIds.map((id, k) => (
            <button key={id} className={k === i ? 'active' : ''} onClick={() => setI(k)} aria-label={`Show ${id}`}>
              <span />
            </button>
          ))}
        </div>
      </motion.div>

      <div className="scroll-cue"><span>Scroll</span><i /></div>
    </section>
  )
}

const collections = [
  { title: 'Serums', sub: 'Concentrated Korean actives', id: 'midnight-ginseng-serum', c: 0 },
  { title: 'Makeup', sub: 'Seoul glow, one tap away', id: 'black-pearl-cushion', c: 0 },
  { title: 'Masks', sub: 'Twenty-minute rituals', id: 'hanbang-night-mask', c: 0 },
]

function Collections() {
  return (
    <section className="section container">
      <div className="section-head">
        <Reveal><span className="eyebrow">01 — The Ritual</span></Reveal>
        <h2 className="h2"><SplitText text="Skin first." /> <em className="serif-i"><SplitText text="Glow always." delay={0.2} /></em></h2>
      </div>
      <div className="collections">
        {collections.map((col, i) => {
          const p = getProduct(col.id)
          const color = p.colors[col.c]
          return (
            <Reveal key={col.title} delay={i * 0.12}>
              <Link to={`/shop?c=${col.title}`} className="collection" style={{ '--a': color.a, '--b': color.b }} data-cursor="Enter">
                <div className="collection-art"><ProductArt type={p.type} a={color.a} b={color.b} /></div>
                <div className="collection-info">
                  <span className="mono">0{i + 1}</span>
                  <h3>{col.title}</h3>
                  <p>{col.sub}</p>
                  <span className="collection-cta">Explore <ArrowIcon width={16} /></span>
                </div>
              </Link>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

function Spotlight() {
  const ref = useRef(null)
  const p = getProduct('midnight-ginseng-serum')
  const color = p.colors[0]
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const rotate = useTransform(scrollYProgress, [0, 1], [-25, 25])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.75, 1.1, 0.9])
  const ringRot = useTransform(scrollYProgress, [0, 1], [0, 360])
  const o1 = useTransform(scrollYProgress, [0, 0.12, 0.3, 0.38], [0, 1, 1, 0])
  const o2 = useTransform(scrollYProgress, [0.35, 0.45, 0.62, 0.7], [0, 1, 1, 0])
  const o3 = useTransform(scrollYProgress, [0.67, 0.77, 1], [0, 1, 1])
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1])

  const panels = [
    { o: o1, k: '6yr', l: 'Aged red ginseng', t: 'Only six-year Korean red ginseng, fermented for 90 days to unlock smaller, faster-absorbing actives.' },
    { o: o2, k: '60%', l: 'Ginseng concentration', t: 'More than half of every drop is ginseng ferment, with niacinamide and peptides for firmness and glow.' },
    { o: o3, k: '94%', l: 'Saw brighter skin', t: 'In a 4-week clinical study, 94% of users reported brighter, bouncier skin.' },
  ]

  return (
    <section className="spotlight" ref={ref} style={{ '--a': color.a, '--b': color.b }}>
      <div className="spotlight-sticky">
        <div className="spotlight-bg" />
        <div className="container spotlight-grid">
          <div className="spotlight-left">
            <span className="eyebrow">02 — Hero Formula</span>
            <h2 className="h2">Midnight<br /><em className="serif-i neon-text">Ginseng</em></h2>
            <div className="spotlight-panels">
              {panels.map((pn) => (
                <motion.div key={pn.k} className="spotlight-panel" style={{ opacity: pn.o }}>
                  <strong className="big-num">{pn.k}</strong>
                  <span className="eyebrow">{pn.l}</span>
                  <p>{pn.t}</p>
                </motion.div>
              ))}
            </div>
            <div className="spotlight-bar"><motion.span style={{ scaleX: bar }} /></div>
            <Link to={`/product/${p.id}`} className="btn btn-ghost">Shop the serum · {formatPrice(p.price)}</Link>
          </div>
          <div className="spotlight-right">
            <motion.div className="spot-ring" style={{ rotate: ringRot }} />
            <motion.div className="spot-art" style={{ rotate, scale }}>
              <ProductArt type={p.type} a={color.a} b={color.b} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Counter({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 2.2, ease: [0.22, 1, 0.36, 1], onUpdate: (x) => setV(Math.round(x)) })
    return () => c.stop()
  }, [inView, to])
  return <span ref={ref}>{v.toLocaleString('en-IN')}{suffix}</span>
}

function Stats() {
  const items = [
    { n: 18, s: '', l: 'Clinical studies' },
    { n: 96, s: '%', l: 'Natural-origin ingredients' },
    { n: 120000, s: '+', l: 'Happy customers' },
    { n: 100, s: '%', l: 'Cruelty-free' },
  ]
  return (
    <section className="section container stats">
      {items.map((it, i) => (
        <Reveal key={it.l} delay={i * 0.1} className="stat">
          <strong className="neon-text"><Counter to={it.n} suffix={it.s} /></strong>
          <span>{it.l}</span>
        </Reveal>
      ))}
    </section>
  )
}

const quotes = [
  { q: 'The closest thing to bottling a Seoul night out.', a: 'Beauty Weekly' },
  { q: 'Glass skin, finally made luxurious.', a: 'Skin Journal' },
  { q: 'Every bottle feels like a secret you want to share.', a: 'Glow Edit' },
]

function Press() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % quotes.length), 4500)
    return () => clearInterval(t)
  }, [])
  return (
    <section className="section press container">
      <span className="eyebrow">04 — In the press</span>
      <div className="press-quote">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
          >
            “{quotes[i].q}”
            <cite>— {quotes[i].a}</cite>
          </motion.blockquote>
        </AnimatePresence>
      </div>
      <div className="press-logos">
        {quotes.map((q, k) => (
          <button key={q.a} className={k === i ? 'active' : ''} onClick={() => setI(k)}>{q.a}</button>
        ))}
      </div>
    </section>
  )
}

function Newsletter() {
  const [done, setDone] = useState(false)
  return (
    <section className="section container">
      <Reveal className="newsletter">
        <div className="newsletter-glow" />
        <span className="eyebrow">The Inner Circle</span>
        <h2 className="h2">First light on <em className="serif-i neon-text">every drop.</em></h2>
        <p className="muted">New launches, skincare routines and members-only samples.</p>
        <AnimatePresence mode="wait">
          {done ? (
            <motion.p key="ok" className="neon-text ok-msg" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              ✦ Welcome to the circle. Watch your inbox.
            </motion.p>
          ) : (
            <motion.form key="form" className="news-form" onSubmit={(e) => { e.preventDefault(); setDone(true) }} exit={{ opacity: 0, y: -10 }}>
              <input type="email" required placeholder="Your email address" aria-label="Email" />
              <button className="btn btn-neon" type="submit"><span>Join</span></button>
            </motion.form>
          )}
        </AnimatePresence>
      </Reveal>
    </section>
  )
}

export default function Home() {
  const featured = products.slice(0, 6)
  return (
    <PageTransition>
      <Hero />
      <Marquee items={['Serums', 'Toners', 'Moisturisers', 'Masks', 'Sun Care', 'Makeup']} />
      <Collections />
      <Spotlight />
      <section className="section container">
        <div className="section-head row-between">
          <div>
            <Reveal><span className="eyebrow">03 — Most Coveted</span></Reveal>
            <h2 className="h2"><SplitText text="The" /> <em className="serif-i"><SplitText text="Edit." delay={0.1} /></em></h2>
          </div>
          <Reveal><Link to="/shop" className="text-link">View all {products.length} products <ArrowIcon width={16} /></Link></Reveal>
        </div>
        <div className="grid">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>
      <Stats />
      <Marquee items={['Free samples with every order', 'Dermatologist tested', 'Made in Korea', 'Cruelty-free']} reverse outline />
      <Press />
      <Newsletter />
    </PageTransition>
  )
}
