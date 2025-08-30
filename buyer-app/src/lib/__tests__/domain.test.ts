import { describe, it, expect } from 'vitest';
import { calcSubtotal, decStock, avg } from '../domain';

describe('domain utils', () => {
  it('calcSubtotal', () => { expect(calcSubtotal(1500, 5)).toBe(7500); });
  it('decStock ok', () => { expect(decStock(10, 3)).toBe(7); });
  it('decStock insufficient', () => { expect(() => decStock(2, 5)).toThrow(); });
  it('avg', () => { expect(avg([180,175])).toBe(177.5); });
});
