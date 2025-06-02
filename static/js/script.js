// Global variables
let map;
let marker;

// Country to continent mapping
const countryToContinent = {
  // Asian countries
  'Japan': 'Asia', 'Indonesia': 'Asia', 'Philippines': 'Asia', 'India': 'Asia', 
  'China': 'Asia', 'Malaysia': 'Asia', 'Thailand': 'Asia', 'Sri Lanka': 'Asia', 
  'Vietnam': 'Asia', 'Myanmar': 'Asia', 'Bangladesh': 'Asia', 'Taiwan': 'Asia', 
  'Pakistan': 'Asia', 'Turkey': 'Asia', 'Russia': 'Asia', 'Iran': 'Asia', 
  'Iraq': 'Asia', 'South Korea': 'Asia', 'North Korea': 'Asia', 'Israel': 'Asia', 
  'Jordan': 'Asia',
  
  // European countries
  'Greece': 'Europe', 'Italy': 'Europe', 'United Kingdom': 'Europe', 'Portugal': 'Europe', 
  'Spain': 'Europe', 'France': 'Europe', 'Germany': 'Europe', 'Norway': 'Europe', 
  'Croatia': 'Europe', 'Romania': 'Europe', 'Albania': 'Europe', 'Bulgaria': 'Europe', 
  'Sweden': 'Europe', 'Finland': 'Europe', 'Netherlands': 'Europe', 'Ireland': 'Europe', 
  'Cyprus': 'Europe', 'Montenegro': 'Europe',
  
  // Americas, Africa, Oceania (Other)
  'United States': 'Other', 'Canada': 'Other', 'Mexico': 'Other', 'Chile': 'Other', 
  'Peru': 'Other', 'Ecuador': 'Other', 'Colombia': 'Other', 'Brazil': 'Other', 
  'Argentina': 'Other', 'Venezuela': 'Other', 'Guatemala': 'Other', 'Costa Rica': 'Other', 
  'Nicaragua': 'Other', 'Honduras': 'Other', 'El Salvador': 'Other', 'Panama': 'Other', 
  'Haiti': 'Other', 'Dominican Republic': 'Other', 'Jamaica': 'Other', 'Cuba': 'Other', 
  'Puerto Rico': 'Other', 'Trinidad and Tobago': 'Other',
  
  'Australia': 'Other', 'New Zealand': 'Other', 'Papua New Guinea': 'Other', 'Fiji': 'Other', 
  'Vanuatu': 'Other', 'Solomon Islands': 'Other', 'Tonga': 'Other', 'Samoa': 'Other',
  
  'South Africa': 'Other', 'Morocco': 'Other', 'Algeria': 'Other', 'Tunisia': 'Other', 
  'Egypt': 'Other', 'Ethiopia': 'Other', 'Kenya': 'Other', 'Tanzania': 'Other', 
  'Madagascar': 'Other', 'Mauritius': 'Other',
  
  // Ocean regions - classified as Other
  'Northwest Pacific Ocean': 'Other', 'North Pacific Ocean': 'Other', 'South Pacific Ocean': 'Other',
  'Central Pacific Ocean': 'Other', 'East Pacific Ocean': 'Other', 'West Pacific Ocean': 'Other',
  'North Atlantic Ocean': 'Other', 'South Atlantic Ocean': 'Other', 'Central Atlantic Ocean': 'Other',
  'Indian Ocean': 'Other', 'West Indian Ocean': 'Other', 'East Indian Ocean': 'Other',
  'Mediterranean Sea': 'Other', 'Caribbean Sea': 'Other', 'Arctic Ocean': 'Other', 
  'Baltic Sea': 'Other', 'Red Sea': 'Other'
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
  setupEventListeners();
  initializeMap();
});

function initializeApp() {
  // Set active page based on server data
  const activePage = document.body.dataset.activePage || 'dashboard';
  showPage(activePage);
  
  // Initialize tooltips if Bootstrap is available
  if (typeof bootstrap !== 'undefined') {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }
}

