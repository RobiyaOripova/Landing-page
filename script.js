const navbarToggler = document.querySelector(".navbar-toggler");
const navbarMenu = document.querySelector(".navbar");

navbarToggler.addEventListener("click", navbarTogglerClick);

function navbarTogglerClick() {
  navbarToggler.classList.toggle("open-navbar-toggler");
  navbarMenu.classList.toggle("active");
}

//header slider
("use strict");

let prev = document.querySelector(".prev");
let next = document.querySelector(".next");
let slidesItem = document.querySelector(".slides");
let dotsItem = document.getElementsByClassName("slider-dots_item");
let dots = document.querySelector(".slider-dots");
let sliderButton = document.querySelectorAll(".slider-arrow");

let miniSlideItem = document.querySelector(".mini-slider__slides");
let miniDotsItem = document.getElementsByClassName("mini-slider-dots_item");
let miniDots = document.querySelector(".mini-slider__dots");

let slider = document.querySelector(".slider");
let miniSlider = document.querySelector(".mini-slider");

let modal = document.querySelector(".modal");
let link = document.querySelector(".modal-link");

let slides = document.querySelectorAll(".slider-item");
let indent = slides.length;
let index = 0;

slidesItem.style.width = indent * 100 + "%";

// console.log(dotsItem);

//let modalImg = document.querySelector('.modal-image');

for (let i = 0; i < slides.length; i++) {
  let createDot = document.createElement("span");
  let createMinieDot = document.createElement("span");
  dots.appendChild(createDot);
  miniDots.appendChild(createMinieDot);
  createDot.className = "slider-dots_item";
  createMinieDot.className = "mini-slider-dots_item";
}

dotsItem[0].classList.add("active");
miniDotsItem[0].classList.add("active");
// console.log(dotsItem[0]);
// dotsItem[0].classList.add('active');

let scrollSliderFunc = function (n) {
  index += n;

  if (index <= -indent * 100) {
    index = 0;
  } else if (index > 0) {
    index = -indent * 100;
  }

  // if (index <= -400) {
  //     index = 0;
  // } else if (index > 0) {
  //     index = -300;
  // }

  slidesItem.style.left = `${index}%`;
  miniSlideItem.style.left = `${index}%`;

  for (let dot of dotsItem) {
    dot.classList.remove("active");
  }
  dotsItem[-index / 100].classList.add("active");
  for (let miniDot of miniDotsItem) {
    miniDot.classList.remove("active");
  }
  miniDotsItem[-index / 100].classList.add("active");
};
let dotScrollFunc = function (n) {
  scrollSliderFunc((index = -((n * 100) / 2)));
};

prev.addEventListener("click", function () {
  scrollSliderFunc(100);
});
next.addEventListener("click", function () {
  scrollSliderFunc(-100);
});
dots.addEventListener("click", function (e) {
  for (let i = 0; i < dotsItem.length; i++) {
    if (
      e.target.classList.contains("slider-dots_item") &&
      e.target == dotsItem[i]
    ) {
      dotScrollFunc(i);
    }
  }
  // clearInterval(interval);
  // clearTimeout(timeout);
  // timeout = setTimeout(function() {
  //   interval = setInterval(() => scrollFunc(-100), 3000); }, 3000);
});

miniDots.addEventListener("click", function (e) {
  for (let i = 0; i < miniDotsItem.length; i++) {
    if (
      e.target.classList.contains("mini-slider-dots_item") &&
      e.target === miniDotsItem[i]
    ) {
      dotScrollFunc(i);
    }
  }
});

let interval = setInterval(function () {
  scrollSliderFunc(-100);
}, 3000);

slider.addEventListener("mouseover", function () {
  for (let i = 0; i < sliderButton.length; i++) {
    sliderButton[i].style.opacity = "1";
  }
  clearInterval(interval);
});

miniSlider.addEventListener("mouseover", function () {
  clearInterval(interval);
});

slider.addEventListener("mouseout", function () {
  for (let i = 0; i < sliderButton.length; i++) {
    sliderButton[i].style.opacity = "0";
  }
  interval = setInterval(function () {
    scrollSliderFunc(-100);
  }, 3000);
});

window.addEventListener("click", function (e) {
  if (event.target === modal) {
    modal.style.display = "none";
    interval = setInterval(function () {
      scrollSliderFunc(-100);
    }, 3000);
  }
});

