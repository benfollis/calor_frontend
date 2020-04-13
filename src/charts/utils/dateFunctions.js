/**
 * Computes the start and end dates for
 * the number of days before now
 */
const dayMillis = 1000 * 3600 * 24;
export function startEndBeforeNow(days) {
    const end = new Date();
    const startStamp = end.getTime() - (days * dayMillis);
    const start = new Date(startStamp);
    return {
        start,
        end,
    };
}