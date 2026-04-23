/**
 * Global Configuration for Know Your PC
 */
const CONFIG = {
    // Change this to your production API URL when hosting (e.g., https://api.knowyourpc.com)
    API_BASE_URL: 'http://localhost:8000',
    
    // Helper to get full API path
    getApiUrl: (endpoint) => `${CONFIG.API_BASE_URL}${endpoint}`
};

// Export for use in modules if needed, or just leave as global for simple scripts
window.APP_CONFIG = CONFIG;
