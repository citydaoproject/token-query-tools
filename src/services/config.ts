import dotenv from 'dotenv';

dotenv.config();

export const moralisServerUrl = process.env.MORALIS_SERVER_URL || '';
export const moralisApplicationId = process.env.MORALIS_APP_ID || '';
export const moralisRateLimitPerMinute = parseInt(process.env.MORALIS_LIMIT_PER_MINUTE || '28', 10);
export const moralisPageLimit = parseInt(process.env.MORALIS_PAGE_SIZE || '99', 10);

export const prettyJSONFiles = (process.env.PRETTY_JSON_FILES || 'false').toLowerCase() === 'true';
