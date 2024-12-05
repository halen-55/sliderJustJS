const images = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg"];

// исходные данные по слайдеру
const slider = document.querySelector(".slider");
const sliderLine = document.querySelector(".slider-line");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
const dots = document.querySelector(".dots");

// ===== ширина слайда =====
const widthSlide = slider.clientWidth;
// ===== активное изображение =====
let activeImage = 1;
// ===== блокировка =====
let  flag = true;

// отрисовка слайдов в HTML c клонами
const fragmentSlides = document.createDocumentFragment();
for (let i = 0; i < images.length; i++) {
  createSlide(i);
}
function createSlide(id) {
  if (id == 0) {
    const img = document.createElement("img");
    img.classList.add("slide");
    img.id = "lastClone";
    img.src = "./img/" + images[images.length - 1];
    fragmentSlides.append(img);
  }
  const img = document.createElement("img");
  img.classList.add("slide");
  img.src = "./img/" + images[id];
  fragmentSlides.append(img);
  if (id == images.length - 1) {
    const img = document.createElement("img");
    img.classList.add("slide");
    img.id = "firstClone";
    img.src = "./img/" + images[0];
    fragmentSlides.append(img);
  }
  sliderLine.appendChild(fragmentSlides);
}
// ===== все слайды =====
const slides = document.querySelectorAll(".slide");

// отрисовка точек в HTML
const fragmentDots = document.createDocumentFragment();
for (let i = 0; i < images.length; i++) {
  createDot(i);
}
function createDot(id) {
  if (id == 0) {
    const div = document.createElement("div");
    div.classList.add("dot", "active-dot");
    fragmentDots.append(div);
  } else {
    const div = document.createElement("div");
    div.classList.add("dot");
    fragmentDots.append(div);
  }
  dots.append(fragmentDots);
}
// ===== все точки =====
const dotAll = document.querySelectorAll(".dot");

// сдвиг контейнера со слайдами
function offsetSliderLine(counter) {
  sliderLine.style.left = -counter * widthSlide + "px";
}
offsetSliderLine(activeImage);

// сдвиг контейнера при нажании на кнопку prev
function prevSlide() {
  if (!flag) return
  flag = !flag;
  
  if (activeImage == 1) {
    activeImage--;


    // анимация
    let currentOffsetSliderLIne = parseInt(sliderLine.style.left);
    const futureOffsetSliderLine = currentOffsetSliderLIne + (parseInt(widthSlide));

    const interval = setInterval(function () {
       if (currentOffsetSliderLIne == futureOffsetSliderLine) {
          clearInterval(interval);
          flag = true;
        } else {
          currentOffsetSliderLIne += 50;
          sliderLine.style.left = currentOffsetSliderLIne + "px";
        }
    }, 50);


    deleteActiveDot();
    addPrevActiveDot();
    setTimeout(() => {
      jumpPrev();
    }, "500");

  } else {
    activeImage--;

    // анимация
    let currentOffsetSliderLIne = parseInt(sliderLine.style.left);
    const futureOffsetSliderLine = currentOffsetSliderLIne + (parseInt(widthSlide));

    const interval = setInterval(function () {
       if (currentOffsetSliderLIne == futureOffsetSliderLine) {
          clearInterval(interval);
          flag = true;
        } else {
          currentOffsetSliderLIne += 50;
          sliderLine.style.left = currentOffsetSliderLIne + "px";
        }
    }, 50);


    deleteActiveDot();
    dotAll[activeImage - 1].classList.add("active-dot");
  }
}
// сдвиг контейнера при нажании на кнопку next
function nextSlide() {
  if (!flag) return
  flag = !flag;

  if (activeImage == slides.length - 2) {
    activeImage++;
    

    let currentOffsetSliderLIne = parseInt(sliderLine.style.left);
    const futureOffsetSliderLine = currentOffsetSliderLIne + (parseInt(widthSlide) * (-1));

    const interval = setInterval(function () {
       if (currentOffsetSliderLIne == futureOffsetSliderLine) {
          clearInterval(interval);
          flag = true;
        } else {
          currentOffsetSliderLIne -= 50;
          sliderLine.style.left = currentOffsetSliderLIne + "px";
        }
    }, 50);


    deleteActiveDot();
    addNextActiveDot();
    
    setTimeout(() => {
      jumpNext();
    }, "500");
  } else {    
    activeImage++;


    let currentOffsetSliderLIne = parseInt(sliderLine.style.left);
    const futureOffsetSliderLine = currentOffsetSliderLIne + (parseInt(widthSlide) * (-1));

    const interval = setInterval(function () {
       if (currentOffsetSliderLIne == futureOffsetSliderLine) {
          clearInterval(interval);
          flag = true;
        } else {
          currentOffsetSliderLIne -= 50;
          sliderLine.style.left = currentOffsetSliderLIne + "px";
        }
    }, 50);

    
    deleteActiveDot();
    dotAll[activeImage - 1].classList.add("active-dot");
  }
}

