/* eslint-disable import/no-unresolved */
/* eslint-disable no-debugger */
import { toggleHeader, toggleMenu } from '@sections/header/header';
// При клике на .js-anchor страница плавно скроллится к блоку, указанному в его href
export default function anchorInit() {
	function ease( t, b, c, d ) {
		let a = t;
		a /= d / 2;
		if ( a < 1 ) return ( c / 2 ) * a * a + b;
		a -= 1;
		return ( -c / 2 ) * ( a * ( a - 2 ) - 1 ) + b;
	}

	function scroll( currTarget, duration = 1000 ) {
		const target = document.querySelector( currTarget );

		if ( !target ) return;

		const targetPosition = target.getBoundingClientRect().top;
		const startPosition = window.pageYOffset;

		let startTime = null;

		function animation( currentTime ) {
			if ( startTime === null ) startTime = currentTime;

			const timeElapsed = currentTime - startTime;
			const run = ease( timeElapsed, startPosition, targetPosition, duration );

			window.scrollTo( 0, run );

			if ( timeElapsed < duration ) requestAnimationFrame( animation );
		}

		requestAnimationFrame( animation );
	}

	document.addEventListener( 'click', ( e ) => {
		const anchor = e.target.closest( '.js-anchor' );

		if ( !anchor ) return;

		e.preventDefault();
		const target = anchor.getAttribute( 'href' );

		scroll( target, 1000 );
		toggleHeader();
		toggleMenu( true );
	} );
}
