/* eslint-disable import/no-unresolved */
/* eslint-disable radix */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable no-param-reassign */
import Swiper from 'swiper';

const { STATE } = window;

function _tabsSliderInit() {
	/* Все опции слайдеров запишу в одно место, чтобы не плодить код */

	const swiperOptions = {
		slidesPerView: 3,
		spaceBetween: 10,
		breakpoints: {
			600: {
				slidesPerView: 2.5,
				spaceBetween: 30,
			},
			480: {
				slidesPerView: 2.2,
				spaceBetween: 10,
			},
			320: {
				slidesPerView: 2.2,
				spaceBetween: 10,
			},
		},
	};

	let thSlider;
	let isMobile = false;
	const contents = document.querySelectorAll( '.tabs__wrapper' );

	/* В зависимости от ширины экрана будем показывать разные слайдеры */
	function setSwiper() {
		if ( contents.length === 0 ) return;

		if ( window.innerWidth < 1201 ) {
			if ( isMobile ) return;

			thSlider = new Swiper( '.tabs__wrapper', swiperOptions );

			isMobile = true;
		} else {
			if ( !isMobile && thSlider !== undefined ) return;

			/* Уничтожаем старый слайдер, если он определен */
			if ( thSlider !== undefined ) { thSlider.destroy( true, true ); }

			isMobile = false;
		}
	}

	setSwiper();

	/* При изменениях окна также перестроим слайдеры */
	window.addEventListener( 'resize', setSwiper );
}

export function setTabActive( tab ) {
	if ( tab.classList.contains( 'tabs__item--active' ) ) return;

	tab.classList.add( 'tabs__item--active' );

	/* Удаляем активный класс у всех табов */
	for ( let i = 0; i < tab.parentElement.children.length; i++ ) {
		const tabItem = tab.parentElement.children[i];

		if ( tabItem !== tab ) tabItem.classList.remove( 'tabs__item--active' );
	}

	/* Находим нужный блок и ставим ему активный класс, попутно убирая такой у всех остальных */
	const targetTab = tab.getAttribute( 'data-tab-target' );
	const targetContentBlock = document.querySelector( `[data-tab="${targetTab}"]` );
	const tabGroupName = targetContentBlock.getAttribute( 'data-tab-group' );
	const tabGroupBlocks = document.querySelectorAll( `[data-tab-group="${tabGroupName}"]` );

	tabGroupBlocks.forEach( ( contentBlock ) => {
		if ( contentBlock !== targetContentBlock ) contentBlock.classList.remove( 'tabs-content__wrapper--active' );

		/* Небольшой хак для калькулятора, чтобы отправлять данные с него в форме */
		const STATE_CALC_NAME = contentBlock.getAttribute( 'data-tab' );
		STATE[STATE_CALC_NAME].active = false;
	} );

	STATE[targetTab].active = true;
	targetContentBlock.classList.add( 'tabs-content__wrapper--active' );
}

export default function tabsBlock( ) {
	document.addEventListener( 'click', ( e ) => {
		if ( !e.target.closest( '[data-tab-target]' ) ) return;

		const tab = e.target.closest( '[data-tab-target]' );
		setTabActive( tab );
	} );

	_tabsSliderInit();
}
