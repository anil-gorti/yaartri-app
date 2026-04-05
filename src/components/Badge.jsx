export default function Badge({ children, variant = "default", icon }) {
  return (
    <span className={`badge badge--${variant}`}>
      {icon && <span className="badge-icon">{icon}</span>}
      {children}
    </span>
  );
}
