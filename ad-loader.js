// ad-loader.js

document.addEventListener('DOMContentLoaded', function() {
    // Fetch the ads.html file
    fetch('ads.html')
        .then(response => response.text())
        .then(data => {
            // Create a temporary container to parse the HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = data;

            // Get each ad slot and insert it into the corresponding container
            const adSlot1 = tempDiv.querySelector('#ad-slot-1');
            const adSlot2 = tempDiv.querySelector('#ad-slot-2');
            const adSlot3 = tempDiv.querySelector('#ad-slot-3');
            const adSlot4 = tempDiv.querySelector('#ad-slot-4');
            const adSlot5 = tempDiv.querySelector('#ad-slot-5');
            const adSlot6 = tempDiv.querySelector('#ad-slot-6'); // NEW - for mobile profile ad

            // Insert ads into their containers on the current page
            if (adSlot1 && document.getElementById('ad-container-1')) {
                document.getElementById('ad-container-1').innerHTML = adSlot1.innerHTML;
            }
            if (adSlot2 && document.getElementById('ad-container-2')) {
                document.getElementById('ad-container-2').innerHTML = adSlot2.innerHTML;
            }
            if (adSlot3 && document.getElementById('ad-container-3')) {
                document.getElementById('ad-container-3').innerHTML = adSlot3.innerHTML;
            }
            if (adSlot4 && document.getElementById('ad-container-mobile-header')) {
                document.getElementById('ad-container-mobile-header').innerHTML = adSlot4.innerHTML;
            }
            if (adSlot5 && document.getElementById('ad-container-article')) {
                document.getElementById('ad-container-article').innerHTML = adSlot5.innerHTML;
            }
            // NEW: Mobile profile ad container
            if (adSlot6 && document.getElementById('ad-container-mobile-profile')) {
                document.getElementById('ad-container-mobile-profile').innerHTML = adSlot6.innerHTML;
            }

            // Execute any scripts in the ad code - UPDATED to include new container
            const scripts = document.querySelectorAll(
                '#ad-container-1 script, #ad-container-2 script, #ad-container-3 script, #ad-container-mobile-header script, #ad-container-article script, #ad-container-mobile-profile script'
            );

            scripts.forEach(script => {
                const newScript = document.createElement('script');
                if (script.src) {
                    newScript.src = script.src;
                } else {
                    newScript.textContent = script.textContent;
                }
                script.parentNode.replaceChild(newScript, script);
            });
        })
        .catch(error => {
            console.error('Error loading ads:', error);
        });
});