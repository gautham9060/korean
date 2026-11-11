import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import ProductCard from '../components/ProductCard'
import { SplitText } from '../components/Reveal'
import { SearchIcon } from '../components/Icons'
import { CATEGORIES, products } from '../data/products'

const SORTS = {
  featured: { label: 'Featured', fn: () => 0 },
  low: { label: 'Price: Low → High', fn: (a, b) => a.price - b.price },
  high: { label: 'Price: High → Low', fn: (a, b) => b.price - a.price },
  rating: { label: 'Top rated', fn: (a, b) => b.rating - a.rating },
}

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const cat = params.get('c') || 'All'
  const [sort, setSort] = useState('featured')
  const [q, setQ] = useState('')

  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    return products
      .filter((p) => cat === 'All' || p.category === cat)
      .filter((p) => !s || `${p.name} ${p.category} ${p.tagline}`.toLowerCase().includes(s))
      .sort(SORTS[sort].fn)
  }, [cat, sort, q])

  const setCat = (c) => setParams(c === 'All' ? {} : { c })

  return (
    <PageTransition>
      <section className="page-hero container">
        <span className="eyebrow">The Collection · {products.length} products</span>
        <h1 className="h1">
          <SplitText text={cat === 'All' ? 'Everything' : cat} key={cat} />{' '}
          <em className="serif-i"><SplitText wordClassName="neon-text" text="nocturne." delay={0.15} key={cat + 'n'} /></em>
        </h1>
      </section>

      <section className="container">
        <div className="toolbar">
          <LayoutGroup>
            <div className="chips" role="tablist">
              {CATEGORIES.map((c) => (
                <button key={c} className={`chip ${c === cat ? 'active' : ''}`} onClick={() => setCat(c)} role="tab" aria-selected={c === cat}>
                  {c === cat && <motion.span layoutId="chip-bg" className="chip-bg" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
                  <span className="chip-label">{c}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>
          <div className="toolbar-right">
            <label className="search">
              <SearchIcon width={16} />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" aria-label="Search products" />
            </label>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="select" aria-label="Sort">
              {Object.entries(SORTS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>
        </div>

        <motion.div layout className="grid shop-grid">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </AnimatePresence>
        </motion.div>
        {list.length === 0 && (
          <div className="empty-state">
            <div className="empty-orb" />
            <p>Nothing glows here yet. Try another search.</p>
          </div>
        )}
      </section>
    </PageTransition>
  )
}
