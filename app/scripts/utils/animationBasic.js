/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-operators */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// let animations = false;

Element.prototype.slideUp = function ( duration = 300 ) {
	const target = this;
	if ( target.offsetHeight === 0 ) return;

	// animations = true;
	// const { margin } = target.style;

	target.style.display = 'block';
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = `${duration}ms`;
	target.style.height = `${target.offsetHeight}px`;
	window.setTimeout( () => {
		target.style.height = '0px';
	}, 10 );
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.style.overflow = 'hidden';

	window.setTimeout( () => {
		target.style.display = 'none';
		target.style.removeProperty( 'height' );
		target.style.removeProperty( 'padding-top' );
		target.style.removeProperty( 'padding-bottom' );
		target.style.removeProperty( 'margin-top' );
		target.style.removeProperty( 'margin-bottom' );
		target.style.removeProperty( 'overflow' );
		target.style.removeProperty( 'transition-duration' );
		target.style.removeProperty( 'transition-property' );

		// animations = false;
	}, duration );
};

Element.prototype.slideDown = function ( duration = 300 ) {
	const target = this;
	if ( target.offsetHeight > 0 ) return;

	// animations = true;

	target.style.removeProperty( 'display' );
	// eslint-disable-next-line prefer-const
	let { display } = window.getComputedStyle( target );

	const {
		marginTop,
		marginBottom,
		paddingTop,
		paddingBottom,
	} = window.getComputedStyle( target );

	if ( display === 'none' ) {
		display = 'block';
	}

	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.display = display;

	const height = target.offsetHeight;
	target.style.height = 0;
	target.style.overflow = 'hidden';
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = `${duration}ms`;

	window.setTimeout( () => {
		target.style.height = `${height}px`;
		target.style.marginTop = marginTop;
		target.style.marginBottom = marginBottom;
		target.style.paddingTop = paddingTop;
		target.style.paddingBottom = paddingBottom;
	}, 10 );

	window.setTimeout( () => {
		target.style.removeProperty( 'height' );
		target.style.removeProperty( 'margin-top' );
		target.style.removeProperty( 'margin-bottom' );
		target.style.removeProperty( 'padding-top' );
		target.style.removeProperty( 'padding-bottom' );
		target.style.removeProperty( 'overflow' );
		target.style.removeProperty( 'transition-duration' );
		target.style.removeProperty( 'transition-property' );
		// animations = false;
	}, duration );
};

Element.prototype.slideToggle = function ( duration = 300 ) {
	if ( window.getComputedStyle( this ).display === 'none' ) {
		return this.slideDown( duration );
	}
	return this.slideUp( duration );
};

/* Плавное появление анимации */

export default function animation() {
	const fade = document.querySelectorAll( '.fade, .fade-top, .fade-left, .fade-bottom, .fade-right' );
	if ( window.innerWidth <= window.globalOptions.md ) {
		fade.forEach( ( item ) => {
			item.classList.remove( 'fade', 'fade-top', 'fade-bottom', 'fade-left', 'fade-right' );
		} );

		return;
	}


	gsap.registerPlugin( ScrollTrigger );

	gsap.utils.toArray( '.fade' ).forEach( ( block, i ) => {
		gsap.timeline( {
			scrollTrigger: {
				trigger: block,
			},
			duration: window.globalOptions.animationDuration,
		} )
			.fromTo( block, { opacity: 0 }, {	opacity: 1 } );
	} );
	gsap.utils.toArray( '.fade-top' ).forEach( ( block, i ) => {
		gsap.timeline( {
			scrollTrigger: {
				trigger: block,
			},
			duration: window.globalOptions.animationDuration,
		} )
			.fromTo( block, { opacity: 0, y: -50 }, {	opacity: 1, y: 0, ease: 'back.out(1.7)' }, 'anim' );
	} );
	gsap.utils.toArray( '.fade-bottom' ).forEach( ( block, i ) => {
		gsap.timeline( {
			scrollTrigger: {
				trigger: block,
			},
			duration: window.globalOptions.animationDuration,
			delay: 0,
		} )
			.fromTo( block, {	opacity: 0, y: 25	}, {	opacity: 1, y: 0, ease: 'back.out(1.7)' }, 'anim' );
	} );
	gsap.utils.toArray( '.fade-left' ).forEach( ( block, i ) => {
		gsap.timeline( {
			scrollTrigger: {
				trigger: block,
			},
			duration: window.globalOptions.animationDuration,
			ease: 'back.out(1.7)',
		} )
			.fromTo( block, { opacity: 0, x: -50 }, {	opacity: 1, x: 0, ease: 'back.out(1.7)' }, 'anim' );
	} );
	gsap.utils.toArray( '.fade-right' ).forEach( ( block, i ) => {
		gsap.timeline( {
			scrollTrigger: {
				trigger: block,
			},
			duration: window.globalOptions.animationDuration,
			ease: 'back.out(1.7)',
		} )
			.fromTo( block, { opacity: 0, x: 50 }, {	opacity: 1, x: 0, ease: 'back.out(1.7)' }, 'anim' );
	} );
}
