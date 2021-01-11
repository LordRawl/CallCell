
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin( ScrollTrigger );

export default function headerAnimation() {
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
		}, 'begin' );
}
