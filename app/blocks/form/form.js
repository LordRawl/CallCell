/* eslint-disable no-unused-vars */
import './validationForm';
import Checkbox from './checkbox';

function _checkboxInit() {
	const checkboxes = document.querySelectorAll( '[data-form-checkbox]' );

	if ( !checkboxes ) return;

	checkboxes.forEach( ( checkbox ) => {
		const el = new Checkbox( checkbox, {
			active: true,
			onInit( element, value ) {
				element.setAttribute( 'data-form-checkbox', value );
			},
			onToggle( element, value ) {
				element.setAttribute( 'data-form-checkbox', value );
			},
		} );
	} );
}

function _inputFocusable() {
	const inputs = document.querySelectorAll( '.form-group__input' );

	if ( !inputs ) return;

	inputs.forEach( ( input ) => {
		const group = input.closest( '[data-form-group]' );
		input.addEventListener( 'focus', ( ) => {
			group.classList.add( 'form-group--focus' );
		} );
		input.addEventListener( 'blur', ( ) => {
			group.classList.remove( 'form-group--focus' );
		} );
		input.addEventListener( 'input', ( ) => {
			if ( input.value.length !== 0 ) {
				group.classList.add( 'form-group--active' );
			} else {
				group.classList.remove( 'form-group--active' );
			}
		} );
	} );
}

export default function formFunc() {
	_inputFocusable();

	_checkboxInit();
}
