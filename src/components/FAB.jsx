import { Icons } from './Icons';

export default function FAB({ onClick }) {
  return (
    <button className="fab" onClick={onClick} aria-label="Create Squad">
      <div className="fab-glow" />
      <Icons.Plus width="22" height="22" />
    </button>
  );
}
