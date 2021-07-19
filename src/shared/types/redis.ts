export const clientName = 'redisClient';

export const configs = {
  name: clientName,
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT)
}