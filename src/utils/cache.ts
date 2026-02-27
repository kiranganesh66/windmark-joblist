const cache = new Map<string, unknown>()

export const getCache = (key: string) => cache.get(key)

export const setCache = (key: string, value: unknown) => {
  cache.set(key, value)
}