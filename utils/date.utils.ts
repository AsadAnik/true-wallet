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