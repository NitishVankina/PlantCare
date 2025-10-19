self.addEventListener('push', function(event) {
  let data = {};
  try { data = event.data.json(); } catch (e) { data = { title: 'PlantCare', body: 'You have a plant notification' }; }
  const title = data.title || 'PlantCare';
  const options = {
    body: data.body || '',
    data: data,
    tag: data.tag || 'plantcare'
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(clients.matchAll({ type: 'window' }).then(windowClients => {
    for (let client of windowClients) {
      if ('focus' in client) return client.focus();
    }
    if (clients.openWindow) return clients.openWindow('/');
  }));
});
