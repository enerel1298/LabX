(function () {
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");
    const mealsContainer = document.getElementById("meals");
    const resultHeading = document.getElementById("result-heading");
    const errorContainer = document.getElementById("error-container");

    const experiments = [
        { id: "day1", title: "Day 1", link: "turshilt1.html", badge: "LabX", image: "../img/background.png", summary: "Хатуу, шингэн, хийн төлөв." },
        { id: "day2", title: "Day 2", link: "turshilt2.html", badge: "LabX", image: "../img/day2.png", summary: "Хөдөлдөг бэх." },
        { id: "day3", title: "Day 3", link: "turshilt3.html", badge: "LabX", image: "../img/day2.png", summary: "Ус хаачив" },
        { id: "day4", title: "Day 4", link: "turshilt4.html", badge: "LabX", image: "../img/day2.png", summary: "Салхиар хатаахуй" },
        { id: "day5", title: "Day 5", link: "turshilt5.html", badge: "LabX", image: "../img/day2.png", summary: "Усны гурван ааш" },
        { id: "day6", title: "Day 6", link: "turshilt6.html", badge: "LabX", image: "../img/day2.png", summary: "Бөөн холион бантан" },
        { id: "day7", title: "Day 7", link: "turshilt7.html", badge: "LabX", image: "../img/day2.png", summary: "Дулааны урсгал" },
        { id: "day8", title: "Day 8", link: "turshilt8.html", badge: "LabX", image: "../img/day2.png", summary: "Хоромхон зуурын ууршилт" },
        { id: "day9", title: "Day 9", link: "turshilt9.html", badge: "LabX", image: "../img/day2.png", summary: "Оньсого" },
        { id: "day10", title: "Day 10", link: "turshilt10.html", badge: "LabX", image: "../img/day2.png", summary: "Усан цавуу" },
        { id: "day11", title: "Day 11", link: "turshilt11.html", badge: "LabX", image: "../img/day2.png", summary: "Хөвдөг мөс" },
        { id: "day12", title: "Day 12", link: "turshilt12.html", badge: "LabX", image: "../img/day2.png", summary: "Усан уул" },
        { id: "day13", title: "Day 13", link: "turshilt13.html", badge: "LabX", image: "../img/day2.png", summary: "Хуурай ус" },
        { id: "day14", title: "Day 14", link: "turshilt14.html", badge: "LabX", image: "../img/day2.png", summary: "Үл үзэгдэгч давхарга" },
        { id: "day15", title: "Day 15", link: "turshilt15.html", badge: "LabX", image: "../img/day2.png", summary: "Өгсөж буй ус" },
        { id: "day16", title: "Day 16", link: "turshilt16.html", badge: "LabX", image: "../img/day2.png", summary: "Ёотонгийн бүжиг" },
        { id: "day17", title: "Day 17", link: "turshilt17.html", badge: "LabX", image: "../img/day2.png", summary: "Уусаж алга болов" },
        { id: "day18", title: "Day 18", link: "turshilt18.html", badge: "LabX", image: "../img/day2.png", summary: "Ханасан уусмал" },
        { id: "day19", title: "Day 19", link: "turshilt19.html", badge: "LabX", image: "../img/day2.png", summary: "Халууны ялгарал" },
        { id: "day20", title: "Day 20", link: "turshilt20.html", badge: "LabX", image: "../img/day2.png", summary: "Хагацашгүй нөхөд" },
        { id: "day21", title: "Day 21", link: "turshilt21.html", badge: "LabX", image: "../img/day2.png", summary: "Холимог ба уусмалыг салгах нь" },
        { id: "day22", title: "Day 22", link: "turshilt22.html", badge: "LabX", image: "../img/day2.png", summary: "Цагаан холимог" },
        { id: "day23", title: "Day 23", link: "turshilt23.html", badge: "LabX", image: "../img/day2.png", summary: "Нарны илч" },
        { id: "day24", title: "Day 24", link: "turshilt24.html", badge: "LabX", image: "../img/day2.png", summary: "Нарны энерги" },
        { id: "day25", title: "Day 25", link: "turshilt25.html", badge: "LabX", image: "../img/day2.png", summary: "Долгионтсон ус" },
        { id: "day26", title: "Day 26", link: "turshilt26.html", badge: "LabX", image: "../img/day2.png", summary: "Долгионы уул, хөндий" },
        { id: "day27", title: "Day 27", link: "turshilt27.html", badge: "LabX", image: "../img/day2.png", summary: "..." },
        { id: "day28", title: "Day 28", link: "turshilt28.html", badge: "LabX", image: "../img/day2.png", summary: "..." },
        { id: "day29", title: "Day 29", link: "turshilt29.html", badge: "LabX", image: "../img/day2.png", summary: "..." },
        { id: "day30", title: "Day 30", link: "turshilt30.html", badge: "LabX", image: "../img/day2.png", summary: "..." },
        { id: "day31", title: "Day 31", link: "turshilt31.html", badge: "LabX", image: "../img/day2.png", summary: "..." },
        { id: "day32", title: "Day 32", link: "turshilt32.html", badge: "LabX", image: "../img/day2.png", summary: "..." },
        { id: "day33", title: "Day 33", link: "turshilt33.html", badge: "LabX", image: "../img/day2.png", summary: "..." },
        { id: "day34", title: "Day 34", link: "turshilt34.html", badge: "LabX", image: "../img/day2.png", summary: "..." },
        { id: "day35", title: "Day 35", link: "turshilt35.html", badge: "LabX", image: "../img/day2.png", summary: "..." },
        { id: "day36", title: "Day 36", link: "turshilt36.html", badge: "LabX", image: "../img/day2.png", summary: "..." },
        { id: "day37", title: "Day 37", link: "turshilt37.html", badge: "LabX", image: "../img/day2.png", summary: "..." },
        { id: "day38", title: "Day 38", link: "turshilt38.html", badge: "LabX", image: "../img/day2.png", summary: "..." },
        { id: "day39", title: "Day 39", link: "turshilt39.html", badge: "LabX", image: "../img/day2.png", summary: "..." },
        { id: "day40", title: "Day 40", link: "turshilt40.html", badge: "LabX", image: "../img/day2.png", summary: "..." },
        { id: "day41", title: "Day 41", link: "turshilt41.html", badge: "LabX", image: "../img/day2.png", summary: "..." },
        { id: "day42", title: "Day 42", link: "turshilt42.html", badge: "LabX", image: "../img/day2.png", summary: "..." },
        { id: "day43", title: "Day 43", link: "turshilt43.html", badge: "LabX", image: "../img/day2.png", summary: "..." },
        { id: "day44", title: "Day 44", link: "turshilt44.html", badge: "LabX", image: "../img/day2.png", summary: "..." },
        { id: "day45", title: "Day 45", link: "turshilt45.html", badge: "LabX", image: "../img/day2.png", summary: "..." },
        { id: "day46", title: "Day 46", link: "turshilt46.html", badge: "LabX", image: "../img/day2.png", summary: "..." },
        { id: "day47", title: "Day 47", link: "turshilt47.html", badge: "LabX", image: "../img/day2.png", summary: "..." },
        { id: "day48", title: "Day 48", link: "turshilt48.html", badge: "LabX", image: "../img/day2.png", summary: "..." },
        { id: "day49", title: "Day 49", link: "turshilt49.html", badge: "LabX", image: "../img/day2.png", summary: "..." },
        { id: "day50", title: "Day 50", link: "turshilt50.html", badge: "LabX", image: "../img/day2.png", summary: "..." },
    ];

    const STORAGE_KEY = "labxCompletedDays";

    const getCompleted = () => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? new Set(JSON.parse(raw)) : new Set();
        } catch (e) {
            return new Set();
        }
    };


    const normalize = (txt) => (txt || "").toLowerCase().replace(/\s+/g, "");

    function render(items) {
        const completedSet = getCompleted();
        mealsContainer.innerHTML = items
            .map(
                (item) => `
            <a class="meal" href="${item.link}">
                <img src="${item.image}" alt="${item.title}">
                <div class="meal-info">
                    <h3 class="meal-title">${item.title}</h3>
                    <div class="meal-category">${item.badge}</div>
                    <p class="meal-summary">${item.summary}</p>
                    <div class="meal-actions">
                        <span class="hero-btn">Нээх</span>
                        ${completedSet.has(item.id)
                            ? `<span class="status-badge"><i class="fa-solid fa-circle-check"></i>Completed</span>`
                            : ""
                        }
                    </div>
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
