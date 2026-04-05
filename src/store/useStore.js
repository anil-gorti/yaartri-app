import { create } from 'zustand';
import { GeoPulse } from '../services/geoPulseService';
import { IdentityService } from '../services/identityService';
import { YaartriAgent } from '../agents/YaartriAgent';

const MOCK_SQUADS = [
  {
    id: "sq_1093",
    title: "Dashashwamedh Aarti Boat",
    location: "Varanasi Ghats",
    coords: { lat: 25.3060, lng: 83.0100 },
    time: "Today, 17:00",
    timeHint: 17,
    cost: "Split-Pay",
    members: [
      { initials: "RS", name: "Rahul S.", verified: true },
      { initials: "PM", name: "Priya M.", verified: true },
      { initials: "AK", name: "Amit K.", verified: true }
    ],
    verifiedCount: 3,
    description: "Evening aarti viewing from the river. We'll take a shared boat from Dashashwamedh Ghat. Cost split equally via UPI.",
    activityType: "Boat_Share",
    hubId: "hub_varanasi_01",
    status: "Forming"
  },
  {
    id: "sq_1094",
    title: "Kashi Vishwanath Corridor Walk",
    location: "Gate 4 Entrance",
    coords: { lat: 25.3109, lng: 83.0107 },
    time: "Tomorrow, 06:00",
    timeHint: 6,
    cost: "Free",
    members: [
      { initials: "SM", name: "Sneha M.", verified: true }
    ],
    verifiedCount: 1,
    description: "Early morning walk through the newly built corridor. Peaceful before the crowds arrive. Meet at Gate 4.",
    activityType: "Monument_Walk",
    hubId: "hub_varanasi_01",
    status: "Forming"
  },
  {
    id: "sq_1095",
    title: "Lassi & Street Food Circuit",
    location: "Blue Lassi Shop, Kachori Gali",
    coords: { lat: 25.3082, lng: 83.0076 },
    time: "Today, 11:00",
    timeHint: 11,
    cost: "Split-Pay",
    members: [
      { initials: "VR", name: "Vikram R.", verified: true },
      { initials: "NK", name: "Neha K.", verified: true }
    ],
    verifiedCount: 2,
    description: "Curated food walk covering iconic street food spots. Blue Lassi, Kachori Gali, and Baati Chokha.",
    activityType: "Cafe_Meet",
    hubId: "hub_varanasi_cafe1",
    status: "Forming"
  }
];

const MOCK_ACTIVITY = [
  { id: 1, text: "Priya M. joined Evening Aarti Squad", time: "2m ago" },
  { id: 2, text: "New Safe-Hub verified: Brown Bread Bakery", time: "5m ago" },
  { id: 3, text: "3 squads active within 2km of you", time: "8m ago" },
  { id: 4, text: "Rahul S. completed Ghat Walk -- 5-star vibe check", time: "12m ago" },
  { id: 5, text: "Vikram R. proposed Lassi & Street Food Circuit", time: "18m ago" },
];

export const useStore = create((set, get) => ({
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

  squads: MOCK_SQUADS,
  safeHubs: [],
  currentCity: "Varanasi",
  isLoading: false,
  error: null,
  agent: null,

  activityFeed: MOCK_ACTIVITY,
  scamAlert: null,
  joinConfirm: null,

  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),

  showJoinConfirm: (squadId) => set({ joinConfirm: squadId }),
  dismissJoinConfirm: () => set({ joinConfirm: null }),

  triggerScamAlert: (alert) => set({ scamAlert: alert }),
  dismissScamAlert: () => set({ scamAlert: null }),

  verifyIdentity: async (aadhaarNumber, otp) => {
    set({ isLoading: true, error: null });
    try {
      const otpResult = await IdentityService.requestAadhaarOTP(aadhaarNumber);
      const verification = await IdentityService.verifyOTP(otpResult.tx_id, otp);
      await IdentityService.bindIdentityToUser(get().user.id, verification.aadhaar_hash);
      set((state) => ({
        user: { ...state.user, verified: true },
        isLoading: false
      }));
      return true;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      return false;
    }
  },

  fetchSafeHubs: async (city) => {
    set({ isLoading: true });
    try {
      const hubs = await GeoPulse.getSafeHubsForCity(city || get().currentCity);
      set({ safeHubs: hubs, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  initAgent: () => {
    const agent = new YaartriAgent(get().user.id);
    agent.activateRadar();
    set({ agent });
  },

  joinSquad: (squadId) => {
    set((state) => ({
      joinConfirm: null,
      user: {
        ...state.user,
        joinedSquads: [...state.user.joinedSquads, squadId]
      },
      squads: state.squads.map(sq =>
        sq.id === squadId
          ? {
              ...sq,
              members: [...sq.members, { initials: state.user.name.slice(0, 2).toUpperCase(), name: state.user.name, verified: state.user.verified }],
              verifiedCount: sq.verifiedCount + (state.user.verified ? 1 : 0)
            }
          : sq
      ),
      activityFeed: [
        { id: Date.now(), text: `${state.user.name} joined ${state.squads.find(s => s.id === squadId)?.title}`, time: "just now" },
        ...state.activityFeed
      ]
    }));
  },

  createSquad: (squad) => {
    const newSquad = {
      ...squad,
      id: `sq_${Date.now()}`,
      coords: squad.coords || { lat: 25.3060, lng: 83.0100 },
      members: [{ initials: get().user.name.slice(0, 2).toUpperCase(), name: get().user.name, verified: get().user.verified }],
      verifiedCount: get().user.verified ? 1 : 0,
      status: "Forming"
    };
    set((state) => ({
      squads: [newSquad, ...state.squads],
      activityFeed: [
        { id: Date.now(), text: `${state.user.name} proposed ${newSquad.title}`, time: "just now" },
        ...state.activityFeed
      ]
    }));
    return newSquad.id;
  },

  getSquadById: (id) => get().squads.find(sq => sq.id === id),

  getContextualSquads: () => {
    const hour = new Date().getHours();
    const squads = [...get().squads];
    return squads.sort((a, b) => {
      const aDiff = Math.abs((a.timeHint || 12) - hour);
      const bDiff = Math.abs((b.timeHint || 12) - hour);
      return aDiff - bDiff;
    });
  },

  getContextualMessage: () => {
    const hour = new Date().getHours();
    const count = get().squads.filter(s => s.status === 'Forming').length;
    if (hour >= 5 && hour < 8) return `${count} early morning squads forming near the ghats`;
    if (hour >= 8 && hour < 12) return `${count} squads active -- perfect time for a food walk`;
    if (hour >= 12 && hour < 16) return `${count} afternoon squads -- beat the heat together`;
    if (hour >= 16 && hour < 19) return `Evening aarti approaching -- ${count} squads forming`;
    if (hour >= 19 && hour < 22) return `${count} squads active in the night market circuit`;
    return `${count} squads in the network -- explore safely`;
  }
}));
