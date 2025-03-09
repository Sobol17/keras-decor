$(document).ready(function () {
	if ($('.main-slider').length !== 0) {
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
	}

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

	// custom select
	$('.custom-select .selected-option').click(function () {
		$(this).parent().toggleClass('open')
	})

	$('.custom-select .options li').click(function () {
		var value = $(this).data('value')
		var text = $(this).text()
		$(this)
			.closest('.custom-select')
			.find('.selected-option span:first')
			.text(text)
		$(this).closest('.custom-select').removeClass('open')
	})

	$(document).click(function (e) {
		if (!$(e.target).closest('.custom-select').length) {
			$('.custom-select').removeClass('open')
		}
	})
})
