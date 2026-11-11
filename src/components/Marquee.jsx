export default function Marquee({ items, reverse = false, outline = false }) {
  const row = [...items, ...items]
  return (
    <div className={`marquee ${reverse ? 'reverse' : ''} ${outline ? 'outline' : ''}`}>
      <div className="marquee-track">
        {row.map((t, i) => (
          <span key={i} className="marquee-item">
            {t}
            <i className="marquee-star">✦</i>
          </span>
        ))}
      </div>
    </div>
  )
}
