// Service worker: rende l'app disponibile anche senza internet.
// Quando aggiorni i file, cambia il numero di versione qui sotto.
const CACHE = 'caffe-v1';
const FILES = [
  './',
  'index.html',
  'manifest.webmanifest',
  'icons/apple-touch-icon.png',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'img/figA.png',
  'img/figB.png',
  'img/figC.png',
  'img/figD.png',
  'img/fig1.png',
  'img/fig2.png',
  'img/fig3.png',
  'img/fig4.png',
  'img/fig5.png',
  'img/fig6.png',
  'img/fig7.png',
  'img/fig8.png',
  'img/fig9.png',
  'img/fig10.png',
  'img/fig11.png',
  'img/fig12.png',
  'img/fig13.png',
  'img/fig14.png',
  'img/fig15.png',
  'img/fig16.png',
  'img/fig17.png',
  'img/fig18.png',
  'img/fig19.png',
  'img/fig20.png',
  'img/fig21.png',
  'img/fig22.png',
  'img/fig23.png',
  'img/fig24.png',
  'img/fig25.png',
  'img/fig26.png',
  'img/fig27.png',
  'img/fig28.png',
  'img/fig29.png',
  'img/fig30.png',
  'img/fig31.png',
  'img/fig32.png',
  'img/fig33.png',
  'img/fig34.png',
  'img/fig35.png',
  'img/fig36.png',
  'img/fig37.png',
  'img/fig38.png',
  'img/fig39.png',
  'img/fig40.png',
  'img/fig41.png',
  'img/fig42.png',
  'img/fig43.png',
  'img/fig44.png',
  'img/fig45.png',
  'img/fig46.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(hit => hit || fetch(e.request).then(res => {
      if (res.ok && new URL(e.request.url).origin === location.origin) {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
      }
      return res;
    }).catch(() => caches.match('index.html')))
  );
});