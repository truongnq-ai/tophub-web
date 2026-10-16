import { describe, it, expect } from 'vitest';
import vi from '../messages/vi.json';
import en from '../messages/en.json';

describe('i18n Translation Keys Parity', () => {
  it('should have matching top-level keys in VI and EN dictionaries', () => {
    const viKeys = Object.keys(vi).sort();
    const enKeys = Object.keys(en).sort();
    expect(viKeys).toEqual(enKeys);
  });

  it('should have required modules: Navigation, Common, Giftcodes, Pricing, Dashboard, Guides', () => {
    expect(vi).toHaveProperty('Navigation');
    expect(vi).toHaveProperty('Common');
    expect(vi).toHaveProperty('Giftcodes');
    expect(vi).toHaveProperty('Pricing');
    expect(vi).toHaveProperty('Dashboard');
    expect(vi).toHaveProperty('Guides');

    expect(en).toHaveProperty('Navigation');
    expect(en).toHaveProperty('Common');
    expect(en).toHaveProperty('Giftcodes');
    expect(en).toHaveProperty('Pricing');
    expect(en).toHaveProperty('Dashboard');
    expect(en).toHaveProperty('Guides');
  });

  it('should have matching sub-keys for Navigation including guides', () => {
    expect(vi.Navigation).toHaveProperty('guides');
    expect(en.Navigation).toHaveProperty('guides');
    expect(Object.keys(vi.Navigation).sort()).toEqual(Object.keys(en.Navigation).sort());
  });

  it('should have matching sub-keys for Guides namespace', () => {
    expect(Object.keys((vi as Record<string, Record<string, unknown>>).Guides || {}).length).toBeGreaterThan(0);
    expect(
      Object.keys((vi as Record<string, Record<string, unknown>>).Guides || {}).sort()
    ).toEqual(
      Object.keys((en as Record<string, Record<string, unknown>>).Guides || {}).sort()
    );
  });

  it('should have matching sub-keys for Home.activeCodes including viewArchive', () => {
    expect(vi.Home.activeCodes).toHaveProperty('viewArchive');
    expect(en.Home.activeCodes).toHaveProperty('viewArchive');
    expect(Object.keys(vi.Home.activeCodes).sort()).toEqual(Object.keys(en.Home.activeCodes).sort());
  });

  it('should have matching sub-keys for Common', () => {
    expect(Object.keys(vi.Common).sort()).toEqual(Object.keys(en.Common).sort());
  });
});
