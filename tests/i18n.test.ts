import { describe, it, expect } from 'vitest';
import vi from '../messages/vi.json';
import en from '../messages/en.json';

describe('i18n Translation Keys Parity', () => {
  it('should have matching top-level keys in VI and EN dictionaries', () => {
    const viKeys = Object.keys(vi).sort();
    const enKeys = Object.keys(en).sort();
    expect(viKeys).toEqual(enKeys);
  });

  it('should have required modules: Navigation, Common, Giftcodes, Pricing, Dashboard', () => {
    expect(vi).toHaveProperty('Navigation');
    expect(vi).toHaveProperty('Common');
    expect(vi).toHaveProperty('Giftcodes');
    expect(vi).toHaveProperty('Pricing');
    expect(vi).toHaveProperty('Dashboard');

    expect(en).toHaveProperty('Navigation');
    expect(en).toHaveProperty('Common');
    expect(en).toHaveProperty('Giftcodes');
    expect(en).toHaveProperty('Pricing');
    expect(en).toHaveProperty('Dashboard');
  });

  it('should have matching sub-keys for Navigation', () => {
    expect(Object.keys(vi.Navigation).sort()).toEqual(Object.keys(en.Navigation).sort());
  });

  it('should have matching sub-keys for Common', () => {
    expect(Object.keys(vi.Common).sort()).toEqual(Object.keys(en.Common).sort());
  });
});
