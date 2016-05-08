// Consider using Moment.js instead, but it's a heavy depencency if we don't necessarily need it.

export const epochToDate = (epochTime) => {
  const date = new Date(epochTime * 1000);
  return `${date.getUTCMonth() + 1}-${date.getUTCDate()}-${date.getUTCFullYear()}`;
};
