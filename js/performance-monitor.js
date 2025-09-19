// Performance Monitoring Script for True Reports MRI Scan Website
// Tracks Core Web Vitals and other performance metrics

(function() {
  'use strict';
  
  // Performance monitoring
  function trackPerformance() {
    // Track Core Web Vitals
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint (LCP)
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
        
        // Send to analytics if needed
        if (typeof gtag !== 'undefined') {
          gtag('event', 'web_vitals', {
            'metric_name': 'LCP',
            'metric_value': Math.round(lastEntry.startTime),
            'metric_rating': lastEntry.startTime < 2500 ? 'good' : lastEntry.startTime < 4000 ? 'needs_improvement' : 'poor'
          });
        }
      }).observe({entryTypes: ['largest-contentful-paint']});
      
      // First Input Delay (FID)
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          console.log('FID:', entry.processingStart - entry.startTime);
          
          if (typeof gtag !== 'undefined') {
            gtag('event', 'web_vitals', {
              'metric_name': 'FID',
              'metric_value': Math.round(entry.processingStart - entry.startTime),
              'metric_rating': entry.processingStart - entry.startTime < 100 ? 'good' : entry.processingStart - entry.startTime < 300 ? 'needs_improvement' : 'poor'
            });
          }
        });
      }).observe({entryTypes: ['first-input']});
      
      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        console.log('CLS:', clsValue);
        
        if (typeof gtag !== 'undefined') {
          gtag('event', 'web_vitals', {
            'metric_name': 'CLS',
            'metric_value': Math.round(clsValue * 1000),
            'metric_rating': clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs_improvement' : 'poor'
          });
        }
      }).observe({entryTypes: ['layout-shift']});
    }
    
    // Track page load time
    window.addEventListener('load', function() {
      setTimeout(function() {
        const perfData = performance.getEntriesByType('navigation')[0];
        const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
        const domContentLoaded = perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart;
        
        console.log('Page Load Time:', loadTime);
        console.log('DOM Content Loaded:', domContentLoaded);
        
        // Track resource loading times
        const resources = performance.getEntriesByType('resource');
        let totalResourceTime = 0;
        let cssResources = 0;
        let jsResources = 0;
        let imageResources = 0;
        
        resources.forEach(function(resource) {
          totalResourceTime += resource.duration;
          if (resource.name.includes('.css')) cssResources++;
          if (resource.name.includes('.js')) jsResources++;
          if (resource.name.match(/\.(png|jpg|jpeg|gif|webp|svg)$/)) imageResources++;
        });
        
        console.log('Total Resources:', resources.length);
        console.log('CSS Files:', cssResources);
        console.log('JS Files:', jsResources);
        console.log('Images:', imageResources);
        console.log('Total Resource Load Time:', totalResourceTime);
        
        // Send performance data to analytics
        if (typeof gtag !== 'undefined') {
          gtag('event', 'page_performance', {
            'page_load_time': Math.round(loadTime),
            'dom_content_loaded': Math.round(domContentLoaded),
            'total_resources': resources.length,
            'css_files': cssResources,
            'js_files': jsResources,
            'image_files': imageResources,
            'total_resource_time': Math.round(totalResourceTime)
          });
        }
      }, 0);
    });
  }
  
  // Track user interactions
  function trackInteractions() {
    // Track form submissions
    document.addEventListener('submit', function(e) {
      if (e.target.id === 'appointmentForm') {
        console.log('Form submitted');
        if (typeof gtag !== 'undefined') {
          gtag('event', 'form_submit', {
            'form_name': 'appointment_form',
            'form_location': 'hero_section'
          });
        }
      }
    });
    
    // Track button clicks
    document.addEventListener('click', function(e) {
      if (e.target.matches('a[href*="wa.me"]')) {
        console.log('WhatsApp button clicked');
        if (typeof gtag !== 'undefined') {
          gtag('event', 'whatsapp_click', {
            'button_location': e.target.closest('.floating-btns_by_n') ? 'floating_button' : 'header_button'
          });
        }
      }
      
      if (e.target.matches('a[href^="tel:"]')) {
        console.log('Phone button clicked');
        if (typeof gtag !== 'undefined') {
          gtag('event', 'phone_click', {
            'button_location': e.target.closest('.floating-btns_by_n') ? 'floating_button' : 'header_button'
          });
        }
      }
    });
    
    // Track popup interactions
    document.addEventListener('click', function(e) {
      if (e.target.id === 'by_progley_close_btn') {
        console.log('Popup closed');
        if (typeof gtag !== 'undefined') {
          gtag('event', 'popup_close', {
            'popup_type': 'discount_popup'
          });
        }
      }
    });
  }
  
  // Initialize performance tracking
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      trackPerformance();
      trackInteractions();
    });
  } else {
    trackPerformance();
    trackInteractions();
  }
  
  // Service Worker performance tracking
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', function(event) {
      if (event.data.type === 'PERFORMANCE') {
        console.log('Service Worker Performance:', event.data.metrics);
      }
    });
  }
  
})();
