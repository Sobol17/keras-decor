$(document).ready(function () {
	const swiper = new Swiper('.main-slider', {
		slidesPerView: 1,
		spaceBetween: 20,
		loop: true,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		speed: 1200,
		navigation: {
			nextEl: '.main-swiper-navigation__button--next',
			prevEl: '.main-swiper-navigation__button--prev',
		},
	})
})
