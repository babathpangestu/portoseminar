// ==========================================================
// NAVBAR LOADER
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {

    const placeholder = document.getElementById("navbar-placeholder");

    if (placeholder) {

        fetch("navbar.html")
            .then(response => {

                if (!response.ok) {
                    throw new Error("Gagal memuat navbar.html");
                }

                return response.text();

            })
            .then(html => {

                placeholder.innerHTML = html;

                // Jalankan semua fungsi setelah navbar selesai dimuat
                setActiveNav();
                initMobileMenu();
                initThemeToggle();
                initArtefakDropdown();

            })
            .catch(error => {

                console.error("Navbar error:", error);

            });

    }

    loadFooter();

});


// ==========================================================
// ACTIVE NAVBAR
// ==========================================================

function setActiveNav() {

    const page =
        location.pathname
            .split("/")
            .pop()
            .replace(".html", "") || "index";


    document.querySelectorAll("[data-nav]").forEach(link => {

        if (link.dataset.nav === page) {

            link.classList.add("active");

        }

    });

}


// ==========================================================
// DROPDOWN ARTEFAK
// ==========================================================

function initArtefakDropdown() {

    const artefakDropdown =
        document.getElementById("artefakDropdown");

    const artefakDropdownBtn =
        document.getElementById("artefakDropdownBtn");


    if (!artefakDropdown || !artefakDropdownBtn) {
        return;
    }


    // Klik PANAH → buka/tutup dropdown
    artefakDropdownBtn.addEventListener("click", function (event) {

        event.preventDefault();
        event.stopPropagation();

        artefakDropdown.classList.toggle("open");

    });


    // Klik di luar dropdown → tutup
    document.addEventListener("click", function (event) {

        if (!artefakDropdown.contains(event.target)) {

            artefakDropdown.classList.remove("open");

        }

    });

}


// ==========================================================
// MOBILE MENU
// ==========================================================

function initMobileMenu() {

    const btn =
        document.getElementById("mobile-menu-btn");

    const menu =
        document.getElementById("mobile-menu-floating");


    if (btn && menu) {

        btn.addEventListener("click", () => {

            menu.classList.toggle("open");


            const icon =
                btn.querySelector("i");


            if (icon) {

                icon.classList.toggle("fa-bars");

                icon.classList.toggle("fa-times");

            }

        });

    }

}


// ==========================================================
// THEME TOGGLE
// ==========================================================

function initThemeToggle() {

    const applyTheme = (dark) => {

        document.documentElement.classList.toggle(
            "dark",
            dark
        );


        const icons = [
            "theme-icon",
            "theme-icon-mobile"
        ];


        icons.forEach(id => {

            const icon =
                document.getElementById(id);


            if (!icon) return;


            icon.classList.toggle(
                "fa-moon",
                !dark
            );


            icon.classList.toggle(
                "fa-sun",
                dark
            );

        });

    };


    // Ambil tema tersimpan
    const savedTheme =
        localStorage.getItem("theme");


    applyTheme(savedTheme === "dark");


    // Tombol desktop dan mobile
    [
        "theme-toggle",
        "theme-toggle-mobile"
    ].forEach(id => {

        const btn =
            document.getElementById(id);


        if (!btn) return;


        btn.addEventListener("click", () => {

            const isDark =
                document.documentElement.classList.toggle(
                    "dark"
                );


            localStorage.setItem(
                "theme",
                isDark ? "dark" : "light"
            );


            applyTheme(isDark);

        });

    });

}


// ==========================================================
// FOOTER LOADER
// ==========================================================

function loadFooter() {

    const placeholder =
        document.getElementById(
            "footer-placeholder"
        );


    if (!placeholder) return;


    fetch("footer.html")
        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Gagal memuat footer.html"
                );

            }

            return response.text();

        })
        .then(html => {

            placeholder.innerHTML = html;

        })
        .catch(error => {

            console.error(
                "Footer error:",
                error
            );

        });

}


// ==========================================================
// LOADER
// ==========================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const loader =
            document.getElementById("loader");


        if (loader) {

            setTimeout(() => {

                loader.style.opacity = "0";

                loader.style.transition =
                    "opacity 0.5s ease";


                setTimeout(() => {

                    loader.remove();

                }, 500);

            }, 500);

        }


        // ==================================================
        // AOS
        // ==================================================

        if (typeof AOS !== "undefined") {

            AOS.init({

                duration: 800,

                once: true,

                offset: 100

            });

        }


        // ==================================================
        // BACK TO TOP
        // ==================================================

        const backToTopBtn =
            document.getElementById(
                "backToTop"
            );


        if (backToTopBtn) {

            window.addEventListener(
                "scroll",
                () => {

                    if (window.scrollY > 300) {

                        backToTopBtn.classList.add(
                            "visible"
                        );

                    } else {

                        backToTopBtn.classList.remove(
                            "visible"
                        );

                    }

                }
            );


            backToTopBtn.addEventListener(
                "click",
                () => {

                    window.scrollTo({

                        top: 0,

                        behavior: "smooth"

                    });

                }
            );

        }

    }
);