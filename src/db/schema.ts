/**
 * Yaartri Core Database Schema definition
 * Leveraging high-trust fields for the Aadhaar-backed Identity Foundation.
 */

export const Schema = {
  // The core user entity, inextricably linked to an Aadhaar verification event.
  Yaartri_User: {
    id: "UUID",
    phone_number: "String",
    is_aadhaar_verified: "Boolean", // The "Asli" Rule
    aadhaar_hash: "String", // Zero-knowledge proof hash of identity
    name: "String",
    gender: "String", // Used for Sarthi to run Safe-Hub logic
    dob: "Date",
    yaar_score: "Float", // Starts at 100
    punctuality_streak: "Integer",
    created_at: "Timestamp",
    last_known_location: "JSON", // { lat, lng, timestamp }
  },

  // The Trust graph recording peer feedback
  Vibe_Check: {
    id: "UUID",
    assessor_id: "UUID",
    subject_id: "UUID",
    activity_id: "UUID",
    is_reliable: "Boolean",
    is_safe: "Boolean",
    is_platonic: "Boolean",
    timestamp: "Timestamp",
  },

  // Physical locations that hold high-trust weight
  Sarthi_Safe_Hub: {
    id: "UUID",
    name: "String",
    category: "String", // 'Govt_Emporium', 'Verified_Cafe', 'Transport_Hub'
    location: "JSON", // { lat, lng }
    safety_rating: "Float",
    is_active: "Boolean"
  },

  // The Agentic Squad construct
  Travel_Squad: {
    id: "UUID",
    hub_id: "UUID",
    status: "String", // 'Forming', 'Active', 'Dispersed'
    activity_type: "String", // 'Boat_Share', 'Monument_Walk', 'Cafe_Meet'
    members: ["UUID"],
    created_at: "Timestamp",
    geofence_id: "UUID", // The boundary constraint
  }
};
