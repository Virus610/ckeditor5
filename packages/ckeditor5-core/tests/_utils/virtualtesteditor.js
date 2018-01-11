/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import Editor from '../../src/editor/editor';
import DataInterface from '../../src/editor/utils/datainterface';
import HtmlDataProcessor from '@ckeditor/ckeditor5-engine/src/dataprocessor/htmldataprocessor';
import mix from '@ckeditor/ckeditor5-utils/src/mix';

/**
 * A simple editor implementation useful for testing the engine part of the features.
 * It contains full data pipepilne and the engine pipeline but without rendering to DOM.
 *
 * Should work in Node.js. If not now, then in the future :).
 *
 * @memberOf tests.core._utils
 */
export default class VirtualTestEditor extends Editor {
	constructor( config ) {
		super( config );

		this.data.processor = new HtmlDataProcessor();

		this.model.document.createRoot();
	}

	/**
	 * Creates a virtual, element-less editor instance.
	 *
	 * @param {Object} config See {@link core.editor.StandardEditor}'s param.
	 * @returns {Promise} Promise resolved once editor is ready.
	 * @returns {core.editor.VirtualTestEditor} return.editor The editor instance.
	 */
	static create( config ) {
		return new Promise( resolve => {
			const editor = new this( config );

			resolve(
				editor.initPlugins()
					.then( () => {
						editor.fire( 'dataReady' );
						editor.fire( 'ready' );
					} )
					.then( () => editor )
			);
		} );
	}
}

mix( VirtualTestEditor, DataInterface );
