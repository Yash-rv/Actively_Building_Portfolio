document.addEventListener('DOMContentLoaded', function() {
    let lastScrollTop = 0;
    const header = document.querySelector('.main-header');
    
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }
        
        lastScrollTop = scrollTop;
    }
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    const videoItems = document.querySelectorAll('.video-item');
    const videos = document.querySelectorAll('.video-container video');
    let overlayTimeouts = {};

    videoItems.forEach((videoItem, index) => {
        const video = videoItem.querySelector('video');
        const overlay = videoItem.querySelector('.video-overlay');
        const overlayText = videoItem.querySelector('.video-overlay p');
        
        videoItem.addEventListener('click', (e) => {
            e.stopPropagation();
            
            if (overlayTimeouts[index]) {
                clearTimeout(overlayTimeouts[index]);
                delete overlayTimeouts[index];
            }
            
            videos.forEach((otherVideo, otherIndex) => {
                if (otherIndex !== index) {
                    otherVideo.muted = true;
                    const otherOverlay = videoItems[otherIndex].querySelector('.video-overlay');
                    const otherOverlayText = videoItems[otherIndex].querySelector('.video-overlay p');
                    
                    if (overlayTimeouts[otherIndex]) {
                        clearTimeout(overlayTimeouts[otherIndex]);
                        delete overlayTimeouts[otherIndex];
                    }
                    
                    if (otherOverlay && otherOverlayText) {
                        otherOverlay.style.opacity = '';
                        otherOverlayText.textContent = 'Click to play with sound';
                    }
                }
            });

            video.muted = !video.muted;
            
            if (overlay && overlayText) {
                if (video.muted) {
                    overlay.style.opacity = '';
                    overlayText.textContent = 'Click to play with sound';
                } else {
                    overlay.style.opacity = '1';
                    overlayText.textContent = 'Playing with sound - Click to mute';
                    
                    overlayTimeouts[index] = setTimeout(() => {
                        overlay.style.opacity = '0';
                        delete overlayTimeouts[index];
                    }, 1500);
                }
            }
        });
        
        videoItem.addEventListener('mouseenter', () => {
            if (!video.muted && overlay) {
                if (overlayTimeouts[index]) {
                    clearTimeout(overlayTimeouts[index]);
                    delete overlayTimeouts[index];
                }
                overlay.style.opacity = '1';
            }
        });
        
        videoItem.addEventListener('mouseleave', () => {
            if (!video.muted && overlay) {
                overlayTimeouts[index] = setTimeout(() => {
                    overlay.style.opacity = '0';
                    delete overlayTimeouts[index];
                }, 1000);
            }
        });
        
        videoItem.style.cursor = 'pointer';
    });
});
