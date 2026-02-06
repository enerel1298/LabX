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
                    <li><a href="login2.php" data-nav="login2.html">Нэвтрэх</a></li>
                </ul>
                <div class="profile-slot" id="profileSlot" aria-live="polite"></div>
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
    const profileSlot = navContainer.querySelector("#profileSlot");
    const loginLink = navContainer.querySelector('a[href="login2.php"]');

    const closeProfileMenu = () => {
        const profile = profileSlot?.querySelector(".nav-profile");
        if (!profile) return;
        profile.classList.remove("open");
        const toggle = profile.querySelector(".profile-toggle");
        if (toggle) {
            toggle.setAttribute("aria-expanded", "false");
        }
    };

    const openMenu = () => navLinks.classList.add("open");
    const closeMenu = () => navLinks.classList.remove("open");

    openBtn?.addEventListener("click", openMenu);
    closeBtn?.addEventListener("click", closeMenu);
    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });
    document.addEventListener("click", (event) => {
        if (!profileSlot || !profileSlot.contains(event.target)) {
            closeProfileMenu();
        }
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeProfileMenu();
        }
    });

    const currentPage = (window.location.pathname.split("/").pop() || "LabX.html").toLowerCase();
    navLinks.querySelectorAll("a[data-nav]").forEach((link) => {
        const target = (link.dataset.nav || "").toLowerCase();
        if (currentPage === target) {
            link.classList.add("active");
        }
    });

    const renderProfile = (user) => {
        if (!profileSlot) return;
        const email = typeof user?.email === "string" ? user.email : "";
        const trimmedEmail = email.trim();
        const initial = (trimmedEmail.charAt(0) || "U").toUpperCase();

        const profile = document.createElement("div");
        profile.className = "nav-profile";

        const toggle = document.createElement("button");
        toggle.type = "button";
        toggle.className = "profile-toggle";
        toggle.setAttribute("aria-haspopup", "true");
        toggle.setAttribute("aria-expanded", "false");

        const avatar = document.createElement("span");
        avatar.className = "avatar";
        avatar.setAttribute("aria-hidden", "true");
        avatar.textContent = initial;

        const meta = document.createElement("span");
        meta.className = "meta";

        const label = document.createElement("span");
        label.className = "label";
        label.textContent = "Профайл";

        meta.appendChild(label);

        if (trimmedEmail) {
            const emailEl = document.createElement("span");
            emailEl.className = "email";
            emailEl.textContent = trimmedEmail;
            meta.appendChild(emailEl);
        }

        toggle.appendChild(avatar);
        toggle.appendChild(meta);

        const menu = document.createElement("div");
        menu.className = "profile-menu";
        menu.setAttribute("role", "menu");

        const logoutBtn = document.createElement("button");
        logoutBtn.type = "button";
        logoutBtn.className = "profile-logout";
        logoutBtn.textContent = "Log out";
        logoutBtn.addEventListener("click", async () => {
            try {
                await fetch("/auth/logout.php", {
                    method: "POST",
                    credentials: "same-origin",
                    cache: "no-store"
                });
            } catch (err) {
                
            }
            window.location.href = "login2.php";
        });

        menu.appendChild(logoutBtn);

        toggle.addEventListener("click", () => {
            const isOpen = profile.classList.toggle("open");
            toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });

        profile.appendChild(toggle);
        profile.appendChild(menu);
        profileSlot.innerHTML = "";
        profileSlot.appendChild(profile);
    };

    const loadProfile = async () => {
        if (!profileSlot) return;
        try {
            const res = await fetch("/auth/me.php", { cache: "no-store", credentials: "same-origin" });
            if (!res.ok) return;
            const data = await res.json();
            if (data?.authenticated) {
                renderProfile(data.user || {});
                loginLink?.classList.add("is-hidden");
            }
        } catch (err) {
        }
    };

    loadProfile();
})();
