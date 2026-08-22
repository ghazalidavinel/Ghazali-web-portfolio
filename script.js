/* =========================
   THEME INIT
   Runs immediately at the top
   of this file (not wrapped in
   DOMContentLoaded) so the
   correct theme is applied
   before the page paints —
   avoids a flash of the wrong
   theme. This is why this file
   is loaded from <head>.
========================= */

(function () {

    var systemPrefersLight =
        window.matchMedia(
            "(prefers-color-scheme: light)"
        ).matches;

    document.documentElement.setAttribute(
        "data-theme",
        systemPrefersLight ? "light" : "dark"
    );

})();


/* =========================
   EVERYTHING BELOW NEEDS THE
   PAGE'S ELEMENTS TO EXIST, SO
   IT WAITS FOR DOMContentLoaded
========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /* =========================
           THEME TOGGLE
           Syncs the button to the
           theme already applied
           above, and keeps following
           the system live until the
           person manually picks one.
        ========================= */

        const root = document.documentElement;

        const themeToggle =
            document.getElementById("themeToggle");

        let userPickedTheme = false;


        function applyTheme(theme) {

            root.setAttribute("data-theme", theme);

            themeToggle.setAttribute(
                "aria-pressed",
                theme === "light" ? "true" : "false"
            );

            themeToggle.setAttribute(
                "aria-label",
                theme === "light"
                    ? "Switch to dark mode"
                    : "Switch to light mode"
            );

        }


        applyTheme(
            root.getAttribute("data-theme") || "dark"
        );


        themeToggle.addEventListener(
            "click",
            () => {

                userPickedTheme = true;

                const current =
                    root.getAttribute("data-theme");

                applyTheme(
                    current === "dark" ? "light" : "dark"
                );

            }
        );


        window
            .matchMedia("(prefers-color-scheme: light)")
            .addEventListener(
                "change",
                (event) => {

                    if (userPickedTheme) return;

                    applyTheme(
                        event.matches ? "light" : "dark"
                    );

                }
            );


        /* =========================
           SECTION NAVIGATION
           (plain smooth scroll, no
           page-transition overlay)
        ========================= */

        const navigationLinks =
            document.querySelectorAll(
                "[data-section]"
            );


        navigationLinks.forEach(
            (link) => {

                link.addEventListener(
                    "click",
                    (event) => {

                        event.preventDefault();


                        const targetID =
                            link.dataset.section;


                        const target =
                            document.getElementById(
                                targetID
                            );


                        target.scrollIntoView({
                            behavior: "smooth"
                        });

                    }
                );

            }
        );


        /* =========================
           PORTFOLIO TABS
        ========================= */

        const portfolioButtons =
            document.querySelectorAll(
                ".portfolio-button"
            );


        const portfolioContents =
            document.querySelectorAll(
                ".portfolio-content"
            );


        portfolioButtons.forEach(
            (button) => {

                button.addEventListener(
                    "click",
                    () => {

                        const target =
                            button.dataset.content;


                        portfolioButtons.forEach(
                            (item) => {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                        portfolioContents.forEach(
                            (content) => {

                                content.classList.remove(
                                    "active"
                                );

                            }
                        );


                        button.classList.add(
                            "active"
                        );


                        document
                            .getElementById(target)
                            .classList.add(
                                "active"
                            );

                    }
                );

            }
        );


        /* =========================
           CONTACT EXTENSION
        ========================= */

        const contactButton =
            document.getElementById(
                "contactButton"
            );


        const socialLinks =
            document.getElementById(
                "socialLinks"
            );


        contactButton.addEventListener(
            "click",
            () => {

                socialLinks.classList.toggle(
                    "active"
                );


                if (
                    socialLinks.classList.contains(
                        "active"
                    )
                ) {

                    contactButton.textContent =
                        "CLOSE CONTACT ↑";

                } else {

                    contactButton.textContent =
                        "GET IN TOUCH →";

                }

            }
        );


        /* =========================
           TYPING EFFECT
        ========================= */

        const typing =
            document.getElementById(
                "typing"
            );


        const words = [
            "Web Developer",
            "UI/UX Designer"
        ];


        let wordIndex = 0;

        let characterIndex = 0;

        let deleting = false;


        function typeEffect() {

            const currentWord =
                words[wordIndex];


            if (!deleting) {

                typing.textContent =
                    currentWord.substring(
                        0,
                        characterIndex + 1
                    );

                characterIndex++;


                if (
                    characterIndex ===
                    currentWord.length
                ) {

                    deleting = true;

                    setTimeout(
                        typeEffect,
                        1200
                    );

                    return;

                }

            } else {

                typing.textContent =
                    currentWord.substring(
                        0,
                        characterIndex - 1
                    );

                characterIndex--;


                if (
                    characterIndex === 0
                ) {

                    deleting = false;

                    wordIndex++;


                    if (
                        wordIndex >=
                        words.length
                    ) {

                        wordIndex = 0;

                    }

                }

            }


            setTimeout(
                typeEffect,
                deleting ? 45 : 90
            );

        }


        typeEffect();


        /* =========================
           SCROLL REVEAL
        ========================= */

        const revealElements =
            document.querySelectorAll(
                ".reveal, .title-reveal"
            );


        const observer =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "active"
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.2
                }
            );


        revealElements.forEach(
            (element) => {

                observer.observe(
                    element
                );

            }
        );

    }
);