function setupEventListeners() {
  // Country selection auto-detection
  const countrySelect = document.getElementById('country');
  if (countrySelect) {
    countrySelect.addEventListener('change', handleCountryChange);
  }
  
  // Latitude/Longitude inputs for map update
  const latInput = document.getElementById('latitude');
  const lngInput = document.getElementById('longitude');
  
  if (latInput && lngInput) {
    latInput.addEventListener('input', updateMapLocation);
    lngInput.addEventListener('input', updateMapLocation);
  }
  
  // Form submission
  const classificationForm = document.getElementById('classificationForm');
  if (classificationForm) {
    classificationForm.addEventListener('submit', handleFormSubmission);
  }
  
  // Clear button
  const clearBtn = document.getElementById('clearBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', clearForm);
  }
  
  // Input validation
  setupInputValidation();
}

function handleCountryChange() {
  const selectedCountry = this.value;
  const continentSelect = document.getElementById('continent');
  
  if (selectedCountry && countryToContinent[selectedCountry]) {
    const detectedContinent = countryToContinent[selectedCountry];
    continentSelect.value = detectedContinent;
    continentSelect.style.backgroundColor = '#f0f9ff';
    continentSelect.style.color = '#2563eb';
    continentSelect.style.fontWeight = '600';
    
    // Update help text
    const helpText = continentSelect.nextElementSibling;
    helpText.innerHTML = `✅ Auto-detected: ${detectedContinent}`;
    helpText.classList.add('auto-detected-help');
    
    // Add visual feedback animation
    continentSelect.classList.add('slide-up');
    setTimeout(() => continentSelect.classList.remove('slide-up'), 600);
    
  } else {
    resetContinentField(continentSelect);
  }
}

function resetContinentField(continentSelect) {
  continentSelect.value = '';
  continentSelect.style.backgroundColor = 'white';
  continentSelect.style.color = '#1f2937';
  continentSelect.style.fontWeight = 'normal';
  
  const helpText = continentSelect.nextElementSibling;
  helpText.innerHTML = 'Auto-detected based on selected country';
  helpText.classList.remove('auto-detected-help');
}

function initializeMap() {
  // Initialize Leaflet map
  if (typeof L !== 'undefined' && document.getElementById('map')) {
    map = L.map('map').setView([20, 0], 2);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18
    }).addTo(map);
    
    // Add click event to map
    map.on('click', function(e) {
      updateLatLngFromMap(e.latlng.lat, e.latlng.lng);
    });
  }
}

function updateMapLocation() {
  const lat = parseFloat(document.getElementById('latitude').value);
  const lng = parseFloat(document.getElementById('longitude').value);
  
  if (map && !isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
    // Remove existing marker
    if (marker) {
      map.removeLayer(marker);
    }
    
    // Add new marker
    marker = L.marker([lat, lng]).addTo(map);
    map.setView([lat, lng], 8);
    
    // Add popup with coordinates
    marker.bindPopup(`<b>Selected Location</b><br>Lat: ${lat.toFixed(4)}<br>Lng: ${lng.toFixed(4)}`).openPopup();
  }
}

function updateLatLngFromMap(lat, lng) {
  document.getElementById('latitude').value = lat.toFixed(4);
  document.getElementById('longitude').value = lng.toFixed(4);
  
  // Trigger validation
  validateInput(document.getElementById('latitude'));
  validateInput(document.getElementById('longitude'));
  
  // Update marker
  if (marker) {
    map.removeLayer(marker);
  }
  marker = L.marker([lat, lng]).addTo(map);
  marker.bindPopup(`<b>Selected Location</b><br>Lat: ${lat.toFixed(4)}<br>Lng: ${lng.toFixed(4)}`).openPopup();
}

function setupInputValidation() {
  const inputs = document.querySelectorAll('input[type="number"]');
  inputs.forEach(input => {
    input.addEventListener('input', function() {
      validateInput(this);
    });
    
    input.addEventListener('blur', function() {
      validateInput(this);
    });
  });
}

