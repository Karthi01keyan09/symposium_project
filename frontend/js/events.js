// ================= EVENTS PAGE LOADED =================

document.addEventListener("DOMContentLoaded", function () {
    console.log("Events Page Loaded Successfully");
});


// ================= EVENT CARD HOVER EFFECT =================

const eventCards = document.querySelectorAll(".event-card");

eventCards.forEach(card => {

    card.addEventListener("mouseenter", function () {
        this.style.boxShadow = "0 10px 30px rgba(0, 119, 255, 0.3)";
    });

    card.addEventListener("mouseleave", function () {
        this.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)";
    });

});


// ================= EVENT CARD CLICK TO REGISTER =================

eventCards.forEach(card => {

    card.addEventListener("click", function () {

        const eventName = this.querySelector("h3").innerText;

        const confirmRedirect = confirm(`Do you want to register for "${eventName}"?`);

        if (confirmRedirect) {
            window.location.href = "register.html";
        }

    });

});