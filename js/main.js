if( 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('../sw.js')
        .then(reg => console.log('SW Registered'))
        .catch(err => console.error(`Error Registered: ${err}`));
    });
}