// ================= PAGE LOAD MESSAGE =================

document.addEventListener("DOMContentLoaded", function () {
    console.log("Symposium Website Loaded Successfully");
});



// ================= SMOOTH SCROLL =================

const links = document.querySelectorAll("a[href^='#']");

links.forEach(link => {

    link.addEventListener("click", function (e) {

        const targetId = this.getAttribute("href");

        if (targetId !== "#") {

            e.preventDefault();

            const targetSection = document.querySelector(targetId);

            targetSection.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});



// ================= ACTIVE NAV LINK =================

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {

    link.addEventListener("click", function () {

        navLinks.forEach(nav => nav.classList.remove("active"));

        this.classList.add("active");

    });

});