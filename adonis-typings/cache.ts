declare module '@ioc:Adonis/Addons/Adonis5-Cache' {
	type CacheSerializer = <T = any>(value: T) => string
	type CacheDeserializer = <T = any>(value: string) => T

	export interface CacheContextContract {
		serialize: CacheSerializer

		deserialize: CacheDeserializer
	}

	export interface CacheStorageContract {
		get<T = any>(context: CacheContextContract, key: string): Promise<T | null>

		getMany<T = any>(context: CacheContextContract, keys: string[]): Promise<(T | null)[]>

		put<T = any>(context: CacheContextContract, key: string, value: T, ttl: number): Promise<void>

		putMany<T = any>(
			context: CacheContextContract,
			cacheDictionary: { [key: string]: T },
			ttl: number
		): Promise<void>

		flush(): Promise<void>

		forget(key: string): Promise<boolean>
	}

	export interface TaggableStorageContract {
		addTag(tag: string, tagData: string): Promise<void>

		readTag(tag: string): Promise<string[]>

		removeTag(tag: string): Promise<void>
	}

	export interface TaggableCacheStorage {
		addTag(tag: string, tagData: string)

		readTag(tag: string): Promise<string[]>

		removeTag(tag: string): Promise<void>
	}

	export interface BaseCacheManagerContract {
		get<T = any>(key: string): Promise<T | null>

		getMany<T = any>(keys: string[]): Promise<(T | null)[]>

		put<T = any>(key: string, value: T, ttl?: number): Promise<void>

		putMany<T = any>(cacheDictionary: { [key: string]: T }, ttl?: number): Promise<void>

		flush(): Promise<void>

		forget(key: string): Promise<boolean>
	}

	export interface CacheManagerContract extends BaseCacheManagerContract {
		recordTTL: number

		storage: CacheStorageContract

		viaContext(contextName: string): CacheManagerContract

		viaStorage(storageName: string): CacheManagerContract

		enableStorage(storageName: string): CacheManagerContract

		enableContext(contextName: string): CacheManagerContract

		registerStorage(storageName: string, storage: CacheStorageContract): CacheManagerContract

		registerContext(contextName: string, storage: CacheContextContract): CacheManagerContract

		tags(...tags: string[]): TaggableCacheManagerContract
	}

	export type TaggableCacheManagerContract = Pick<
		BaseCacheManagerContract,
		'put' | 'putMany' | 'flush'
	> & { tags: string[] }

	export type CacheStorage = 'redis' | 'in-memory' | string

	export interface TagPayloadContract {
		expirationTime: string
		keys: string[]
	}

	const CacheManager: CacheManagerContract

	export default CacheManager
}