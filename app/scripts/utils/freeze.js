// Скрипт "замораживает" страничку, запрещая скролл

export function freeze() {
	if ( document.body.style.top === '' ) { document.body.style.top = `-${window.scrollY}px`; }
	document.body.style.overflow = 'hidden';
	document.body.style.position = 'fixed';
}

export function unfreeze() {
	const scrollY = document.body.style.top;
	document.body.style.removeProperty( 'overflow' );
	document.body.style.removeProperty( 'position' );
	document.body.style.removeProperty( 'top' );
	window.scrollTo( 0, parseInt( scrollY || '0', 10 ) * -1 );
}

export function freezebuttons() {
	document.addEventListener( 'click', '.js-freeze', ( e ) => {
		e.preventDefault();
		freeze();
	} );

	document.addEventListener( 'click', '.js-unfreeze', ( e ) => {
		e.preventDefault();
		unfreeze();
	} );
}
