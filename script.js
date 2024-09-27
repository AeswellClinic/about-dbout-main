document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carousel");
    const arrowBtns = document.querySelectorAll(".wrapper i");

    const firstCard = carousel.querySelector(".card");
    const firstCardWidth = firstCard.offsetWidth;

    let isDragging = false,
        startX,
        startScrollLeft,
        autoScrollInterval;

    const cardsData = [
        {
            type: 'image',
            imageUrl: './img/image 21 (1).png',
        },
        {
            type: 'text',
            title: 'ออกแบบโปรแกรมดูแลผิวเฉพาะบุคคล',
            description: 'เพื่อการดูแลที่เหมาะสมกับสภาพผิวของคุณด้วยเทคโนโลยีล้ำสมัยและการวิเคราะห์ผิว อย่างละเอียด เพื่อสร้างโปรแกรมที่ตอบโจทย์ความต้องการของลูกค้าทุกท่าน'
        },
        {
            type: 'image',
            imageUrl: './img/image 59.png',
        },
        {
            type: 'text',
            title: 'ทีมแพทย์ผู้มากด้วยประสบการณ์',
            description: 'นำโดยคุณหมอฟงแพทย์ผู้มากประสบการณ์และใส่ใจในทุกขั้นตอนการรักษา'
        },
        {
            type: 'image',
            imageUrl: './img/image 60.png',
        },
        {
            type: 'text',
            title: 'การใช้เทคโนโลยีทันสมัย',
            description: 'เทคโนโลยีที่ทันสมัยและได้รับการยอมรับในการแก้ปัญหาผิวพรรณ เพื่อให้ได้ผลลัพธ์ที่ดีที่สุด'
        },
        {
            type: 'image',
            imageUrl: './img/image 61.png',
        },
        {
            type: 'text',
            title: 'เน้นด้านการรักษา ไม่ยัดเยียดคอร์ส',
            description: 'เราให้คำปรึกษาและแนะนำโปรแกรมที่เหมาะสมที่สุดสำหรับปัญหาผิวพรรณของคุณ'
        }
    ];

    const dragStart = (e) => {
        isDragging = true;
        carousel.classList.add("dragging");
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
        clearInterval(autoScrollInterval); // หยุดเลื่อนอัตโนมัติเมื่อผู้ใช้เลื่อนด้วยมือ
    };

    const dragging = (e) => {
        if (!isDragging) return;
        const newScrollLeft = startScrollLeft - (e.pageX - startX);
        carousel.scrollLeft = newScrollLeft;
    };

    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
        checkButtons();
        autoScrollInterval = setInterval(autoScroll, 3000); // เริ่มเลื่อนอัตโนมัติอีกครั้ง
    };

    const checkButtons = () => {
        const maxScrollLeft = carousel.scrollWidth - carousel.offsetWidth;
        if (carousel.scrollLeft <= 0) {
            arrowBtns[0].classList.add('disabled');
        } else {
            arrowBtns[0].classList.remove('disabled');
        }
        if (carousel.scrollLeft >= maxScrollLeft) {
            arrowBtns[1].classList.add('disabled');
        } else {
            arrowBtns[1].classList.remove('disabled');
        }
    };

    // ฟังก์ชันสำหรับสร้างการ์ดภาพ
    const createImageCard = (cardData) => {
        const card = document.createElement('li');
        card.classList.add('card');
        card.style.backgroundImage = `url(${cardData.imageUrl})`;
        card.style.backgroundSize = 'cover';
        card.style.backgroundPosition = 'center';
        card.style.width = '600px';
        card.style.height = '400px';
        return card;
    };

    // ฟังก์ชันสำหรับสร้างการ์ดข้อความ
    const createTextCard = (cardData) => {
        const card = document.createElement('li');
        card.classList.add('card');
        card.style.width = '600px';
        card.style.height = '400px';

        const h2 = document.createElement('h2');
        h2.innerHTML = cardData.title;
        const span = document.createElement('span');
        span.innerHTML = cardData.description;

        card.appendChild(h2);
        card.appendChild(span);

        return card;
    };

    const autoScroll = () => {
        const maxScrollLeft = carousel.scrollWidth - carousel.offsetWidth;
        let scrollAmount = firstCardWidth * (window.innerWidth <= 480 ? 1 : 2);

        if (carousel.scrollLeft >= maxScrollLeft) {
            cardsData.forEach(cardData => {
                let card;
                if (cardData.type === 'image') {
                    card = createImageCard(cardData);
                } else if (cardData.type === 'text') {
                    card = createTextCard(cardData);
                }
                carousel.appendChild(card);
            });

            carousel.scrollLeft += scrollAmount; // เลื่อนการ์ดไปข้างหน้า
        } else {
            carousel.scrollLeft += scrollAmount;
        }
        checkButtons();
    };

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);

    arrowBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            if (!btn.classList.contains('disabled')) {
                let scrollAmount = firstCardWidth * (window.innerWidth <= 480 ? 1 : 2);
                carousel.scrollLeft += btn.id === "left" ? -scrollAmount : scrollAmount;
                checkButtons();
            }
        });
    });

    autoScrollInterval = setInterval(autoScroll, 3000);

    carousel.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
    carousel.addEventListener('mouseleave', () => autoScrollInterval = setInterval(autoScroll, 3000));

    checkButtons();
});
