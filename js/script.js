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

	// Открытие модалки
	$('[data-modal-target]').on('click', function () {
		const targetModal = $(this).data('modal-target')
		$(`.modal-wrapper[data-modal="${targetModal}"]`).removeClass('hide')
	})

	// Закрытие модалки
	$('.modal-wrapper').on('click', '.modal__close', function () {
		$(this).closest('.modal-wrapper').addClass('hide')
	})

	$('.modal-wrapper').on('click', function (e) {
		if ($(e.target).hasClass('modal-wrapper')) {
			$(this).addClass('hide')
		}
	})
})
