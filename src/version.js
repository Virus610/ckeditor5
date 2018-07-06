/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/**
 * @module ckeditor5/version
 */

/* global window, global */

import CKEditorError from '@ckeditor/ckeditor5-utils/src/ckeditorerror';
import { version } from '../package.json';

const windowOrGlobal = window || global;

if ( windowOrGlobal.CKEDITOR_VERSION ) {
	/**
	 * This error is thrown when the base {@link module:core/editor/editor~Editor `Editor`}
	 * class has been loaded twice (or more), a result of either:
	 *
	 * * the build containing two (or more) different versions of the {@link module:core/editor/editor~Editor `Editor`}
	 * class – make sure **all** packages in your {@glink examples/builds build} which have
	 * `@ckeditor/ckeditor5-core` in their `package.json` [dependencies](https://docs.npmjs.com/files/package.json#dependencies)
	 * use the same version of the package,
	 * * two (or more) `ckeditor.js` builds loaded in the web page next to one another – check your web page for duplicated
	 * `<script>` elements or make sure your page builder/bundler includes CKEditor only once.
	 *
	 * @error ckeditor-version-collision
	 * @param {String} collidingVersion The version of the build which has already been (incorrectly) loaded.
	 * @param {String} version The version of the build which is supposed to be loaded.
	 */
	throw new CKEditorError( 'ckeditor-version-collision: The global CKEDITOR_VERSION constant has already been set.', {
		collidingVersion: windowOrGlobal.CKEDITOR_VERSION,
		version
	} );
} else {
	windowOrGlobal.CKEDITOR_VERSION = version;
}