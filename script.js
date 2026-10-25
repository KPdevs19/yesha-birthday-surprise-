/* =========================================
   ELEMENTS
========================================= */

const intro = document.querySelector(".intro");

const enterBtn = document.querySelector(".enter");

const mainContent = document.getElementById("mainContent");

const music = document.getElementById("backgroundMusic");


/* =========================================
   ENTER WEBSITE
========================================= */

if (enterBtn && mainContent) {

    enterBtn.addEventListener("click", async () => {

        enterBtn.disabled = true;

        document.body.classList.add("entered");

        if (music) {
            music.volume = 0.35;

            try {
                await music.play();
            } catch (error) {
                console.log("Music playback was blocked:", error);
            }
        }

        if (intro) {
            intro.classList.add("hide");
        }

        mainContent.style.display = "block";
        mainContent.classList.add("visible");

        requestAnimationFrame(() => {
            mainContent.scrollIntoView({ behavior: "smooth", block: "start" });
        });

        if (intro) {
            setTimeout(() => {
                intro.style.display = "none";
            }, 700);
        }

        setTimeout(() => {
            startScrollAnimations();
        }, 500);
    });
}


/* =========================================
   SCROLL REVEAL ANIMATIONS
========================================= */

function startScrollAnimations() {

    const revealElements = document.querySelectorAll(
        ".content-wrapper p, " +
        ".content-wrapper h2, " +
        ".content-wrapper h3, " +
        ".memory-card, " +
        ".memories-heading, " +
        ".gallery-ending, " +
        ".forget-content > *, " +
        ".forget-intro > *, " +
        ".forget-message > *, " +
        ".birthday-content > *, " +
        ".final-content > *"
    );


    const observer = new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );


    revealElements.forEach(element => {

        element.classList.add("reveal");

        observer.observe(element);

    });

}
// Only do this on touch devices:
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    if (isTouchDevice()) {
        const flower = document.getElementById('flowerTouch');

        // Show flower on touch
        document.addEventListener('touchstart', function(e) {
            if(e.touches.length > 0) {
                flower.style.display = 'block';
                flower.style.left = (e.touches[0].clientX - 20) + 'px';
                flower.style.top = (e.touches[0].clientY - 20) + 'px';
            }
        });

        document.addEventListener('touchmove', function(e) {
            if(e.touches.length > 0) {
                flower.style.left = (e.touches[0].clientX - 20) + 'px';
                flower.style.top = (e.touches[0].clientY - 20) + 'px';
            }
        });

        document.addEventListener('touchend', function() {
            flower.style.display = 'none';
        });

        // Hide flower for input fields on touch
        document.querySelectorAll('input, textarea').forEach(function(el) {
            el.addEventListener('touchstart', function() {
                flower.style.display = 'none';
            });
        });
    }
});