var typed = new Typed(".multiple-text", {
    strings: ["Food you cannot resist", "A dish that can't be dismissed", "you can't resist"],
    typeSpeed: 50,
    backSpeed: 50,
    backDelay: 100,
    loop: true
});



/*---------------------------- active status -------------------------*/
let sections = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    // Get the current scroll position
    let scrollPosition = window.scrollY;

    sections.forEach(sec => {
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        // Check if the current scroll position is within the section's range
        if (scrollPosition >= offset && scrollPosition < offset + height) {
            // Remove 'active' from all navigation links
            navlinks.forEach(link => link.classList.remove('active'));

            // Add 'active' to the current section's navigation link
            let activeLink = document.querySelector(`header nav a[href*=${id}]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
};

/*------------------------- JavaScript for slider ------------------------*/
const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper i");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildrens = [...carousel.children];

let isDragging = false, starX, startScrollLeft;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth)

carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

arrowBtns.forEach(btn => {
     btn.addEventListener("click", () => {
        console.log(btn.id);
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
     })
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
}

const dragging = (e) => {
    if(!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - starX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    if(carousel.scrollLeft ===0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - ( 2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);