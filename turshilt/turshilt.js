const intiSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
    const scrollbarThumb = document.querySelector(".scrollbar-thumb");
    const maxScrollleft = imageList.scrollWidth - imageList.clientWidth;

    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;
            
            const boundedPosition = Math.max(0, Math.min(maxThumbposition, newThumbPosition));

            const scrollPosition = (boundedPosition / maxThumbposition) * maxScrollleft;


            scrollbarThumb.style.left = '${newThumbPosition}px';

        }
        const handleMouseUp = () => {
            document.removeListener("mousemove", handleMouseMove);
            document.removeListener("mouseup", handleMouseUp);
        }
            const boundedPosition = Math.max(0, Math.min(maxThumbposition, newThumbPosition));

            const scrollPosition = (boundedPosition / maxThumbposition) * maxScrollleft;

            imageList.scrollLeft = scrollPosition;
            scrollbarThumb.style.left = `${newThumbPosition}px`;
        

        

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });

        });
    });

    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "block";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollleft ? "none" : "block";
    }

    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollposition / maxScrollleft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }
    imageList.addEventListener("scroll", () => {
        handleSlideButtons();
        updateScrollThumbPosition();
    })
}
window.addEventListener("load", intiSlider);
