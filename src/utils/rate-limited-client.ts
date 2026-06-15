import { WebDAVClient } from 'webdav'
import { apiLimiter } from './api-limiter'

export function createRateLimitedWebDAVClient(
	client: WebDAVClient,
): WebDAVClient {
	const rateLimitedClient = new Proxy(client, {
		get(target, prop, receiver) {
			const value = Reflect.get(target, prop, receiver) as unknown
			if (typeof value === 'function') {
				return (...args: unknown[]) => {
					return apiLimiter.schedule(() =>
						Promise.resolve(
							Reflect.apply(
								value as (...args: unknown[]) => unknown,
								target,
								args,
							),
						),
					)
				}
			}
			return value
		},
	})
	return rateLimitedClient
}