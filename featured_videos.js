document.addEventListener('DOMContentLoaded', function() {
    const videoItems = document.querySelectorAll('.featured-videos .video-item');
    const videos = document.querySelectorAll('.featured-videos .video-container video');
    let overlayTimeouts = {}; // Store timeout IDs for each video

    videoItems.forEach((videoItem, index) => {
        const video = videoItem.querySelector('video');
        const overlay = videoItem.querySelector('.video-overlay');
        const overlayText = overlay.querySelector('p');
        
        // Initially pause all videos and show overlay
        video.pause();
        overlay.style.opacity = '1';
        overlayText.textContent = 'Tap to Play';
        
        // Add click event to the entire video item
        videoItem.addEventListener('click', (e) => {
            // Prevent event bubbling to avoid conflicts
            e.stopPropagation();
            
            // Clear any existing timeout for this video
            if (overlayTimeouts[index]) {
                clearTimeout(overlayTimeouts[index]);
                delete overlayTimeouts[index];
            }
            
            // If the video is paused, play it and pause all others
            if (video.paused) {
                // Pause all other videos and show their overlays
                videos.forEach((otherVideo, otherIndex) => {
                    if (otherIndex !== index) {
                        otherVideo.pause();
                        const otherOverlay = videoItems[otherIndex].querySelector('.video-overlay');
                        const otherOverlayText = otherOverlay.querySelector('p');
                        
                        // Clear timeout for other videos
                        if (overlayTimeouts[otherIndex]) {
                            clearTimeout(overlayTimeouts[otherIndex]);
                            delete overlayTimeouts[otherIndex];
                        }
                        
                        // Show overlay for paused videos
                        otherOverlay.style.opacity = '1';
                        otherOverlayText.textContent = 'Tap to Play';
                    }
                });
                
                // Play the clicked video
                video.play();
                video.muted = false;
                video.volume = 1.0;
                
                // Hide overlay
                overlay.style.opacity = '0';
            } else {
                // If the video is playing, pause it
                video.pause();
                
                // Show overlay for the paused video
                overlay.style.opacity = '1';
                overlayText.textContent = 'Tap to Play';
            }
        });
        
        // When video ends, show the overlay again
        video.addEventListener('ended', function() {
            overlay.style.opacity = '1';
            overlayText.textContent = 'Tap to Play';
        });
        
        // When video pauses, show the overlay
        video.addEventListener('pause', function() {
            overlay.style.opacity = '1';
            overlayText.textContent = 'Tap to Play';
        });
        
        // Add cursor pointer to indicate clickable area
        videoItem.style.cursor = 'pointer';
    });
});