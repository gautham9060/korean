import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'

export default function NotFound() {
  return (
    <PageTransition>
      <section className="container success">
        <h1 className="h1 glitch" data-text="404">404</h1>
        <p className="muted">This page has gone dark.</p>
        <Link to="/" className="btn btn-neon"><span>Return home</span></Link>
      </section>
    </PageTransition>
  )
}
