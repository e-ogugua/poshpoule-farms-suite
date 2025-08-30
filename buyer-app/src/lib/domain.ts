export function calcSubtotal(unitPrice: number, qty: number) { return unitPrice * qty; }
export function decStock(stock: number, qty: number) { if (qty > stock) throw new Error('Insufficient'); return stock - qty; }
export function avg(array: number[]) { return array.length ? array.reduce((a,b)=>a+b,0)/array.length : 0; }
