// Name and Version Cache
const CACHE_NAME  = 'v1_cache_dale_q_va_pwa',
      urlsToCache = [
            '../../',
            'https://cdn.jsdelivr.net/npm/boxicons@2.0.5/css/boxicons.min.css',
            '../../css/styles.css',
            '../index.js',
            './service.js',
            '../../images/logo_rojo.png',
            '../../images/logo_rojo_1024.png',
            '../../images/logo_rojo_512.png',
            '../../images/logo_rojo_384.png',
            '../../images/logo_rojo_256.png',
            '../../images/logo_rojo_192.png',
            '../../images/logo_rojo_128.png',
            '../../images/logo_rojo_96.png',
            '../../images/logo_rojo_64.png',
            '../../images/logo_rojo_32.png',
            '../../images/favicon.png',
            '../../images/icons/menu.svg',
            '../../images/icons/closed.svg',
            '../../images/dqv.jpg',
            '../../images/david.png',
            '../../images/neno.png'
        ] 

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
    e.waitUntil(
    caches.open(CACHE_NAME)
        .then(cache => {
        return cache.addAll(urlsToCache)
            .then(() => self.skipWaiting())
        })
        .catch(err => console.log('Falló registro de cache', err))
    )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME]

    e.waitUntil(
    caches.keys()
        .then(cacheNames => {
        return Promise.all(
            cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
                return caches.delete(cacheName)
            }
            })
        )
        })
        // Le indica al SW activar el cache actual
        .then(() => self.clients.claim())
    )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
    //Responder ya sea con el objeto en caché o continuar y buscar la url real
    e.respondWith(
    caches.match(e.request)
        .then(res => {
        if (res) {
            //recuperar del cache
            return res
        }
        //recuperar de la petición a la url
        return fetch(e.request)
        })
    )
})