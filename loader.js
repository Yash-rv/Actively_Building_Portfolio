// Loading Screen Handler
(function() {
    'use strict';

    const VIDEOS_LOADED_KEY = 'heroVideosLoaded';
    const loadingScreen = document.getElementById('loading-screen');

    // Check if videos were already loaded in this session
    if (sessionStorage.getItem(VIDEOS_LOADED_KEY) === 'true') {
        // Videos already loaded, hide loader immediately
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
        return;
    }

    // Get all hero videos
    const heroVideos = document.querySelectorAll('.hero-videos video');
    let loadedVideos = 0;
    const totalVideos = heroVideos.length;

    function hideLoader() {
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            
            // Remove from DOM after fade out
            setTimeout(function() {
                loadingScreen.style.display = 'none';
                // Mark videos as loaded for this session
                sessionStorage.setItem(VIDEOS_LOADED_KEY, 'true');
            }, 500);
        }
    }

    function checkVideoLoaded() {
        loadedVideos++;
        console.log(`Video loaded: ${loadedVideos}/${totalVideos}`);
        
        if (loadedVideos >= totalVideos) {
            // All videos loaded
            hideLoader();
        }
    }

    // Listen for video load events
    heroVideos.forEach(function(video) {
        if (video.readyState >= 3) {
            // Video already loaded enough data
            checkVideoLoaded();
        } else {
            // Wait for video to load
            video.addEventListener('canplay', checkVideoLoaded, { once: true });
            
            // Fallback: Also listen to loadeddata event
            video.addEventListener('loadeddata', function() {
                if (loadedVideos < totalVideos) {
                    checkVideoLoaded();
                }
            }, { once: true });
        }
    });

    // Fallback: Hide loader after 10 seconds regardless
    setTimeout(function() {
        if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
            console.log('Fallback: Hiding loader after timeout');
            hideLoader();
        }
    }, 10000);
})();
