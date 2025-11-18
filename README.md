# Resep Nusantara - PWA with Recipe Caching

A Progressive Web App (PWA) for Indonesian recipe collection with advanced caching capabilities.

## Features

- 📱 **Progressive Web App**: Works offline and can be installed on mobile devices
- 🚀 **Smart Caching**: Automatically caches recipe images and API data
- 💾 **Cache Monitoring**: View cache size and manage cached data from Profile page
- 🖼️ **Image Optimization**: External images cached with disk cache for faster loading

## Caching Implementation

This application implements two types of runtime caching strategies using Workbox:

### 1. Recipe Images Cache (`recipe-images-cache`)
- **Strategy**: CacheFirst
- **Purpose**: Caches images from external sources (Unsplash, etc.)
- **Configuration**:
  - Max Entries: 60 images
  - Max Age: 30 days
  - Cache Name: `recipe-images-cache`
- **Benefit**: Images load instantly from cache after first view, reducing network usage

### 2. Recipe Data Cache (`recipe-data-cache`)
- **Strategy**: NetworkFirst
- **Purpose**: Caches API responses for recipe data
- **Configuration**:
  - Max Entries: 50 items
  - Max Age: 24 hours
  - Network Timeout: 10 seconds
  - Cache Name: `recipe-data-cache`
- **Benefit**: Falls back to cached data when network is slow or offline

## Cache Management

Users can view and manage caches from the **Profile Page**:
- View cache sizes in human-readable format (KB, MB)
- See number of cached items per cache
- Clear individual caches
- Monitor total cache storage usage

## Technical Stack

- **React** - UI Framework
- **Vite** - Build tool with HMR
- **Workbox** - Service Worker and caching strategies
- **Tailwind CSS** - Styling
- **vite-plugin-pwa** - PWA generation and service worker management

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Cache Verification

To verify caching is working:

1. Open DevTools → Application → Cache Storage
2. Look for `recipe-images-cache` and `recipe-data-cache`
3. Browse recipes and images to populate caches
4. Check the Profile page to see cache sizes
5. Go offline and verify images/data still load from cache
