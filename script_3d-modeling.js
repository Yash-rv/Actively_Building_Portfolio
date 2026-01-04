// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Stacked video cards - hover to stay on top
    const stackedCards = document.querySelectorAll('.stack-item');
    let currentZIndex = 10; // Start with a base z-index higher than the initial ones
    
    stackedCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Increase z-index on hover and keep it
            currentZIndex++;
            this.style.zIndex = currentZIndex;
            // Force reflow to ensure the style is applied
            void this.offsetWidth;
        });
    });
    
    // Get all video items (excluding stacked cards which don't need overlay interactions)
    const videoItems = document.querySelectorAll('.video-item, .video-item-portrait, .result-video-card');
    
    videoItems.forEach(item => {
        const video = item.querySelector('video');
        const overlay = item.querySelector('.video-overlay');
        
        if (!video) return;
        
        // Click event to toggle sound
        item.addEventListener('click', function(e) {
            if (video.muted) {
                // Unmute this video
                video.muted = false;
                
                // Mute all other videos
                document.querySelectorAll('video').forEach(otherVideo => {
                    if (otherVideo !== video) {
                        otherVideo.muted = true;
                    }
                });
                
                // Hide overlay
                if (overlay) overlay.style.opacity = '0';
            } else {
                // Mute if clicked again
                video.muted = true;
                if (overlay) overlay.style.opacity = '1';
            }
        });
        
        // Show overlay on hover when muted
        item.addEventListener('mouseenter', function() {
            if (video.muted && overlay) {
                overlay.style.opacity = '1';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });
        
        // Intersection Observer for lazy loading and auto-play optimization
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play().catch(e => {
                        console.log('Auto-play prevented:', e);
                    });
                } else {
                    video.pause();
                }
            });
        }, {
            threshold: 0.5 // Video must be 50% visible
        });
        
        observer.observe(item);
    });
    
    // Auto-play for stacked videos (screen recordings)
    const stackedVideos = document.querySelectorAll('.stack-item video');
    stackedVideos.forEach(video => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play().catch(e => {
                        console.log('Auto-play prevented:', e);
                    });
                } else {
                    video.pause();
                }
            });
        }, {
            threshold: 0.5
        });
        
        observer.observe(video);
    });
    
    // Smooth scroll behavior for any internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add scroll-triggered animations for sections
    const sections = document.querySelectorAll('.blender-section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Handle video loading errors
    const allVideos = document.querySelectorAll('video');
    allVideos.forEach(video => {
        video.addEventListener('error', function() {
            console.error('Error loading video:', video.src);
            const container = video.closest('.video-container, .video-container-small, .video-container-medium, .video-container-portrait, .result-video-card, .video-card');
            if (container) {
                container.style.backgroundColor = '#1a1a1a';
                const errorMsg = document.createElement('div');
                errorMsg.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #666; text-align: center; padding: 20px;';
                errorMsg.textContent = 'Video unavailable';
                container.appendChild(errorMsg);
            }
        });
    });
});
