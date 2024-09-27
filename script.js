document.addEventListener("DOMContentLoaded", function() {
    const carousel = document.querySelector(".carousel");
    const leftArrow = document.querySelector("#left");
    const rightArrow = document.querySelector("#right");
    const firstCard = carousel.querySelector(".card");
    let firstCardWidth = firstCard.offsetWidth;

    let isDragging = false,
        startX,
        startScrollLeft;


    leftArrow.style.visibility = 'hidden';


    const checkButtons = () => {
        const maxScrollLeft = carousel.scrollWidth - carousel.offsetWidth;
        const tolerance = 5;

  
        if (carousel.scrollLeft <= 0) {
            leftArrow.style.visibility = 'hidden';
        } else {
            leftArrow.style.visibility = 'visible';
        }

       
        if (carousel.scrollLeft >= maxScrollLeft - tolerance) {
            rightArrow.style.visibility = 'hidden';
        } else {
            rightArrow.style.visibility = 'visible';
        }
    };

    
    checkButtons();


    window.addEventListener('resize', () => {
        firstCardWidth = firstCard.offsetWidth; 
        checkButtons();
    });

   
    rightArrow.addEventListener("click", () => {
        let scrollAmount = firstCardWidth * (window.innerWidth <= 480 ? 1 : 2);
        carousel.scrollLeft += scrollAmount;
        checkButtons();
    });


    leftArrow.addEventListener("click", () => {
        let scrollAmount = firstCardWidth * (window.innerWidth <= 480 ? 1 : 2);
        carousel.scrollLeft -= scrollAmount;
        checkButtons();
    });


    carousel.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const newScrollLeft = startScrollLeft - (e.pageX - startX);
        carousel.scrollLeft = newScrollLeft;
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
        checkButtons();
    });
});
