/* eslint-disable no-useless-escape */
/* eslint-disable no-param-reassign */
const { STATE } = window;

const ERRORS = {
	email: 'Email введен неправильно',
	phone: 'Телефон введен неправильно',
};

const VALID = {
	email: /([a-z0-9]+[_a-z0-9\.-]*[a-z0-9]+)@([a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-z]{2,4})/,
	phone: /^([\+]?[0-9]?[\s]?)[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2}[-\s\.]?[0-9]{2}$/,
};

function _setError( input ) {
	const group = input.closest( '[data-form-group]' );
	const errorBlock = group.querySelector( '.form-group__error' );
	const name = input.getAttribute( 'name' );

	group.classList.add( 'form-group--error' );
	errorBlock.innerHTML = ERRORS[name];
}

function _removeError( input ) {
	const group = input.closest( '[data-form-group]' );
	const errorBlock = group.querySelector( '.form-group__error' );

	group.classList.remove( 'form-group--error' );
	errorBlock.innerHTML = '';
}

function _inputsInit() {
	document.addEventListener( 'input', ( e ) => {
		if ( !e.target.closest( '.form-group__input' ) ) return;
		_removeError( e.target );
	} );
}

function _formsInit() {
	document.addEventListener( 'submit', ( e ) => {
		if ( !e.target.closest( 'form' ) ) return;

		e.preventDefault();

		const $this = e.target;
		let isError = false;
		const sendData = {};

		const isAccept = !!+$this
			.querySelector( '[data-form-checkbox]' )
			.getAttribute( 'data-form-checkbox' );

		$this.querySelectorAll( '[name]' ).forEach( ( input ) => {
			const name = input.getAttribute( 'name' );
			const { value } = input;

			sendData[name] = value.trim();

			if ( !VALID[name].test( value ) ) {
				_setError( input );
				isError = true;
			}
		} );

		if ( isError || !isAccept ) return;

		console.log( 'Форма прошла валидацию' );
		console.log( sendData );

		/* Если нужно, то собирать данные с формы калькулятора можно так: */
		if ( $this.dataset.form && $this.dataset.form === 'calc' ) {
			const tabs = Array.from( $this.parentNode.querySelectorAll( '[data-tab]' ) );

			const STATE_NAMES = tabs.map( ( item ) => item.dataset.tab );

			const activeSlide = STATE_NAMES.find( ( name ) => STATE[name].active );
			console.log( STATE[activeSlide].data );
		}
	} );
}

( function validation( ) {
	_inputsInit();

	_formsInit();
}() );
