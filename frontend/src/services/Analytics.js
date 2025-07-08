// src/services/Analytics.js
// Note: If using @tanstack/react-query instead of react-query,
// update imports in components that use useQuery hooks

class AnalyticsService {
  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.currentPage = null;
    this.pageStartTime = null;
    this.isInitialized = false;
    this.apiBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
  }

  // Generate unique session ID
  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Get device and browser information
  getDeviceInfo() {
    const userAgent = navigator.userAgent;
    let browserName = 'Unknown';
    let deviceType = 'Desktop';

    // Detect browser
    if (userAgent.includes('Chrome')) browserName = 'Chrome';
    else if (userAgent.includes('Firefox')) browserName = 'Firefox';
    else if (userAgent.includes('Safari')) browserName = 'Safari';
    else if (userAgent.includes('Edge')) browserName = 'Edge';

    // Detect device type
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
      deviceType = 'Mobile';
    } else if (/iPad/i.test(userAgent)) {
      deviceType = 'Tablet';
    }

    return {
      browser: browserName,
      deviceType: deviceType,
      userAgent: userAgent,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language
    };
  }

  // Get user's location (geo-IP will be handled by backend)
  async getLocationInfo() {
    try {
      // This will be handled by the backend using the user's IP
      // Frontend just sends the request, backend does geo-IP lookup
      return {
        timestamp: new Date().toISOString(),
        timezoneOffset: new Date().getTimezoneOffset()
      };
    } catch (error) {
      console.warn('Could not get location info:', error);
      return null;
    }
  }

  // Track page view
  async trackPageView(pagePath = null) {
    try {
      // End previous page session if exists
      if (this.currentPage && this.pageStartTime) {
        await this.trackPageExit();
      }

      // Start new page session
      const path = pagePath || window.location.pathname;
      this.currentPage = path;
      this.pageStartTime = Date.now();

      const deviceInfo = this.getDeviceInfo();
      const locationInfo = await this.getLocationInfo();

      const trackingData = {
        sessionId: this.sessionId,
        pagePath: path,
        timestamp: new Date().toISOString(),
        referrer: document.referrer || null,
        deviceInfo: deviceInfo,
        locationInfo: locationInfo
      };

      // Send to backend
      await this.sendAnalyticsData('page_view', trackingData);

      console.log('Page view tracked:', path);
    } catch (error) {
      console.warn('Analytics tracking failed:', error);
    }
  }

  // Track when user exits a page
  async trackPageExit() {
    if (!this.currentPage || !this.pageStartTime) return;

    try {
      const timeSpent = Math.round((Date.now() - this.pageStartTime) / 1000);

      const exitData = {
        sessionId: this.sessionId,
        pagePath: this.currentPage,
        timeSpentSeconds: timeSpent,
        exitTimestamp: new Date().toISOString()
      };

      await this.sendAnalyticsData('page_exit', exitData);
      console.log(`Time spent on ${this.currentPage}: ${timeSpent} seconds`);
    } catch (error) {
      console.warn('Page exit tracking failed:', error);
    }
  }

  // Track custom events (clicks, interactions, etc.)
  async trackEvent(eventName, eventData = {}) {
    try {
      const trackingData = {
        sessionId: this.sessionId,
        eventName: eventName,
        eventData: eventData,
        pagePath: this.currentPage,
        timestamp: new Date().toISOString()
      };

      await this.sendAnalyticsData('event', trackingData);
      console.log('Event tracked:', eventName, eventData);
    } catch (error) {
      console.warn('Event tracking failed:', error);
    }
  }

  // Send data to backend
  async sendAnalyticsData(type, data) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/api/analytics/${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`Analytics API error: ${response.status}`);
      }
    } catch (error) {
      // Fail silently in production, log in development
      if (process.env.NODE_ENV === 'development') {
        console.warn('Analytics API call failed:', error);
      }

      // Store locally as fallback (could implement offline queue)
      this.storeOfflineData(type, data);
    }
  }

  // Store data locally when API is unavailable
  storeOfflineData(type, data) {
    try {
      const offlineData = JSON.parse(localStorage.getItem('offline_analytics') || '[]');
      offlineData.push({
        type: type,
        data: data,
        storedAt: new Date().toISOString()
      });

      // Keep only last 100 entries
      if (offlineData.length > 100) {
        offlineData.splice(0, offlineData.length - 100);
      }

      localStorage.setItem('offline_analytics', JSON.stringify(offlineData));
    } catch (error) {
      console.warn('Could not store offline analytics data:', error);
    }
  }

  // Initialize analytics
  init() {
    if (this.isInitialized) return;

    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.trackPageExit();
      } else {
        this.trackPageView();
      }
    });

    // Track page unload
    window.addEventListener('beforeunload', () => {
      this.trackPageExit();
    });

    // Track clicks on external links
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a');
      if (link && link.href.startsWith('http') && !link.href.includes(window.location.host)) {
        this.trackEvent('external_link_click', {
          url: link.href,
          text: link.textContent.trim()
        });
      }
    });

    this.isInitialized = true;
    console.log('Analytics initialized with session:', this.sessionId);
  }
}

// Create singleton instance
const Analytics = new AnalyticsService();

// Auto-initialize
Analytics.init();

export default Analytics;