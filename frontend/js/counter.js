document.addEventListener("DOMContentLoaded", function () {

    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {

        const updateCounter = () => {

            const target = +counter.getAttribute("data-target");
            const current = +counter.innerText;

            const increment = target / 200;

            if (current < target) {
                counter.innerText = Math.ceil(current + increment);
                setTimeout(updateCounter, 10);
            } else {
                counter.innerText = target;
            }

        };

        updateCounter();

    });

});