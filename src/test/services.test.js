import { describe, it, expect } from 'vitest';
import { GeoPulse } from '../services/geoPulseService';
import { IdentityService } from '../services/identityService';
import { YaartriAgent } from '../agents/YaartriAgent';

describe('GeoPulse', () => {
  it('fetches safe hubs for Varanasi', async () => {
    const hubs = await GeoPulse.getSafeHubsForCity('Varanasi');
    expect(hubs.length).toBeGreaterThan(0);
    expect(hubs[0]).toHaveProperty('coordinates');
    expect(hubs[0]).toHaveProperty('name');
  });

  it('returns empty for unknown city', async () => {
    const hubs = await GeoPulse.getSafeHubsForCity('Nonexistent');
    expect(hubs).toEqual([]);
  });

  it('calculates distance between coordinates', () => {
    const d = GeoPulse.calculateDistance(
      { lat: 25.3060, lng: 83.0100 },
      { lat: 25.3082, lng: 83.0076 }
    );
    expect(d).toBeGreaterThan(0);
    expect(d).toBeLessThan(1000);
  });

  it('checks if point is within hub zone', () => {
    const hub = {
      coordinates: { lat: 25.3060, lng: 83.0100 },
      radiusMeters: 500
    };
    const result = GeoPulse.isWithin({ lat: 25.3062, lng: 83.0102 }, hub);
    expect(result.inZone).toBe(true);
  });
});

describe('IdentityService', () => {
  it('rejects invalid aadhaar numbers', async () => {
    await expect(IdentityService.requestAadhaarOTP('123')).rejects.toThrow('Invalid Aadhaar Number Format');
  });

  it('sends OTP for valid aadhaar', async () => {
    const result = await IdentityService.requestAadhaarOTP('123456789012');
    expect(result.status).toBe('OTP_SENT');
    expect(result.tx_id).toBeTruthy();
  });

  it('verifies correct OTP', async () => {
    const result = await IdentityService.verifyOTP('tx_123', '1234');
    expect(result.status).toBe('VERIFIED');
    expect(result.aadhaar_hash).toBeTruthy();
  });

  it('rejects wrong OTP', async () => {
    await expect(IdentityService.verifyOTP('tx_123', '0000')).rejects.toThrow('OTP Verification Failed');
  });
});

describe('YaartriAgent', () => {
  it('starts inactive', () => {
    const agent = new YaartriAgent('user_001');
    expect(agent.isActive).toBe(false);
  });

  it('activates radar', () => {
    const agent = new YaartriAgent('user_001');
    agent.activateRadar();
    expect(agent.isActive).toBe(true);
  });

  it('detects commission trap keywords', () => {
    const agent = new YaartriAgent('user_001');
    agent.activateRadar();
    const result = agent.analyzeSentiment('Let me take you to my uncle factory for cheap gems');
    expect(result.alert).toBe(true);
  });

  it('passes clean messages', () => {
    const agent = new YaartriAgent('user_001');
    agent.activateRadar();
    const result = agent.analyzeSentiment('Let us visit the temple together');
    expect(result).toBeUndefined();
  });
});
