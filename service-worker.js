// service-worker.js

const CACHE_NAME = 'PLUG';
const urlsToCache = [
  '/',
];

// Install the service worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate the service worker
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event listener
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // If cached content is available, return it
        if (response) {
          return response;
        }

        // If not, fetch the requested resource from the network
        return fetch(event.request)
          .then(function(networkResponse) {
            // Check if the fetch was successful
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }

            // Clone the response to put in the cache
            let responseToCache = networkResponse.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return networkResponse;
          })
          .catch(function() {
            // If fetching fails, return a cached response if available
            return caches.match(event.request);
          });
      })
  );
});

// Prompt the user to install the app if not already installed
self.addEventListener('beforeinstallprompt', function(event) {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  event.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = event;
  // Check if the app is already installed
  if (!window.matchMedia('(display-mode: standalone)').matches) {
    // Update UI to notify the user they can add to home screen
    showInstallPromotion();
  }
});

function showInstallPromotion() {
  // Display a button or other UI element to notify the user they can install the PWA
  // For example:
  const installButton = document.createElement('button');
  installButton.textContent = 'Install App';
  installButton.addEventListener('click', function() {
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      // Clear the deferred prompt variable
      deferredPrompt = null;
    });
  });
  // Add the install button to the page
  document.body.appendChild(installButton);
}