$(function () {

  $('.top-slider__list').slick({
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: true,
    useTransform: true,
    speed: 900,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [{
      breakpoint: 1200,
      settings: {
        arrows: false,
        slidesToShow: 2,
        slidesToScroll: 2,
      }
    }, {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    }]
  });

  $('.slider-bottom__list').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    fade: false,
    infinite: false,
    useTransform: true,
    speed: 400,
    cssEase: 'cubic-bezier(0.77, 0, 0.18, 1)',
    responsive: [{
      breakpoint: 1200,
      settings: {
        arrows: false,
        dots: true
      }
    }]
  });

  $('.slider-bottom__content')
    .on('init', function (event, slick) {
      $('.slider-bottom__content .slick-slide.slick-current').addClass('is-active');
    })
    .slick({
      slidesToShow: 9,
      arrows: false,
      dots: false,
      focusOnSelect: false,
      infinite: false,
    });

  $('.slider-bottom__list').on('afterChange', function (event, slick, currentSlide) {
    $('.slider-nav').slick('slickGoTo', currentSlide);
    var currrentNavSlideElem = '.slider-bottom__content .slick-slide[data-slick-index="' + currentSlide + '"]';
    $('.slider-bottom__content .slick-slide.is-active').removeClass('is-active');
    $(currrentNavSlideElem).addClass('is-active');
  });

  $('.slider-bottom__content').on('click', '.slick-slide', function (event) {
    event.preventDefault();
    var goToSingleSlide = $(this).data('slick-index');

    $('.slider-bottom__list').slick('slickGoTo', goToSingleSlide);
  });

});

function getTimeRemaining(endtime) {
  const total = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
    hours,
    minutes,
    seconds
  };
}

function initializeClock(id, endtime) {
  const clock = document.getElementById(id);
  const daysSpan = clock.querySelector('.days');
  const hoursSpan = clock.querySelector('.hours');
  const minutesSpan = clock.querySelector('.minutes');
  const secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    const t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  const timeinterval = setInterval(updateClock, 1000);
}

// const deadline = "December 30 2022 14:00:00 GMT+0300";
const deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
initializeClock('clockdiv', deadline);