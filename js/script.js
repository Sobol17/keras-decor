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

	if ($('.product-thumb-swiper').length !== 0) {
		var productThumbsSwiper = new Swiper('.product-thumb-swiper', {
			direction: 'horizontal',
			spaceBetween: 10,
			slidesPerView: 4,
			freeMode: true,
			watchSlidesProgress: true,
			breakpoints: {
				650: {
					direction: 'vertical',
				},
			},
		})
		var productSwiper = new Swiper('.product-swiper', {
			spaceBetween: 10,
			slidesPerView: 1,
			thumbs: {
				swiper: productThumbsSwiper,
			},
		})
	}

	if ($('.product-upsales__swiper').length !== 0) {
		const swiper = new Swiper('.product-upsales__swiper', {
			slidesPerView: 2,
			spaceBetween: 40,
			loop: false,
			navigation: {
				nextEl: '.main-swiper-navigation__button--next',
				prevEl: '.main-swiper-navigation__button--prev',
			},
			breakpoints: {
				867: {
					slidesPerView: 3,
				},
				1220: {
					slidesPerView: 4,
				},
			},
		})
	}

	// burger menu
	$('.header-burger').on('click', function () {
		$('.mobile-burger').addClass('open')
	})

	$('.mobile-burger__close').on('click', function () {
		$('.mobile-burger').removeClass('open')
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

	// range slider
	let initialMin = $('#range-slider').data('initial-min')
	let initialMax = $('#range-slider').data('initial-max')

	if ($('#range-slider')) {
		$('#range-slider').slider({
			range: true,
			min: initialMin,
			max: initialMax,
			values: ['1000', '9000'],
			slide: function (event, ui) {
				$('#min').val(ui.values[0])
				$('#max').val(ui.values[1])
			},
			classes: {
				'ui-slider': 'range-slider',
				'ui-slider-handle': 'range-slider__handle',
				'ui-slider-range': 'range-slider__range',
			},
		})
	}

	// dropdown
	$('.sidebar-filter__title').on('click', function () {
		$(this).parent().toggleClass('open')
	})

	$('.catalog-content__filter--mobile').on('click', function () {
		$('.sidebar').addClass('active')
	})

	$('.catalog-content__grid-2').on('click', function () {
		$('.catalog-list').addClass('col-2')
	})

	$('.catalog-content__grid-3').on('click', function () {
		$('.catalog-list').removeClass('col-2')
	})

	// tabs
	$('.product-tabs__item').on('click', function () {
		var tabId = $(this).data('tab')

		$('.product-tabs__item').removeClass('active')
		$('.product-tabs__content').removeClass('active')

		$(this).addClass('active')
		$('#' + tabId).addClass('active')
	})

	// formatter
	const formatter = new Intl.NumberFormat('ru-RU', {
		style: 'decimal',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})

	// cart item quantity
	const cartItemPlus = $('.cart-item__count .cart-plus')
	const cartItemMinus = $('.cart-item__count .cart-minus')

	cartItemPlus.on('click', function () {
		const price = $(this).parents('.cart-item').data('cart-price')
		const cartItemCounter = $(this)
			.parents('.cart-item')
			.find('.cart-item__count__input')
		const cartItemSumContainer = $(this)
			.parents('.cart-item')
			.find('.cart-item__summ-num')
		let countValue = parseInt(cartItemCounter.val(), 10)

		countValue += 1
		cartItemCounter.val(countValue)
		cartItemSumContainer.text(formatter.format(price * countValue) + '₽')
	})

	cartItemMinus.on('click', function () {
		const price = $(this).parents('.cart-item').data('cart-price')
		const cartItemCounter = $(this)
			.parents('.cart-item')
			.find('.cart-item__count__input')
		const cartItemSumContainer = $(this)
			.parents('.cart-item')
			.find('.cart-item__summ-num')
		let countValue = parseInt(cartItemCounter.val(), 10)

		if (countValue > 1) {
			countValue -= 1
			cartItemCounter.val(countValue)
			cartItemSumContainer.text(formatter.format(price * countValue) + '₽')
		}
	})

	// calculate product sum
	const price = $('[data-price]').data('price')
	const packingSize = $('[data-size]').data('size')

	// ui refs
	const btnMinus = $('.product-controls__count .cart-minus')
	const btnPLus = $('.product-controls__count .cart-plus')
	const countInput = $('.product-controls__count input')
	const areaInput = $('#area-input')
	const actualAreaRef = $('#actual-area')
	const totalSumRef = $('#total-sum')

	function updateUI() {
		const areaValue = parseInt(areaInput.val(), 10) || 0
		const countValue = parseInt(countInput.val(), 10) || 0

		const actualArea = (areaValue * packingSize).toFixed(2) + ' м²'
		const totalSum = formatter.format(price * areaValue)

		actualAreaRef.text(actualArea)
		totalSumRef.text(totalSum)

		countInput.val(Math.ceil(areaValue / packingSize))
	}

	areaInput.on('input', function () {
		let value = parseInt($(this).val(), 10) || 0

		if (value > 9999) {
			value = 9999
			$(this).val(value)
		}

		updateUI()
	})

	countInput.on('input', function () {
		let countValue = parseInt($(this).val(), 10) || 0

		if (countValue < 1) {
			countValue = 1
			$(this).val(countValue)
		}

		const areaValue = countValue * packingSize
		areaInput.val(areaValue)

		updateUI()
	})

	btnPLus.on('click', function () {
		let countValue = parseInt(countInput.val(), 10) || 0
		countValue += 1
		countInput.val(countValue)

		areaInput.val(countValue * packingSize)
		updateUI()
	})

	btnMinus.on('click', function () {
		let countValue = parseInt(countInput.val(), 10) || 0

		if (countValue > 1) {
			countValue -= 1
			countInput.val(countValue)

			areaInput.val(countValue * packingSize)
			updateUI()
		}
	})

	updateUI()

	if ($('[data-fancybox]').length !== 0) {
		Fancybox.bind('[data-fancybox]')
	}
})
