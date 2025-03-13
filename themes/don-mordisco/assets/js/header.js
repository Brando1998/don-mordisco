// Language selector

function changeLanguage() {
    const currentLang = window.location.pathname.split('/')[1]; 
    const newLang = currentLang === 'es' ? 'en' : 'es';
    const newPath = window.location.pathname.replace(/^\/(es|en)/, '') || '/';
    window.location.href = `/${newLang}${newPath}`;
}

document.addEventListener("DOMContentLoaded", function () {
    // Menu toggle
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    console.log("MENI JS WORks")
    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("show");
    });

    // Change language selector text
    const currentLang = window.location.pathname.split('/')[1];
    document.getElementById("lang-text").textContent = currentLang === 'es' ? 'English' : 'Español';
});
