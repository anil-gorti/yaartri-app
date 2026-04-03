/**
 * GeoPulse Service Core
 * Manages Geofences, Safe-Hub boundaries, and real-time squad tracking.
 */

// Simulated Mock Data for Varanasi and Udaipur phase 1 hubs
const SARTHI_SAFE_HUBS = [
  {
    id: "hub_varanasi_01",
    city: "Varanasi",
    name: "Dashashwamedh Ghat Sarthi Zone",
    category: "Verified_Monument",
    coordinates: { lat: 25.3060, lng: 83.0100 },
    radiusMeters: 500, // Valid 500m geofence 
    is_active: true
  },
  {
    id: "hub_varanasi_cafe1",
    city: "Varanasi",
    name: "Brown Bread Bakery (Sarthi Certified Table)",
    category: "Verified_Cafe",
    coordinates: { lat: 25.3082, lng: 83.0076 },
    radiusMeters: 50,
    is_active: true
  },
  {
    id: "hub_udaipur_01",
    city: "Udaipur",
    name: "City Palace Group Entry Gate",
    category: "Verified_Monument",
    coordinates: { lat: 24.5764, lng: 73.6835 },
    radiusMeters: 300,
    is_active: true
  }
];

export class GeoPulse {
  
  /**
   * Retrieves all active Sarthi-Certified Safe-Hubs in a specific city
   * @param {string} city 
   */
  static async getSafeHubsForCity(city) {
    console.log(`[GeoPulse] Fetching Safe-Hubs for ${city}...`);
    // Simulated DB query latency
    await new Promise(resolve => setTimeout(resolve, 300));
    return SARTHI_SAFE_HUBS.filter(hub => hub.city.toLowerCase() === city.toLowerCase() && hub.is_active);
  }

  /**
   * Haversine formula to calculate true distance between coordinates in meters
   */
  static calculateDistance(coord1, coord2) {
    const R = 6371e3; // Earth radius in meters
    const phi1 = coord1.lat * (Math.PI/180);
    const phi2 = coord2.lat * (Math.PI/180);
    const deltaPhi = (coord2.lat - coord1.lat) * (Math.PI/180);
    const deltaLambda = (coord2.lng - coord1.lng) * (Math.PI/180);

    const a = Math.sin(deltaPhi/2) * Math.sin(deltaPhi/2) +
              Math.cos(phi1) * Math.cos(phi2) *
              Math.sin(deltaLambda/2) * Math.sin(deltaLambda/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; 
  }

  /**
   * Checks if a user's coordinate is inside a chosen Geofence
   */
  static isWithin(userCoords, hub, bufferMeters = 0) {
    const distance = this.calculateDistance(userCoords, hub.coordinates);
    const inZone = distance <= (hub.radiusMeters + bufferMeters);
    return {
      inZone,
      distanceFromCenter: Math.round(distance)
    };
  }

  /**
   * The "Squad Ghosting & Scam Deviation" Monitor
   * Continuously checks a group's location against the active activity zone.
   */
  static monitorGroupState(groupId, safeZoneHub, membersLocations) {
    console.log(`[GeoPulse Engine] Sweeping Zone: ${safeZoneHub.name} against Group ID: ${groupId}`);
    
    let anomalies = [];
    
    // Analyze every member of the squad
    for (const [userId, coords] of Object.entries(membersLocations)) {
      const check = this.isWithin(coords, safeZoneHub);
      if (!check.inZone) {
        anomalies.push({
          userId,
          issue: "GEOFENCE_BREACH",
          distanceOff: check.distanceFromCenter - safeZoneHub.radiusMeters
        });
      }
    }
    
    // If anomalies exist, return to the Agent to trigger Scam Warnings or Ghosting Penalties
    if (anomalies.length > 0) {
      console.warn(`[GeoPulse Alert] ${anomalies.length} members detected outside the Safe-Hub boundary.`);
      return { 
        status: "BREACH", 
        data: anomalies 
      };
    }
    
    return { status: "SECURE" };
  }
}
