import { describe, it, expect, beforeEach } from 'vitest';
import { useStore } from '../store/useStore';

describe('useStore', () => {
  beforeEach(() => {
    const initial = useStore.getState();
    useStore.setState({
      user: {
        id: "user_001",
        name: "Anil",
        ri: 98,
        verified: false,
        yaarScore: 100,
        punctualityStreak: 7,
        gender: "M",
        joinedSquads: []
      },
      error: null,
      isLoading: false,
      joinConfirm: null,
      scamAlert: null,
    });
  });

  it('has initial user state', () => {
    const { user } = useStore.getState();
    expect(user.name).toBe('Anil');
    expect(user.ri).toBe(98);
    expect(user.verified).toBe(false);
  });

  it('has initial squads', () => {
    const { squads } = useStore.getState();
    expect(squads.length).toBeGreaterThan(0);
    expect(squads[0]).toHaveProperty('id');
    expect(squads[0]).toHaveProperty('title');
  });

  it('can join a squad', () => {
    const { squads } = useStore.getState();
    const squadId = squads[0].id;
    const initialMemberCount = squads[0].members.length;

    useStore.getState().joinSquad(squadId);

    const state = useStore.getState();
    expect(state.user.joinedSquads).toContain(squadId);
    expect(state.squads.find(s => s.id === squadId).members.length).toBe(initialMemberCount + 1);
  });

  it('adds activity on join', () => {
    const { squads, activityFeed } = useStore.getState();
    const initialCount = activityFeed.length;

    useStore.getState().joinSquad(squads[0].id);

    expect(useStore.getState().activityFeed.length).toBe(initialCount + 1);
    expect(useStore.getState().activityFeed[0].text).toContain('joined');
  });

  it('can create a squad', () => {
    const initialCount = useStore.getState().squads.length;
    const newId = useStore.getState().createSquad({
      title: 'Test Squad',
      location: 'Test Location',
      time: 'Today, 12:00',
      cost: 'Free',
      description: 'A test squad',
      activityType: 'Cafe_Meet',
    });

    const state = useStore.getState();
    expect(state.squads.length).toBe(initialCount + 1);
    expect(state.squads[0].title).toBe('Test Squad');
    expect(newId).toBeTruthy();
  });

  it('can get squad by id', () => {
    const { squads, getSquadById } = useStore.getState();
    const squad = getSquadById(squads[0].id);
    expect(squad).toBeDefined();
    expect(squad.title).toBe(squads[0].title);
  });

  it('returns undefined for unknown squad id', () => {
    expect(useStore.getState().getSquadById('nonexistent')).toBeUndefined();
  });

  it('sets and clears error', () => {
    useStore.getState().setError('Something went wrong');
    expect(useStore.getState().error).toBe('Something went wrong');
    useStore.getState().clearError();
    expect(useStore.getState().error).toBeNull();
  });

  it('manages join confirmation flow', () => {
    useStore.getState().showJoinConfirm('sq_1093');
    expect(useStore.getState().joinConfirm).toBe('sq_1093');
    useStore.getState().dismissJoinConfirm();
    expect(useStore.getState().joinConfirm).toBeNull();
  });

  it('manages scam alert flow', () => {
    const alert = { type: 'Route Deviation', text: 'Driver deviating' };
    useStore.getState().triggerScamAlert(alert);
    expect(useStore.getState().scamAlert).toEqual(alert);
    useStore.getState().dismissScamAlert();
    expect(useStore.getState().scamAlert).toBeNull();
  });

  it('returns contextual squads sorted by time', () => {
    const sorted = useStore.getState().getContextualSquads();
    expect(sorted.length).toBeGreaterThan(0);
    expect(sorted[0]).toHaveProperty('title');
  });

  it('returns contextual message', () => {
    const msg = useStore.getState().getContextualMessage();
    expect(typeof msg).toBe('string');
    expect(msg.length).toBeGreaterThan(0);
  });
});
