// ===== Dark Mode Logic =====
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;


const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
        themeToggle.checked = true;
    }
}


themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        htmlElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        htmlElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
});

// ===== QR Code Logic =====
const qrContainer = document.getElementById("qrcode");
const qrText = document.getElementById("qr-text");
const downloadBtn = document.getElementById("download-btn"); 

if (qrContainer && qrText) {
    function generateQR() {
        
        qrContainer.innerHTML = "";
        
        const text = qrText.value;

        if (!text) {
            alert("Please enter a URL or text!");
            return;
        }

       
        new QRCode(qrContainer, {
            text: text,
            width: 200,
            height: 200,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });

        
        setTimeout(() => {
            if(downloadBtn) downloadBtn.style.display = "block";
        }, 100);
    }

   
    function downloadQR() {
        
        const img = qrContainer.querySelector("img");
        
        if (img) {
            
            const link = document.createElement("a");
            link.href = img.src; 
            link.download = "qr-code.png"; 
            
           
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            alert("Error: No QR code generated yet.");
        }
    }

    function handleEnter(e) {
        if(e.key === 'Enter'){
            generateQR();
        }
    }
    
    
    window.onload = function() {
        applyTheme(getPreferredTheme());
        
        if(qrText.value === "") {
             qrText.value = "Welcome to QuickTools"; 
        }
        generateQR();
    }
}