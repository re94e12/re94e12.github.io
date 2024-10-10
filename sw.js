// nombre del cache
const CACHE_NAME = 'my-cache-v1';
nocache = ['mihost.com'];

// Instalar el service worker
self.addEventListener('install', (event)=>{
  event.waitUntil(caches.open(CACHE_NAME).then((cache)=>{
    console.log('Cache abierto');
  }));
});

// Activar el service worker
self.addEventListener('activate', (event)=>{
  event.waitUntil(caches.keys().then((cacheNames)=>{
    return Promise.all(cacheNames.map((name)=>{
      if (name !== CACHE_NAME) {
        return caches.delete(name);
      }
    }));
  }));
});

// Manejar las solicitudes de red
self.addEventListener('fetch', (event)=>{
  const url = new URL(event.request.url);

  if (url.origin === self.location.origin) {
    // Solicitudes del mismo origen
    event.respondWith(fetch(event.request).then((response)=>{
      // Clonar la respuesta porque solo puede ser leída una vez
      const responseClone = response.clone();
      // Guardar la respuesta en la caché
      caches.open(CACHE_NAME).then((cache)=>{
        cache.put(event.request, responseClone);
      });
      return response;
      // Retornar la respuesta original
    }).catch(()=>{
      // Si falla, buscar en la caché
      return caches.match(event.request);
    }));
  } else {
    // Solicitudes de otros orígenes
    event.respondWith(caches.match(event.request).then((cachedResponse)=>{
      return cachedResponse || fetch(event.request).then((response)=>{
        // Clonar la respuesta porque solo puede ser leída una vez
        const responseClone = response.clone();
        // Guardar la respuesta en la caché
        caches.open(CACHE_NAME).then((cache)=>{
          if (nocache.includes(url.hostname)) {
            console.log('no caché')
          } else {
            cache.put(event.request, responseClone);
          }
        });
        return response;
        // Retornar la respuesta original
      });
    }));
  }
});
