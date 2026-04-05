import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Icons } from '../components/Icons';

const ACTIVITY_TYPES = ['Boat_Share', 'Monument_Walk', 'Cafe_Meet', 'Rickshaw_Share', 'Market_Walk'];

export default function CreateSquadPage() {
  const navigate = useNavigate();
  const { createSquad } = useStore();
  const [form, setForm] = useState({
    title: '',
    location: '',
    time: '',
    cost: 'Split-Pay',
    description: '',
    activityType: 'Cafe_Meet',
  });

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.location || !form.time) return;
    const id = createSquad(form);
    navigate(`/squad/${id}`);
  };

  return (
    <div className="page">
      <header className="detail-header fade-in">
        <button className="btn-icon" onClick={() => navigate(-1)} aria-label="Go back">
          <Icons.ArrowLeft />
        </button>
        <span className="detail-header-title">Propose Squad</span>
        <div style={{ width: 36 }} />
      </header>

      <main className="main-content main-content--no-nav">
        <form className="create-form slide-up" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Squad Name</label>
            <input className="form-input" placeholder="e.g. Evening Aarti Boat" value={form.title} onChange={update('title')} required />
          </div>

          <div className="form-group">
            <label className="form-label">Meeting Point</label>
            <input className="form-input" placeholder="e.g. Dashashwamedh Ghat" value={form.location} onChange={update('location')} required />
          </div>

          <div className="form-row">
            <div className="form-group form-group--half">
              <label className="form-label">When</label>
              <input className="form-input" placeholder="e.g. Today, 17:00" value={form.time} onChange={update('time')} required />
            </div>
            <div className="form-group form-group--half">
              <label className="form-label">Cost</label>
              <select className="form-input" value={form.cost} onChange={update('cost')}>
                <option value="Split-Pay">Split-Pay</option>
                <option value="Free">Free</option>
                <option value="Fixed">Fixed Price</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Activity Type</label>
            <div className="chip-group">
              {ACTIVITY_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`chip ${form.activityType === type ? 'chip--active' : ''}`}
                  onClick={() => setForm({ ...form, activityType: type })}
                >
                  {type.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-input form-textarea"
              placeholder="What's the plan? Details help build trust."
              value={form.description}
              onChange={update('description')}
              rows={3}
            />
          </div>

          <button className="btn-primary" type="submit">
            <Icons.Plus width="16" height="16" /> Create S.O.P.
          </button>
        </form>
      </main>
    </div>
  );
}
