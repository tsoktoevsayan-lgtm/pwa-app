// sw.js

const CACHE_NAME = 'pwa-test-cache-v1';
const CACHE_ASSETS = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/manifest.json',
    '/images/icon-192.png',
    '/images/icon-512.png'
];

// Событие УСТАНОВКИ: кэшируем все необходимые файлы
self.addEventListener('install', (event) => {
    console.log('SW: Event installed');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('SW: Caching all assets');
                return cache.addAll(CACHE_ASSETS);
            })
            .then(() => self.skipWaiting()) // Активируем сразу
    );
});

// Событие АКТИВАЦИИ: чистим старые кэши
self.addEventListener('activate', (event) => {
    console.log('SW: Event activated');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('SW: Clearing old cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Событие FETCH: перехватываем запросы и отдаем из кэша
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
