/**
 * @description This file contains constants used throughout the add-expense feature.
 * Centralizing constants makes them easier to manage and update.
 */

// Step definitions for the wizard flow
export const EXPENSE_STEPS = ['note', 'card', 'date', 'amount', 'details'];
// For income, 'details' (Category) is now the first step.
export const INCOME_STEPS = ['details', 'amount', 'date', 'card', 'note'];

// Initial state for the form data
export const initialFormData = {
  note: '',
  card: null,
  date: new Date().toISOString().split('T')[0],
  amount: '',
  currency: { code: 'BDT', symbol: '৳' },
  icon: 'shopping-cart',
  color: '#FF9800',
  category: null,
};

// User-facing descriptions for each step of the wizard, now with more detail.
export const STEP_DESCRIPTIONS = {
  note: 'Start by giving your transaction a clear name, like "Dinner with friends" or "Monthly Salary". A good description is key to understanding your spending habits and makes searching for transactions much easier.',
  card: 'Select the credit card or bank account you used. Linking transactions to a specific account helps you see where your money is going and makes reconciling your statements simple.',
  date: 'Pick the exact date the transaction occurred. You can select a past or future date. It defaults to today for convenience. Accurate dates are crucial for generating precise monthly or yearly reports.',
  amount: 'Enter the total amount for this transaction. You can change the currency by tapping the currency symbol on the left. Be sure to enter the full amount without any commas.',
  details: 'Choose a category and a color to visually represent your transaction. This makes it easy to identify spending patterns at a glance in your dashboard and reports. A good icon helps you instantly recognize the transaction type.',
};
