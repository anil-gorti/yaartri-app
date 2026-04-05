export default function LoadingSpinner({ text = "Loading..." }) {
  return (
    <div className="loading-container">
      <div className="spinner" />
      <p className="loading-text technical-font">{text}</p>
    </div>
  );
}
