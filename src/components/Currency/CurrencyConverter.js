export const CurrencyConverter = (amount, from, to, rates) => {
  if (!rates[from] || !rates[to]) return amount;
  const baseAmount = amount / rates[from]; // Convert to base (USD)
  return baseAmount * rates[to]; // Convert to target
};
