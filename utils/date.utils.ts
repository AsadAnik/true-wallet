import { nanoid } from 'nanoid';

/**
 * Helper to get date string YYYY-MM-DD
 * @param daysOffset
 */
// region Get Date String
export const getDateString = (daysOffset = 0) => {
    const date = new Date();
    date.setDate(date.getDate() - daysOffset);
    return date.toISOString().split('T')[0];
};

/**
 * Generate Unique ID for database records
 */
// region Generate ID
export const generateId = (): string => {
  return nanoid();
};

/**
 * Format date for database
 * @param date
 */
// region Format Date
export const formatDate = (date: Date | string): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

/**
 * Format date for display
 * @param date
 */
// region Format Date for Display
export const formatDateForDisplay = (date: Date | string): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};