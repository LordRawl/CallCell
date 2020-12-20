/* eslint-disable no-useless-escape */
/* eslint-disable no-param-reassign */

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
	const inputs = document.querySelectorAll( '.form-group__input' );

	if ( !inputs ) return;

	inputs.forEach( ( input ) => {
		input.addEventListener( 'input', ( e ) => {
			_removeError( e.target );
		} );
	} );
}

function _formsInit() {
	const forms = document.querySelectorAll( 'form' );

	if ( !forms ) return;

	forms.forEach( ( form ) => {
		form.addEventListener( 'submit', ( e ) => {
			e.preventDefault();
			const $this = e.target;
			let isError = false;
			const isAccept = !!+$this
				.querySelector( '[data-form-checkbox]' )
				.getAttribute( 'data-form-checkbox' );

			$this.querySelectorAll( '[name]' ).forEach( ( input ) => {
				const name = input.getAttribute( 'name' );
				const { value } = input;

				if ( !VALID[name].test( value ) ) {
					_setError( input );
					isError = true;
				}
			} );

			if ( isError || !isAccept ) return;

			console.log( 'Форма прошла валидацию' );
		} );
	} );
}

( function validation( ) {
	_inputsInit();

	_formsInit();
}() );