//header slider end
//calendar
setInterval(function () {
  getId("do-time").innerHTML = formatTime();
}, 1000);

function formatTime() {
  var d = new Date(),
    minutes =
      d.getMinutes().toString().length == 1
        ? "0" + d.getMinutes()
        : d.getMinutes(),
    hours =
      d.getHours().toString().length == 1 ? "0" + d.getHours() : d.getHours(),
    ampm = d.getHours() >= 12 ? "" : "",
    months = [
      "Январь",
      "Февраль",
      "Март",
      "Апрел",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ],
    days = [
      "Воскресенье",
      "Понедельник",
      "Вторник",
      "Среда",
      " Четверг",
      "Пятница",
      " Суббота",
    ];

  return (
    "<h2>" +
    hours +
    "<span>:" +
    minutes +
    "</span></h2><small>" +
    ampm +
    "</small><h3>" +
    days[d.getDay()] +
    "<span>" +
    months[d.getMonth()] +
    " " +
    d.getDate() +
    "</span>" +
    d.getFullYear() +
    "</h3>"
  );
}

var Cal = function (divId) {
  this.divId = divId;

  this.DaysOfWeek = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

  this.Months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрел",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  var d = new Date();

  this.currMonth = d.getMonth();
  this.currYear = d.getFullYear();
  this.currDate = d.getDate();
  this.currD = d.getDay();
};

Cal.prototype.nextMonth = function () {
  if (this.currMonth == 11) {
    this.currMonth = 0;
    this.currYear = this.currYear + 1;
  } else {
    this.currMonth = this.currMonth + 1;
  }
  this.showcurr();
};

Cal.prototype.previousMonth = function () {
  if (this.currMonth == 0) {
    this.currMonth = 11;
    this.currYear = this.currYear - 1;
  } else {
    this.currMonth = this.currMonth - 1;
  }
  this.showcurr();
};

Cal.prototype.showcurr = function () {
  this.showMonth(this.currYear, this.currMonth);
};

Cal.prototype.showMonth = function (y, m) {
  var chk = new Date();
  var chkY = chk.getFullYear();
  var chkM = chk.getMonth();

  var d = new Date(),
    firstDayOfMonth = new Date(y, m, 1).getDay(),
    lastDateOfMonth = new Date(y, m + 1, 0).getDate(),
    lastDayOfLastMonth =
      m == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();

  var html = "<table>";

  html += "<thead><tr>";
  html += '<td colspan="7">' + this.Months[m] + " " + y + "</td>";
  html += "</tr></thead>";

  html += '<tr class="days">';
  for (var i = 0; i < this.DaysOfWeek.length; i++) {
    if (chkY == this.currYear && chkM == this.currMonth && i == this.currD) {
      html += '<td class="today">' + this.DaysOfWeek[i] + "</td>";
    } else {
      html += "<td>" + this.DaysOfWeek[i] + "</td>";
    }
  }
  html += "</tr>";

  var i = 1;
  do {
    var dow = new Date(y, m, i).getDay();

    if (dow == 0) {
      html += "<tr>";
    } else if (i == 1) {
      html += "<tr>";
      var k = lastDayOfLastMonth - firstDayOfMonth + 1;
      for (var j = 0; j < firstDayOfMonth; j++) {
        html += '<td class="not-current">' + k + "</td>";
        k++;
      }
    }

    if (chkY == this.currYear && chkM == this.currMonth && i == this.currDate) {
      html += '<td class="today">' + i + "</td>";
    } else {
      html += '<td class="normal">' + i + "</td>";
    }
    if (dow == 6) {
      html += "</tr>";
    } else if (i == lastDateOfMonth) {
      var k = 1;
      for (dow; dow < 6; dow++) {
        html += '<td class="not-current">' + k + "</td>";
        k++;
      }
    }

    i++;
  } while (i <= lastDateOfMonth);

  html += "</table>";

  document.getElementById(this.divId).innerHTML = html;
};

window.onload = function () {
  var c = new Cal("divCal");
  c.showcurr();

  getId("btnNext").onclick = function () {
    c.nextMonth();
  };
  getId("btnPrev").onclick = function () {
    c.previousMonth();
  };
};

function getId(id) {
  return document.getElementById(id);
}
