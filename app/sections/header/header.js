let Y = 0;
let _headerIsFixed = false;
let isShowMenu = false;
const header = document.querySelector( '.header' );
const menuToggle = document.querySelector( '[data-menu-toggle]' );

export function toggleHeader() {
	if ( !header ) return;

	const duration = +window
		.getComputedStyle( header, null )
		.getPropertyValue( 'transition-duration' )
		.replace( 's', '' );

	if ( window.pageYOffset > Y && !_headerIsFixed && window.innerWidth > 960 ) {
		header.style.transitionDuration = '0s';
		header.style.transform = 'translateY(-100%)';
		header.style.position = 'fixed';
		header.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
		_headerIsFixed = true;

		setTimeout( () => {
			header.style.removeProperty( 'transition-duration' );
			header.style.transform = 'translateY(0)';
		}, 10 );
	} else if ( window.pageYOffset <= Y && _headerIsFixed && window.innerWidth > 960 ) {
		header.style.transform = 'translateY(-100%)';
		_headerIsFixed = false;

		setTimeout( () => {
			header.style.removeProperty( 'position' );
			header.style.removeProperty( 'transform' );
			header.style.removeProperty( 'box-shadow' );
		}, duration * 1000 );
	}
}

export function toggleMenu( isShow ) {
	if ( !header ) return;

	if ( isShow ) {
		header.classList.remove( 'header--open' );
		menuToggle.classList.remove( 'toggle--active' );

		if ( window.innerWidth < 641 ) document.body.style.removeProperty( 'overflow' );
	} else {
		header.classList.add( 'header--open' );
		menuToggle.classList.add( 'toggle--active' );

		if ( window.innerWidth < 641 ) document.body.style.overflow = 'hidden';
	}

	isShowMenu = !isShow;
}

export default function headerInit() {
	if ( !header ) return;

	const showHeaderAfterThisBlock = header.nextElementSibling.firstElementChild;

	Y = showHeaderAfterThisBlock.getBoundingClientRect().height - 20;

	/* Показываем/Скрываем фиксированное меню  */
	toggleHeader();

	window.addEventListener( 'scroll', toggleHeader );

	/* Показываем/скрываем меню */
	if ( !menuToggle ) return;
	menuToggle.addEventListener( 'click', () => {
		toggleMenu( isShowMenu );
	} );
}
