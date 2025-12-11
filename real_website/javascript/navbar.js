(function () {
    if (document.querySelector(".site-navbar")) return;

    const ensureStylesheet = (href) => {
        const existing = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).find((link) =>
            link.getAttribute("href") === href
        );
        if (!existing) {
            const linkEl = document.createElement("link");
            linkEl.rel = "stylesheet";
            linkEl.href = href;
            document.head.appendChild(linkEl);
        }
    };

    ensureStylesheet("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css");
    ensureStylesheet("../css/navbar.css");

    const navTemplate = `
    <div class="site-navbar" role="banner">
        <nav aria-label="Main navigation">
            <a class="brand" href="LabX.html">
                <img src="../img/logo.png" alt="LabX logo">
                <div class="lab"><h3>LabX 1.0</h3></div>
            </a>
            <div class="nav-links" id="navLinks">
                <button class="nav-close" aria-label="Close menu"><i class="fa-solid fa-times"></i></button>
                <ul>
                    <li><a href="LabX.html" data-nav="LabX.html">Home</a></li>
                    <li><a href="turshiltw.html" data-nav="turshiltw.html">Туршилт</a></li>
                    <li><a href="about.html" data-nav="about.html">Бидний тухай</a></li>
                    <li><a href="contact.html" data-nav="contact.html">Холбогдох</a></li>
                    <li><a href="login2.html" data-nav="login2.html">Нэвтрэх</a></li>
                </ul>
                <div class="search-bar">
                    <input type="text" placeholder="Search" aria-label="Search">
                    <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
                </div>
            </div>
            <button class="nav-toggle" aria-label="Open menu"><i class="fa-solid fa-bars"></i></button>
        </nav>
    </div>`;

    const host = document.querySelector(".header") || document.body;
    host.insertAdjacentHTML("afterbegin", navTemplate);

    const navContainer = host.querySelector(".site-navbar");
    const navLinks = navContainer.querySelector(".nav-links");
    const openBtn = navContainer.querySelector(".nav-toggle");
    const closeBtn = navContainer.querySelector(".nav-close");

    const openMenu = () => navLinks.classList.add("open");
    const closeMenu = () => navLinks.classList.remove("open");

    openBtn?.addEventListener("click", openMenu);
    closeBtn?.addEventListener("click", closeMenu);
    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    const currentPage = (window.location.pathname.split("/").pop() || "LabX.html").toLowerCase();
    navLinks.querySelectorAll("a[data-nav]").forEach((link) => {
        const target = (link.dataset.nav || "").toLowerCase();
        if (currentPage === target) {
            link.classList.add("active");
        }
    });
})();
