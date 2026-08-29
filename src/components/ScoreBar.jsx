export default function ScoreBar({ label, value }) {
  return (
    <div className="score-bar">
      <div className="score-bar-top">
        <span>{label}</span>
        <span className="score-bar-value">{value}%</span>
      </div>
      <div className="score-bar-track" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
        <div className="score-bar-fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}
