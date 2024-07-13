import { CollectionCache } from './collection-cache-manager.models';
import { COLLECTION_CACHE_INITIAL_STATE } from './collection-cache-manager.state';

export class CollectionCacheManager {
  private readonly storageKey = 'collection';

  getCacheData(): CollectionCache {
    const data = localStorage.getItem(this.storageKey);

    if (!data) {
      this.put(COLLECTION_CACHE_INITIAL_STATE);

      return COLLECTION_CACHE_INITIAL_STATE;
    }

    return JSON.parse(data);
  }

  put(cacheData: CollectionCache): void {
    localStorage.setItem(this.storageKey, JSON.stringify(cacheData));
  }
}
