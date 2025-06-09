import { ref, computed } from 'vue'

const currentCurrency = ref(localStorage.getItem('currency') || 'EUR')

const currencies = {
  EUR: { symbol: '€', rate: 1, name: 'Euro' },
  USD: { symbol: '$', rate: 1.09, name: 'US Dollar' },
  GBP: { symbol: '£', rate: 0.87, name: 'British Pound' },
}

export function useCurrency() {
  const setCurrency = (currency) => {
    currentCurrency.value = currency
    localStorage.setItem('currency', currency)
  }

  const formatPrice = (price) => {
    const currency = currencies[currentCurrency.value]
    const convertedPrice = (price * currency.rate).toFixed(2)
    return `${convertedPrice}${currency.symbol}`
  }

  const getCurrencySymbol = computed(() => currencies[currentCurrency.value].symbol)
  const getCurrencyName = computed(() => currencies[currentCurrency.value].name)

  return {
    currentCurrency: computed(() => currentCurrency.value),
    currencies,
    setCurrency,
    formatPrice,
    getCurrencySymbol,
    getCurrencyName,
  }
}
