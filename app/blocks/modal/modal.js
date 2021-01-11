/* eslint-disable no-unused-vars */
/* eslint-disable radix */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
import Checkbox from '../form/checkbox';

let modalBlock = null;

function _checkboxInit() {
	const checkbox = modalBlock.querySelector( '[data-form-checkbox]' );

	const el = new Checkbox( checkbox, {
		active: true,
		onInit( element, value ) {
			element.setAttribute( 'data-modal-form-checkbox', value );
		},
		onToggle( element, value ) {
			element.setAttribute( 'data-modal-form-checkbox', value );
		},
	} );
}

const MODAL_STORE = {
	logout: {
		title: '<span class="color--main">Подождите!</span> Узнайте 10 преимуществ КЦ перед наёмным сотрудником',
		subtitle: 'Оставьте свои контакты и мы отправим подробный чек-лист сравнения',
		button: 'Подробный расчёт',
	},
	present: {
		title: 'Узнайте 10 преимуществ КЦ перед наёмным сотрудником',
		subtitle: 'Оставьте свои контакты и мы отправим подробный чек-лист сравнения',
		button: 'Подробный расчёт',
	},
	price: {
		title: 'Получите подробный расчёт стоимости',
		button: 'Получить',
	},
};

let isModalOpen = false;

function _modalTemplate( block ) {
	const title = MODAL_STORE[block].title
		? `<h3 class="form__title modal__title">${MODAL_STORE[block].title}</h3>`
		: '';
	const subtitle = MODAL_STORE[block].subtitle
		? `<p class="form__subtitle">${MODAL_STORE[block].subtitle}</p>`
		: '';
	const buttonText = MODAL_STORE[block].button
		? `<span class="button__text">${MODAL_STORE[block].button}</span>`
		: '';


	return `<div class="modal__container">
		<div class="modal__close" data-modal-close="">
			<svg class="modal__close-icon">
				<use xlink:href="assets/images/icon.svg#icon_close"></use>
			</svg>
		</div>
		<div class="modal__content">
			<div class="modal__img-wrapper">
				<picture class="modal__img">
					<source srcset="assets/images/modal-bg.webp" type="image/webp" >
					<img src="assets/images/modal-bg.png" alt="Лера Козлова с подарками" width="610" height="585" >
				</picture>
			</div>
			<form class="form form--theme--dark modal__form">
				${title}
				${subtitle}
				<div class="form-group" data-form-group="">
					<label class="form-group__wrapper">
						<p class="form-group__title">Контактный номер</p>
						<input class="form-group__input" aria-label="Контактный номер" name="phone" type="text">
						<p class="form-group__error">Неверное значение</p>
					</label>
				</div>
				<div class="form-group" data-form-group="">
					<label class="form-group__wrapper">
						<p class="form-group__title">Ваша почта</p>
						<input class="form-group__input" aria-label="Ваша почта" name="email" type="text">
						<p class="form-group__error">Неверное значение</p>
					</label>
				</div>
				<div class="form-group" data-form-group="">
					<button class="button button--size--xl form-group__button" type="submit">
						<div class="button__block">
							${buttonText}
						</div>
					</button>
				</div>
				<div class="form__accept">
					<label class="checkbox checkbox--size--md checkbox--active" data-form-checkbox="1" data-checkbox-type="accept">
						<span class="checkbox__box">
							<svg class="checkbox__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.5 11.5">
								<path class="icon-line" d="M1.25 3.48l2.2 6.77c1.5-3.41 3-6.51 5.8-9"></path>
							</svg>
						</span>
						<p class="form__accept-text">Я принимаю условия <a class="form__accept-link" href="#" target="_blank">передачи информации</a>
						</p>
					</label>
				</div>
			</form>
		</div>
	</div>`;
}

const modalHandler = {
	open: ( block ) => {
		modalBlock.innerHTML = _modalTemplate( block );

		const container = document.querySelector( '.modal__container' );

		if ( document.body.style.top === '' ) { document.body.style.top = `-${window.scrollY}px`; }
		document.body.style.overflow = 'hidden';
		document.body.style.position = 'fixed';
		modalBlock.style.display = 'block';

		/* Добавляем и удаляем класс, чтобы сработала анимация */
		if ( container ) {
			container.classList.add( 'modal__container--close' );
			container.style.display = 'block';

			setTimeout( () => {
				container.classList.remove( 'modal__container--close' );
			}, 1 );
		}

		_checkboxInit();

		isModalOpen = true;
	},
	close: () => {
		modalBlock.style.display = 'none';
		const scrollY = document.body.style.top;
		document.body.style.removeProperty( 'overflow' );
		document.body.style.removeProperty( 'position' );
		document.body.style.removeProperty( 'top' );
		window.scrollTo( 0, parseInt( scrollY || '0' ) * -1 );

		isModalOpen = false;
	},
};

function _showModalOnUserOffset() {
	window.onload = () => {
		let isModalLogoutOpening = false;

		document.addEventListener( 'mouseleave', ( e ) => {
			if ( isModalOpen || isModalLogoutOpening || e.clientY > 10 ) return;

			modalHandler.open( 'logout' );
			isModalLogoutOpening = true;
		} );
	};
}


export default function modalFunc() {
	const buttons = document.querySelectorAll( '[data-modal-target]' );
	modalBlock = document.querySelector( '.modal' );

	if ( !modalBlock ) return;

	[].forEach.call( buttons, ( button ) => {
		button.addEventListener( 'click', () => {
			const target = button.getAttribute( 'data-modal-target' );

			modalHandler.open( target );
		} );
	} );

	_showModalOnUserOffset();

	/* Закрываем модалку при клике вне контейнера */
	modalBlock.addEventListener( 'click', ( e ) => {
		if ( e.target === modalBlock || e.target.closest( '[data-modal-close]' ) ) modalHandler.close( );
	} );
}
