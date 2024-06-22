// frontend/script.js
function generateQR() {
    const urlInput = document.getElementById('urlInput');
    const qrCodeContainer = document.getElementById('qrCodeContainer');
  
    const url = urlInput.value.trim();
  
    if (url === '') {
      alert('Please enter a valid URL.');
      return;
    }
  
    // Clear previous QR codes
    qrCodeContainer.innerHTML = '';
  
    // Create QR code image
    const qrImage = document.createElement('img');
    qrImage.src = `/generate-qr?data=${encodeURIComponent(url)}`; // Route for backend QR code generation
  
    // Append QR code to container
    qrCodeContainer.appendChild(qrImage);
  }
  