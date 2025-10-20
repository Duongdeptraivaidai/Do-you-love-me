
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const questionContainer = document.getElementById('questionContainer');
const heartLoader = document.getElementById('heartLoader');
const resultContainer = document.getElementById('resultContainer');

const carouselImages = document.getElementById('carouselImages');
const images = document.querySelectorAll('.carousel-img');

let currentIndex = 0;
const totalImages = images.length;
let startX = 0;
let endX = 0;
const threshold = 50;
function showImage(index) {
    carouselImages.style.transform = `translateX(${-index * 100}%)`;
}

function handleSwipe() {
    const diff = startX - endX;

    if (Math.abs(diff) > threshold) {
        if (diff > 0) {
            currentIndex = (currentIndex + 1) % totalImages;
        } else {
            currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        }
        showImage(currentIndex);
    }
    
   
    startX = 0;
    endX = 0;
}
noBtn.addEventListener("mouseover", () => {
    const containerWidth = questionContainer.offsetWidth - noBtn.offsetWidth;
    const containerHeight = questionContainer.offsetHeight - noBtn.offsetHeight;
    
    const newX = Math.floor(Math.random() * containerWidth);
    const newY = Math.floor(Math.random() * containerHeight);

    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
});


yesBtn.addEventListener("click", () => {
    questionContainer.style.display = "none";
    heartLoader.style.display = "block";

    setTimeout(() => {
        heartLoader.style.display = "none";
        resultContainer.style.display = "block";
        currentIndex = 0;
        showImage(currentIndex);
    }, 3000);
});


carouselImages.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

carouselImages.addEventListener('touchmove', (e) => {
    e.preventDefault();
});

carouselImages.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});


let isDragging = false;
carouselImages.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    carouselImages.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
 
    const currentTranslate = currentIndex * 100;
    const dragOffset = ((e.clientX - startX) / carouselImages.offsetWidth) * 100;
    carouselImages.style.transform = `translateX(${-currentTranslate + dragOffset}%)`;
    carouselImages.style.transition = 'none'; 
});

document.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    carouselImages.style.cursor = 'grab';
    carouselImages.style.transition = 'transform 0.5s ease-in-out';
    
    endX = e.clientX;
    handleSwipe();
});