(function () {
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");
    const mealsContainer = document.getElementById("meals");
    const resultHeading = document.getElementById("result-heading");
    const errorContainer = document.getElementById("error-container");

    const experiments = Array.from({ length: 50 }, (_, idx) => {
        const day = idx + 1;
        return {
            id: `day${day}`,
            title: `Day ${day}`,
            link: `turshilt${day}.html`,
            badge: "LabX",
            image: "../img/1.png",
            summary: day <= 3
                ? [
                    "Хатуу, шингэн, хий төлөв",
                    "Хатуу, шингэн, хий төлөв (Өргөтгөл)",
                    "Ууршилт, конденсацийн сонирхолтой туршилт",
                ][day - 1]
                : `Day ${day} туршилтын цуврал`,
        };
    });

    const normalize = (txt) => (txt || "").toLowerCase().replace(/\s+/g, "");

    function render(items) {
        mealsContainer.innerHTML = items
            .map(
                (item) => `
            <a class="meal" href="${item.link}">
                <img src="${item.image}" alt="${item.title}">
                <div class="meal-info">
                    <h3 class="meal-title">${item.title}</h3>
                    <div class="meal-category">${item.badge}</div>
                    <p class="meal-summary">${item.summary}</p>
                    <span class="hero-btn" style="margin-top:10px; display:inline-block;">Нээх</span>
                </div>
            </a>
        `
            )
            .join("");
    }

    function showError(message) {
        errorContainer.textContent = message;
        errorContainer.classList.remove("hidden");
        resultHeading.textContent = "";
        mealsContainer.innerHTML = "";
    }

    function handleSearch() {
        const termRaw = searchInput.value.trim();
        const term = termRaw.toLowerCase();

        if (!term) {
            showError("Хайх үгээ оруулна уу.");
            return;
        }

        const matches = experiments.filter((exp) => {
            const name = exp.title.toLowerCase();
            const compact = normalize(exp.title);
            return (
                name.includes(term) ||
                compact.includes(normalize(termRaw)) ||
                (exp.summary || "").toLowerCase().includes(term)
            );
        });

        if (!matches.length) {
            showError(`"${termRaw}"-д тохирох туршилт олдсонгүй.`);
            return;
        }

        errorContainer.classList.add("hidden");
        resultHeading.textContent = `"${termRaw}"-ийн үр дүн`;
        render(matches);
    }

    // bindings
    if (searchBtn) searchBtn.addEventListener("click", handleSearch);
    if (searchInput)
        searchInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") handleSearch();
        });

    // default: show all
    render(experiments);
})();