function validateInput(input) {
  if (input.value && input.checkValidity()) {
    input.style.borderColor = 'var(--success-color)';
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
  } else if (input.value) {
    input.style.borderColor = 'var(--danger-color)';
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
  } else {
    input.style.borderColor = '#e5e7eb';
    input.classList.remove('is-valid', 'is-invalid');
  }
}

function handleFormSubmission(e) {
  // Show loading state
  showLoading();
  
  // Disable submit button
  const submitBtn = document.querySelector('.btn-submit');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
  }
}

function showLoading() {
  const loadingDiv = document.getElementById('loading');
  if (loadingDiv) {
    loadingDiv.style.display = 'block';
    loadingDiv.classList.add('fade-in');
  }
}

function hideLoading() {
  const loadingDiv = document.getElementById('loading');
  if (loadingDiv) {
    loadingDiv.style.display = 'none';
    loadingDiv.classList.remove('fade-in');
  }
  
  // Re-enable submit button
  const submitBtn = document.querySelector('.btn-submit');
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-brain"></i> Classify Tsunami Event';
  }
}

function clearForm() {
  // Clear all form inputs
  const form = document.getElementById('classificationForm');
  if (form) {
    form.reset();
  }
  
  // Manually clear all input values to ensure they're empty
  const inputs = document.querySelectorAll('#classificationForm input');
  inputs.forEach(input => {
    input.value = '';
  });
  
  // Manually reset all select elements
  const selects = document.querySelectorAll('#classificationForm select');
  selects.forEach(select => {
    select.selectedIndex = 0;
  });
  
  // Reset continent field styling
  const continentSelect = document.getElementById('continent');
  if (continentSelect) {
    resetContinentField(continentSelect);
  }
  
  // Clear map marker
  if (marker && map) {
    map.removeLayer(marker);
    marker = null;
    map.setView([20, 0], 2);
  }
  
  // Clear validation classes and reset styling
  const formControls = document.querySelectorAll('.form-control, .form-select');
  formControls.forEach(input => {
    input.style.borderColor = '#e5e7eb';
    input.classList.remove('is-valid', 'is-invalid');
  });
  
  // Hide result card
  const resultCard = document.querySelector('.result-card');
  if (resultCard) {
    resultCard.style.display = 'none';
  }
  
  // Hide loading
  hideLoading();
  
  // Show success message
  showNotification('Form cleared successfully!', 'success');
}

function showPage(pageName) {
  // Hide all pages
  const pages = document.querySelectorAll('.page-section');
  pages.forEach(page => page.classList.remove('active'));
  
  // Show selected page
  const targetPage = document.getElementById(pageName);
  if (targetPage) {
    targetPage.classList.add('active');
  }
  
  // Update navigation active state
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => link.classList.remove('active'));
  
  const activeNavLink = document.querySelector(`[data-page="${pageName}"]`);
  if (activeNavLink) {
    activeNavLink.classList.add('active');
  }
  
  // Update URL without reload
  const newUrl = pageName === 'dashboard' ? '/' : `/${pageName}`;
  window.history.pushState({}, '', newUrl);
  
  // Initialize map if switching to classifier page
  if (pageName === 'classifier' && !map) {
    setTimeout(initializeMap, 100);
  }
}

function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
  notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
  
  notification.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  
  document.body.appendChild(notification);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 3000);
}

// Utility functions
function formatCoordinate(value, type) {
  const num = parseFloat(value);
  if (isNaN(num)) return '';
  
  const direction = type === 'lat' ? (num >= 0 ? 'N' : 'S') : (num >= 0 ? 'E' : 'W');
  return `${Math.abs(num).toFixed(4)}° ${direction}`;
}

function validateCoordinates(lat, lng) {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}

// Export functions for global access
window.showPage = showPage;
window.clearForm = clearForm;
window.showNotification = showNotification; 