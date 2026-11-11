import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import ProductArt from '../components/ProductArt'
import { Reveal, SplitText } from '../components/Reveal'

const chapters = [
  { n: '01', t: 'Seoul-formulated', d: 'Every formula is developed with Korean dermatologists in our Seoul lab and tested on real skin.' },
  { n: '02', t: 'Fermented actives', d: 'Ginseng, rice and green tea are slow-fermented so skin can absorb them deeply and gently.' },
  { n: '03', t: 'Kind by design', d: 'Cruelty-free, fragrance-conscious and packed in refillable black glass.' },
]

export default function About() {
  return (
    <PageTransition>
      <section className="page-hero container">
        <span className="eyebrow">Our Story</span>
        <h1 className="h1"><SplitText text="Korean skincare for" /> <em className="serif-i"><SplitText wordClassName="neon-text" text="the hours after midnight." delay={0.2} /></em></h1>
      </section>
      <section className="container about-grid">
        <Reveal className="about-art"><ProductArt type="serum" a="#39ff14" b="#00ffa3" /></Reveal>
        <div className="about-chapters">
          {chapters.map((c, i) => (
            <Reveal key={c.n} delay={i * 0.12} className="chapter">
              <span className="mono neon-small">{c.n}</span>
              <h3>{c.t}</h3>
              <p className="muted">{c.d}</p>
            </Reveal>
          ))}
          <Reveal delay={0.4}><Link to="/shop" className="btn btn-neon"><span>Discover the collection</span></Link></Reveal>
        </div>
      </section>
    </PageTransition>
  )
}
