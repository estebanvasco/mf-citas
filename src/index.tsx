import React from 'react';
import App  from './App';
import ReactDOM from 'react-dom';

export interface LiferayProps {
	properties: {
		validate_infolaft: string | null;
		show_agreement: string | null;
	};
}

class WebComponent extends HTMLElement {
	connectedCallback() {
		const properties = {
			validate_infolaft: this.getAttribute('validate_infolaft'),
			show_agreement: this.getAttribute('show_agreement'),
	   	};
		ReactDOM.render(
			<App properties={properties}/>,
			this
		);
	}
}

const ELEMENT_ID = 'mf-modulo-citas';

if (!customElements.get(ELEMENT_ID)) {
	customElements.define(ELEMENT_ID, WebComponent);
}
