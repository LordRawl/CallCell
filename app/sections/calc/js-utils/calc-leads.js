/* eslint-disable no-unused-vars */
/* eslint-disable no-fallthrough */
import numberFormat from '../../../scripts/utils/numberFormat';

const { STATE } = window;

const leads = {};
STATE.leads = leads;

const data = {
	calls: 0,
	hours: 0,
	days: 0,
	script: 0,
	time: 0,
	crm: 0,
	messangers: 0,
	letters: 0,
};
leads.data = data;

/* Добавляем активный флаг, чтобы потом по нему искать данные для отправки формы */
leads.active = true;


function _setResultTemplate( _result, isPacket ) {
	const arrow = !isPacket
		? ` <svg class="calc__arrow" viewBox="0 0 172.46 81.87">
					<path class="calc__arrow-line" d="M.33,47.37C15.89,60.88,31.11,63.62,51.14,62.59c27.92-.9,40.53-13.52,74.17-17.86C157,43.4,166.79,66.15,153.19,77.81c-16.73,12.29-39.69-9.18-29.13-35.09,9.57-20.15,27.24-23,47.17-41.46"></path>
					<polyline class="calc__arrow-pike" points="167.59 1.89 171.74 0.72 170.55 4.85"></polyline>
				</svg> `
		: '';

	const text = isPacket
		? '<span class="color--main">Поздравляем!</span> Вам доступно пакетное предложение'
		: 'Прогнозируемая стоимость';
	const textClass = isPacket ? 'calc__text--max--xl' : 'calc__text--max--md';
	const result = isPacket ? `от ${_result}` : _result;
	const template = `
		<p class="calc__text ${textClass}">${text}</p>
		<p class="calc__price">
			<span class="calc__price-numb" data-calc-output="leads">${result}</span> ₽<sup class="calc__price-symb">*</sup>
		</p>
		${arrow}
		<p class="calc__anno">*Не является офертой. Расчет является предварительным. </p>
	`;

	const wrapper = document.querySelector( '[data-calc-wrapper="leads"]' );
	wrapper.innerHTML = template;
}

const recalc = ( ) => {
	const {
		calls,
		hours,
		days,
		script,
		crm,
		messangers,
		letters,
	} = data;
	let { time } = data;


	time += crm + messangers + letters;
	let result = calls * time * 7 + script;

	result = result < 8400 ? 8400 : result;
	result = numberFormat( Math.ceil( +result ) );

	switch ( true ) {
	case ( calls === 300 && hours === 8 && days === 22 && time === 2 ):
		_setResultTemplate( '8 400', true );
		break;
	case ( calls === 500 && hours === 8 && days === 22 && time === 3 ):
		_setResultTemplate( '12 500', true );
		break;
	case ( calls === 800 && hours === 8 && days === 28 && time === 4 ):
		_setResultTemplate( '19 800', true );
		break;

	default:
		_setResultTemplate( result );
		break;
	}
};

leads.setData = ( { path, value } ) => {
	leads.data[path] = +value;

	recalc();
};
