/**
 * Thin wrapper around the .btn CSS classes so pages can compose buttons
 * without repeating className strings. variant: 'primary' | 'outline' | 'ghost'
 */
export default function Button({
  children,
  variant = 'primary',
  block = false,
  className = '',
  ...rest
}) {
  const classes = ['btn', `btn-${variant}`, block ? 'btn-block' : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}
