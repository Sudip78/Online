// logo-loader.js

// Logo configuration - change this to update logo everywhere
const logoConfig = {
    text: "EDU.CONNECT",
    // If you want an image logo instead of text, use this:
    // type: "image",
    // imageUrl: "images/your-logo.png",
    // altText: "EduConnect Logo"
};

// Function to update logo on all pages
function updateLogo() {
    const logoElements = document.querySelectorAll('.logo, .header-logo, .site-logo');
    
    logoElements.forEach(logoElement => {
        if (logoConfig.type === "image") {
            // For image logo
            logoElement.innerHTML = `<img src="${logoConfig.imageUrl}" alt="${logoConfig.altText}" style="height: 40px;">`;
        } else {
            // For text logo (current setup)
            logoElement.textContent = logoConfig.text;
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateLogo();
});