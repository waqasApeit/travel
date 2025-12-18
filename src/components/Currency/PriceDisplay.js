'use client'

import { CurrencyConverter } from './CurrencyConverter';
import { useCurrency } from '@/util/currency';
const PriceDisplay = ({ price, currency: originalCurrency, status }) => {
  const { currency, rates } = useCurrency();

  let displayPrice = price;
  let displayCurrency = originalCurrency;

  try {
    if (currency !== originalCurrency && rates[originalCurrency] && rates[currency]) {
      displayPrice = CurrencyConverter(price, originalCurrency, currency, rates).toFixed(2);
      displayCurrency = currency;
    }
  } catch (error) {
    console.warn("Currency conversion failed. Falling back to original.", error);
  }

  if (status === 'price') {
    return displayPrice
  } else {
    return `${displayCurrency} ${displayPrice} `
  }


}
export default PriceDisplay;

