// Loading Screen Handler
(function() {
    'use strict';

    // Hide loader after page is fully loaded
    window.addEventListener('load', function() {
        const loadingScreen = document.getElementById('loading-screen');
        
        // Add a minimum display time to show the animation
        setTimeout(function() {
            loadingScreen.classList.add('hidden');
            
            // Remove from DOM after fade out
            setTimeout(function() {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 2000); // Show loader for at least 2 seconds
    });

    // Fallback: Hide loader after 5 seconds regardless
    setTimeout(function() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
            loadingScreen.classList.add('hidden');
            setTimeout(function() {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 5000);
})();