function deleteActiveDot() {
  dotAll.forEach((dot) => {
    dot.classList.remove("active-dot");
  });
}
function addPrevActiveDot() {
  dotAll[slides.length - 3].classList.add("active-dot");
}
function addNextActiveDot() {
  dotAll[0].classList.add("active-dot");
}

function jumpPrev() {
  activeImage = slides.length - 2;
  offsetSliderLine(activeImage);
}
function jumpNext() {
  activeImage = 1;
  offsetSliderLine(activeImage);
}

// нажатие на кнопки
nextButton.addEventListener("click", nextSlide);
prevButton.addEventListener("click", prevSlide);

// Добавление кликов по точкам
dotAll.forEach((dot, id) => {
  dot.addEventListener("click", () => {
    const currentDot = activeImage - 1;
    const pressedDot = id;
    if (currentDot == pressedDot) return;
    if (currentDot < pressedDot) {
      // => движение слайдов происходит вправо
      // => движение контейнера происходит влево

      // вычисление шага для дальнейшего сдвига контейнера
      const steps = (pressedDot - currentDot) * (-1);
      // текущее положение контейнера
      let currentOffsetSliderLIne = parseInt(sliderLine.style.left);
      // то куда должен быть сдвинут контейнер
      const futureOffsetSliderLine = steps * widthSlide + currentOffsetSliderLIne;

      // Запуск анимации перемещения слайда вправо
      const interval = setInterval(function () {
        if (currentOffsetSliderLIne == futureOffsetSliderLine) {
          clearInterval(interval);
        } else {
          currentOffsetSliderLIne -= 50;
          sliderLine.style.left = currentOffsetSliderLIne + "px";
        }
      }, 50 / (steps) * (-1));
     
      activeImage = pressedDot + 1;
      deleteActiveDot();
      dotAll[id].classList.add("active-dot");
    }
    if (currentDot > pressedDot) {
      // => движение слайдов происходит влево
      // => движение контейнера происходит вправо
     
      // вычисления шага для дальнейшего сдвига контейнера
      const steps = (pressedDot - currentDot) * (-1);
      // текущее положение контейнера
      let currentOffsetSliderLIne = parseInt(sliderLine.style.left);
      // то куда должен быть сдвинут контейнер
      const futureOffsetSliderLine = steps * widthSlide + currentOffsetSliderLIne;      
    
      // Запуск анимации перемещения слайда вправо
      const interval = setInterval(function () {
        if (currentOffsetSliderLIne == futureOffsetSliderLine) {
          clearInterval(interval);
        } else {
          currentOffsetSliderLIne += 50;
          sliderLine.style.left = currentOffsetSliderLIne + "px";
        }
      }, 50 / steps);

      activeImage = pressedDot + 1;
      deleteActiveDot();
      dotAll[id].classList.add("active-dot");
    }
  });
});
