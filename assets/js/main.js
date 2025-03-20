// Common JavaScript functions used across the website

// Set current year in footer
document.addEventListener('DOMContentLoaded', function() {
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
      currentYearElement.textContent = new Date().getFullYear();
    }
  });
  
  // Function to get URL parameters
  function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }
  
  // Function to create HTML elements with properties
  function createElement(tag, properties = {}, children = []) {
    const element = document.createElement(tag);
    
    // Set properties
    for (const [key, value] of Object.entries(properties)) {
      if (key === 'className') {
        element.className = value;
      } else if (key === 'textContent') {
        element.textContent = value;
      } else {
        element.setAttribute(key, value);
      }
    }
    
    // Append children
    if (Array.isArray(children)) {
      children.forEach(child => {
        if (child instanceof Node) {
          element.appendChild(child);
        } else if (typeof child === 'string') {
          element.appendChild(document.createTextNode(child));
        }
      });
    }
    
    return element;
  }
  
  // Function to display error message
  function showError(container, message) {
    container.innerHTML = '';
    const errorElement = createElement('div', {
      className: 'error-message'
    }, [message]);
    container.appendChild(errorElement);
  }