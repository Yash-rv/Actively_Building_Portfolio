document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch and insert a component
    const loadComponent = (componentPath, placeholderId) => {
        fetch(componentPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok for ${componentPath}`);
                }
                return response.text();
            })
            .then(data => {
                const placeholder = document.getElementById(placeholderId);
                if (placeholder) {
                    placeholder.innerHTML = data;
                } else {
                    console.error(`Placeholder with ID ${placeholderId} not found.`);
                }
            })
            .catch(error => {
                console.error('Error loading component:', error);
            });
    };

    // Load header and footer
    loadComponent('header.html', 'header-placeholder');
    loadComponent('footer.html', 'footer-placeholder');

    // Auto-hide header functionality
    let inactivityTimer;
    let isHeaderVisible = true;
    const header = document.querySelector('.main-header');
    const inactivityDelay = 700; // 0.7 seconds of inactivity

    function hideHeader() {
        if (header && isHeaderVisible) {
            header.classList.add('header-hidden');
            isHeaderVisible = false;
        }
    }

    function showHeader() {
        if (header && !isHeaderVisible) {
            header.classList.remove('header-hidden');
            isHeaderVisible = true;
        }
    }

    function resetInactivityTimer() {
        clearTimeout(inactivityTimer);
        showHeader();
        inactivityTimer = setTimeout(hideHeader, inactivityDelay);
    }

    // Listen for user activity
    document.addEventListener('mousemove', resetInactivityTimer);
    document.addEventListener('mousedown', resetInactivityTimer);
    document.addEventListener('keypress', resetInactivityTimer);
    document.addEventListener('scroll', resetInactivityTimer);
    document.addEventListener('touchstart', resetInactivityTimer);

    // Start the inactivity timer
    resetInactivityTimer();
});
