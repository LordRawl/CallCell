/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */

export default class Checkbox {
	constructor( selector, options ) {
		this.$el = selector instanceof HTMLElement ? selector : document.querySelector( selector );
		this.options = options;
		this.falseValue = '';
		this.trueValue = '';
		this.isActive = options.active || false;

		this._init();
	}

	_init() {
		this.clickHandler = this.clickHandler.bind( this );
		this.$el.addEventListener( 'click', this.clickHandler );

		this.falseValue = this.$el.dataset.falseValue || 0;
		this.trueValue = this.$el.dataset.trueValue || 1;

		if ( this.isActive ) {
			this.setActive();
			this.change();
		}

		this.options.onInit ? this.options.onInit( this.$el, this.activeValue ) : null;
	}

	clickHandler( ) {
		this.toggle();
		this.change();
	}

	get getEl() {
		return this.$el;
	}

	toggle( active ) {
		this.isActive = typeof active === 'undefined' ? !this.isActive : active;
		this.isActive ? this.setActive() : this.setNoactive();
	}

	change() {
		this.setActiveValue();

		this.options.onToggle
			? this.options.onToggle( this.$el, this.activeValue, this.isActive )
			: null;
	}

	setActiveValue() {
		this.activeValue = this.isActive ? this.trueValue : this.falseValue;
	}

	setActive() {
		this.$el.classList.add( 'checkbox--active' );
	}

	setNoactive() {
		this.$el.classList.remove( 'checkbox--active' );
	}

	destroy() {
		this.$el.removeEventListener( 'click', this.clickHandler );
		this.$el.parentNode.removeChild( this.$el );
	}
}
