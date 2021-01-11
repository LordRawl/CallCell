/* eslint-disable no-unused-vars */
import './validationAndSubmitForm';
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

Element.prototype.multipleEventListeners = function ( events, listener ) {
	events.forEach( ( event ) => {
		this.addEventListener( event, listener, false );
	} );
};

function _inputFocusable() {
	document.body.multipleEventListeners( ['input', 'focusin', 'focusout'], ( e ) => {
		const input = e.target.closest( '.form-group__input' );

		if ( !input ) return;

		const group = input.closest( '[data-form-group]' );

		if ( e.type === 'input' ) {
			if ( input.value.length !== 0 ) {
				group.classList.add( 'form-group--active' );
			} else {
				group.classList.remove( 'form-group--active' );
			}
		} else if ( e.type === 'focusin' ) {
			group.classList.add( 'form-group--focus' );
		} else if ( e.type === 'focusout' ) {
			group.classList.remove( 'form-group--focus' );
		}
	} );
}

export default function formFunc() {
	_inputFocusable();

	_checkboxInit();
}
