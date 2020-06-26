const cacheName = 'v1';
 


self.addEventListener('install', (e) => {
    console.log('installed');
})

self.addEventListener('activate', (e) => {
    console.log('activated');
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheNames) {
                        console.log('Clearing old cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
})

self.addEventListener('fetch', (e) => {
    e.respondWith(
        fetch(e.request)
            .then((res) => {
                //make copy of response
                const resClone = res.clone();

                caches
                    .open(cacheName)
                    .then((cache) => {
                        cache.put(e.request, resClone);
                    });
                return res;
            }).catch(err => caches.match(e.request).then(res => res))
    )
})