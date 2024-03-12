const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
    'index.html',
    'artstages.html',
    'paises.html',
    'artistas.thml',
    'contacto.html',
    'login.html',
    'imagenes/artgalery.jpg',
    'imagenes/boroqueart.jpeg',
    'imagenes/calsicalart.jpg',
    'imagenes/españa.jpg',
    'imagenes/estados-unidos.jpg',
    'imagenes/francia.jpg',
    'imagenes/frida-photo.jpg',
    'imagenes/italia.jpg',
    'imagenes/leonardo.jpg',
    'imagenes/Michelangelo.jpg',
    'imagenes/modernart.jpg',
    'imagenes/pablo.jpg',
    'imagenes/pais4.jpg',
    'imagenes/prehistoricart.jpg',
    'imagenes/reinassentart.jpg',
    'imagenes/vincent.jpg',
    
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});
self.addEventListener('DOMContentLoaded', () => {
    const messageElement = document.getElementById('message');

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then((registration) => {
                console.log('Service Worker registrado con éxito:', registration);
            })
            .catch((error) => {
                console.error('Error al registrar el Service Worker:', error);
            });
    }

    // Actualizar el mensaje después de cargar el Service Worker
    if (navigator.serviceWorker.controller) {
        messageElement.textContent = 'Service Worker listo para cachear contenido.';
    } else {
        messageElement.textContent = 'La aplicación puede no funcionar correctamente sin conexión.';
    }
});

