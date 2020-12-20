/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import './js-utils/calc-leads';
import './js-utils/calc-manager';
import './js-utils/calc-sales';
import Switch from '@blocks/form/switch';
import Checkbox from '@blocks/form/checkbox';
import numberFormat from '../../scripts/utils/numberFormat';
import _animation from './js-utils/calc-animation';

const { STATE } = window;
STATE.switchers = [];
STATE.checkboxes = [];

function _currentName( monthsCur, namesArray ) {
	if ( !monthsCur ) return null;
	if ( monthsCur % 10 === 1 && monthsCur !== 11 ) return `${monthsCur} ${namesArray[0]}`;

	if ( monthsCur % 10 >= 2
    && monthsCur % 10 <= 4
    && ( monthsCur < 11 || monthsCur > 14 )
	) return `${monthsCur} ${namesArray[1]}`;

	return `${monthsCur} ${namesArray[2]}`;
}

function _outputTime( time ) {
	let newValue;

	if ( time <= 59 ) {
		newValue = `${time} мин`;
	} else {
		const hourNumb = Math.floor( time / 60 );
		const hour = _currentName( hourNumb, ['час', 'часа', 'часов'] );
		const min = time - hourNumb * 60 !== 0 ? `${time - hourNumb * 60} мин` : '';

		newValue = `${hour} ${min}`;
	}

	return newValue;
}

function _output( { value, type } ) {
	let newValue;

	switch ( type ) {
	case 'time':
		newValue = _outputTime( +value );
		break;
	default:
		newValue = numberFormat( +value );
		break;
	}

	return newValue;
}

function _rangesInit() {
	const ranges = document.querySelectorAll( '.js-range' );

	if ( !ranges ) return;

	[].forEach.call( ranges, ( range ) => {
		range.noUiSlider.on( 'update', ( rangeVal ) => {
			if ( !range.closest( '[data-range-wrapper]' ) ) return;

			const counter = range
				.closest( '[data-range-wrapper]' )
				.querySelector( '[data-range-counter]' );
			const calcTarget = range.closest( '[data-calc-store]' ).dataset.calcStore;
			const type = range.dataset.rangeType;

			if ( STATE[calcTarget] ) {
				STATE[calcTarget].setData( { path: type, value: rangeVal } );
			}

			counter.innerHTML = _output( { value: rangeVal, type } );
		} );
	} );
}

function _setStoreSwitchValues( { element, value } ) {
	const calcTarget = element.closest( '[data-calc-store]' ).dataset.calcStore;
	const path = element.dataset.switchType;

	if ( STATE[calcTarget] ) {
		STATE[calcTarget].setData( { path, value } );
	}
}

function _switchInit() {
	const switches = document.querySelectorAll( '[data-calc-switch]' );

	if ( !switches ) return;

	switches.forEach( ( switcher ) => {
		const el = new Switch( switcher, {
			onInit( element, value ) {
				_setStoreSwitchValues( { element, value } );
			},
			onToggle( element, value, isActive ) {
				_setStoreSwitchValues( { element, value } );

				/* Отдельный костыль нужен, чтобы переключать чекбокс "лпр" в неактив */
				if ( element.dataset.switchType === 'client' && !isActive ) {
					const switchConnect = document.querySelector( `[data-checkbox-connect="${element.dataset.switchType}"]` );

					if ( switchConnect ) {
						const target = STATE.checkboxes.find( ( item ) => item.getEl === switchConnect );
						target.toggle( false );
						target.change( );
					}
				}
			},
		} );

		STATE.switchers.push( el );
	} );
}

function _checkboxInit() {
	const checkboxes = document.querySelectorAll( '[data-calc-checkbox]' );

	if ( !checkboxes ) return;

	checkboxes.forEach( ( checkbox ) => {
		const el = new Checkbox( checkbox, {
			onToggle( element, value, isActive ) {
				const calcTarget = element.closest( '[data-calc-store]' ).dataset.calcStore;
				const path = element.dataset.checkboxType;

				if ( STATE[calcTarget] ) {
					STATE[calcTarget].setData( { path, value } );
				}

				/* Отдельный костыль нужен чтобы переключать свичер "ваш клиент" в положение "юр лицо" */
				if ( path === 'lpr' && isActive ) {
					const switchConnect = document.querySelector( `[data-switch-connect="${path}"]` );

					if ( switchConnect ) {
						const target = STATE.switchers.find( ( item ) => item.getEl === switchConnect );
						target.toggle( true );
						target.change( );
					}
				}

				/* Отдельный костыль нужен
					чтобы дизейблить ренж "Средняя продолжительность разговора" */
				if ( path === 'time' ) {
					const rangeConnect = document.querySelector( `[data-range-connect="${path}"]` );

					if ( isActive ) {
						rangeConnect.setAttribute( 'disabled', true );
					} else {
						rangeConnect.removeAttribute( 'disabled' );
						/* Возвращаем значение из ренжа в калькулятор в стор */
						const rangeVal = +rangeConnect.querySelector( '[aria-valuenow]' ).getAttribute( 'aria-valuenow' );
						const rangeCalcTarget = rangeConnect.closest( '[data-calc-store]' ).dataset.calcStore;
						const { rangeType } = rangeConnect.querySelector( '[data-range-type]' ).dataset;

						if ( STATE[rangeCalcTarget] ) {
							STATE[rangeCalcTarget].setData( { path: rangeType, value: rangeVal } );
						}
					}
				}
			},
		} );

		STATE.checkboxes.push( el );
	} );
}

export default function calcFunc() {
	_rangesInit();

	_switchInit();

	_checkboxInit();

	_animation();
}
