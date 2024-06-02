APPMODE('','','#121212');

APPNAME('Wallet');

NETWORKSTATE((data)=>{

    WIDGET(`

      <img class='LaoderIcon' src='${IMAGEPATH}app_icon.png'/>

    `);

    const LaoderIcon=document.querySelector('.LaoderIcon');

    colorChange(LaoderIcon);

    setTimeout(() => {

        MODULE('../../Connection/Connection.js','CONNECTION',(CONNECTION) => {CONNECTION()});
          
    }, 10);

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
          navigator.serviceWorker.register('/service-worker.js')
            .then(function(registration) {
              console.log('Service worker registration successful:', registration);
            })
            .catch(function(error) {
              console.log('Service worker registration failed:', error);
            });
        });
    }

});

