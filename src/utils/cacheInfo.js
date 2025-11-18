// src/utils/cacheInfo.js

/**
 * Get information about all caches including size
 * @returns {Promise<Array>} Array of cache information objects
 */
export const getCacheInfo = async () => {
  if (!('caches' in window)) {
    console.warn('Cache API not supported');
    return [];
  }

  try {
    const cacheNames = await caches.keys();
    const cacheInfoPromises = cacheNames.map(async (cacheName) => {
      const cache = await caches.open(cacheName);
      const keys = await cache.keys();
      
      // Calculate approximate cache size
      let totalSize = 0;
      const responsePromises = keys.map(async (request) => {
        try {
          const response = await cache.match(request);
          if (response) {
            const blob = await response.blob();
            return blob.size;
          }
          return 0;
        } catch (error) {
          console.error('Error getting response size:', error);
          return 0;
        }
      });

      const sizes = await Promise.all(responsePromises);
      totalSize = sizes.reduce((acc, size) => acc + size, 0);

      return {
        name: cacheName,
        entries: keys.length,
        size: totalSize,
        sizeFormatted: formatBytes(totalSize),
      };
    });

    return await Promise.all(cacheInfoPromises);
  } catch (error) {
    console.error('Error getting cache info:', error);
    return [];
  }
};

/**
 * Format bytes to human readable string
 * @param {number} bytes - Number of bytes
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted string
 */
export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Clear a specific cache by name
 * @param {string} cacheName - Name of the cache to clear
 * @returns {Promise<boolean>} True if cache was deleted
 */
export const clearCache = async (cacheName) => {
  if (!('caches' in window)) {
    console.warn('Cache API not supported');
    return false;
  }

  try {
    return await caches.delete(cacheName);
  } catch (error) {
    console.error('Error clearing cache:', error);
    return false;
  }
};

/**
 * Clear all caches
 * @returns {Promise<boolean>} True if all caches were deleted
 */
export const clearAllCaches = async () => {
  if (!('caches' in window)) {
    console.warn('Cache API not supported');
    return false;
  }

  try {
    const cacheNames = await caches.keys();
    const deletePromises = cacheNames.map(cacheName => caches.delete(cacheName));
    await Promise.all(deletePromises);
    return true;
  } catch (error) {
    console.error('Error clearing all caches:', error);
    return false;
  }
};

/**
 * Get cache info for a specific cache
 * @param {string} cacheName - Name of the cache
 * @returns {Promise<Object|null>} Cache information object or null
 */
export const getSpecificCacheInfo = async (cacheName) => {
  if (!('caches' in window)) {
    console.warn('Cache API not supported');
    return null;
  }

  try {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    
    let totalSize = 0;
    const entries = [];

    for (const request of keys) {
      try {
        const response = await cache.match(request);
        if (response) {
          const blob = await response.blob();
          const size = blob.size;
          totalSize += size;
          
          entries.push({
            url: request.url,
            size: size,
            sizeFormatted: formatBytes(size),
          });
        }
      } catch (error) {
        console.error('Error processing cache entry:', error);
      }
    }

    return {
      name: cacheName,
      totalEntries: keys.length,
      totalSize: totalSize,
      totalSizeFormatted: formatBytes(totalSize),
      entries: entries,
    };
  } catch (error) {
    console.error('Error getting specific cache info:', error);
    return null;
  }
};
