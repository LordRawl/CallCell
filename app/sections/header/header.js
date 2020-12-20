
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin( ScrollTrigger );


let Y = 0;
let _headerIsFixed = false;
let isShowMenu = false;
const header = document.querySelector( '.header' );
const menuToggle = document.querySelector( '.js-menu-toggle' );

export function toggleHeader() {
	if ( !header ) return;

	const duration = +window
		.getComputedStyle( header, null )
		.getPropertyValue( 'transition-duration' )
		.replace( 's', '' );

	if ( window.pageYOffset > Y && !_headerIsFixed ) {
		header.style.transitionDuration = '0s';
		header.style.transform = 'translateY(-100%)';
		header.style.position = 'fixed';
		header.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
		_headerIsFixed = true;

		setTimeout( () => {
			header.style.removeProperty( 'transition-duration' );
			header.style.transform = 'translateY(0)';
		}, 10 );
	} else if ( window.pageYOffset <= Y && _headerIsFixed ) {
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
		header.classList.remove( '-open-' );
		menuToggle.classList.remove( '-active-' );

		if ( window.pageYOffset <= Y ) { header.classList.remove( '-bg-' ); }
		if ( window.innerWidth < 641 ) document.body.style.removeProperty( 'overflow' );
	} else {
		header.classList.add( '-open-', '-bg-' );
		menuToggle.classList.add( '-active-' );

		if ( window.innerWidth < 641 ) document.body.style.overflow = 'hidden';
	}

	isShowMenu = !isShow;
}


function _headerAnimInit() {
	gsap
		.timeline( {
			scrollTrigger: {
				trigger: '.header',
				start: 'top top+=10%',
			},
		} )
		.fromTo( ['.header__logo', '.header__item', '.header__call', '.header__button-wrapper'], {
			opacity: 0,
			y: -50,
		}, {
			opacity: 1,
			y: 0,
			stagger: 0.1,
			ease: 'back.out(1.7)',
		} );
}

export default function headerFunc() {
	_headerAnimInit();


	if ( !header ) return;
	/* Показываем/Скрываем фиксированное меню  */

	Y = document.querySelector( '.main' ).getBoundingClientRect().height - 20;

	toggleHeader();

	window.addEventListener( 'scroll', toggleHeader );

	/* Показываем/скрываем меню */

	// const menuField = document.querySelector( '.js-menu-field' );
	if ( !menuToggle ) return;
	menuToggle.addEventListener( 'click', () => {
		toggleMenu( isShowMenu );
	} );

	// window.addEventListener( 'resize', () => {
	// 	if ( window.innerWidth > 641 && isShowMenu ) toggleMenu( true );
	// } );
}
