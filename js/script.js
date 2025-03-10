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

	// design circle

	const images = $('.work-content__img img')
	const steps = $('.work-step')
	const prevBtn = $('.work-nav__prev')
	const nextBtn = $('.work-nav__next')

	let circleIndex = 0

	function updateDisplay() {
		images.addClass('hide')
		images.eq(circleIndex).removeClass('hide')
		steps.removeClass('active')
		steps.eq(circleIndex).addClass('active')

		if (window.innerWidth < 650) {
			$('.steps').css(
				'transform',
				`translateX(-50%) rotate(-${90 * circleIndex}deg)`
			)
			if (circleIndex % 2 === 0) {
				steps.css(
					'transform',
					`translateX(-50%) rotate(${90 * circleIndex}deg)`
				)
			} else {
				steps.css(
					'transform',
					`translateY(-50%) rotate(${90 * circleIndex}deg)`
				)
			}
		}
	}

	steps.on('click', function () {
		circleIndex = $(this).index()
		updateDisplay()
	})

	prevBtn.on('click', function () {
		circleIndex = (circleIndex - 1 + images.length) % images.length
		updateDisplay()
	})

	nextBtn.on('click', function () {
		circleIndex = (circleIndex + 1) % images.length
		updateDisplay()
	})

	// tel input mask
	function applyPhoneMask(input) {
		let value = input.value.replace(/\D/g, '')
		let formattedValue = '+7'

		if (value.length > 1) {
			value = value.substring(1)
		}

		if (value.length > 0) {
			formattedValue += '(' + value.substring(0, 3)
		}
		if (value.length > 3) {
			formattedValue += ')-' + value.substring(3, 6)
		}
		if (value.length > 6) {
			formattedValue += '-' + value.substring(6, 8)
		}
		if (value.length > 8) {
			formattedValue += '-' + value.substring(8, 10)
		}

		input.value = formattedValue
	}

	$('input[type="tel"]').on('input', function () {
		applyPhoneMask(this)
	})

	$('input[type="tel"]').on('focus', function () {
		if (!this.value) {
			this.value = '+7'
		}
	})

	$('input[type="tel"]').on('keydown', function (e) {
		if (
			this.value.length >= 17 &&
			e.key !== 'Backspace' &&
			e.key !== 'Delete'
		) {
			e.preventDefault()
		}
	})
})
