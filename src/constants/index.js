export const INITIAL_LOCATION = "Most Recommended Videos Globally";
export const CLICKED_LOCATION = "Most Recommended Videos in ";
export const SEARCH = "SEARCH RESULTS FOR ";
export const VIDEOS_REQUESTED = 30;
const now = new Date();
export const INITIAL_DATES = [
  new Date(now.getFullYear(), now.getMonth(), now.getDate() - 14),
  new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999),
];
