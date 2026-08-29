export default function PageHeader({ eyebrow, title, description, children }) {
  return (
    <div className="page-header">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h1 className="page-header-title">{title}</h1>
      {description && <p className="page-header-desc">{description}</p>}
      {children && <div className="page-header-actions">{children}</div>}
    </div>
  )
}
