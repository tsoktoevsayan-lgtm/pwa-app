// app.js

// Проверяем поддержку Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(registration => {
            console.log('Service Worker зарегистрирован успешно:', registration.scope);
        })
        .catch(error => {
            console.error('Ошибка регистрации Service Worker:', error);
        });
}

// Просто меняем статус в интерфейсе при изменении подключения
window.addEventListener('online', () => {
    document.getElementById('status').innerText = 'Статус подключения: Онлайн';
    document.getElementById('status').style.color = 'green';
});

window.addEventListener('offline', () => {
    document.getElementById('status').innerText = 'Статус подключения: Офлайн';
    document.getElementById('status').style.color = 'red';
});
