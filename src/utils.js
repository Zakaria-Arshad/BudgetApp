// This code initializes a currency formatter using the Intl.NumberFormat API.
// The formatter is assigned to the constant variable `currencyFormatter`.

export const currencyFormatter = new Intl.NumberFormat(undefined, {
    // The `currency` option is set to "usd" to format the number as US dollars.
    currency: "usd",
    
    // The `style` option is set to "currency" to format the number as a currency value.
    style: "currency",
    
    // The `minimumFractionDigits` option is set to 0 to remove decimal places from the formatted value.
    minimumFractionDigits: 0
});