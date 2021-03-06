import '@kpsys/angular-ui-bootstrap';
import './resources/styles.less';

import register from '@kpsys/angularjs-register';
import acceptableValueEditorModule from './editors/acceptable/acceptable.value-editor.module';
import booleanValueEditorModule from './editors/boolean/boolean.value-editor.module';
import dateValueEditorModule from './editors/date/date.value-editor.module';
import hiddenValueEditorModule from './editors/hidden/hidden.value-editor.module';
import htmlValueEditorModule from './editors/html/html.value-editor.module';
import numberValueEditorModule from './editors/number/number.value-editor.module';
import textValueEditorModule from './editors/text/text.value-editor.module';
import yearValueEditorModule from './editors/year/year.value-editor.module';
import cardNumberValueEditorModule from './editors/card-number/card-number.value-editor.module';
import indexSelectionValueEditorModule from './editors/index-selection/index-selection.value-editor.module';
import autocompleteValueEditorModule from './editors/autocomplete/autocomplete.value-editor.module';
import passwordValueEditorModule from './editors/password/password.value-editor.module';
import signatureValueEditorModule from './editors/signature/signature.value-editor.module';
import accessNumberValueEditorModule from './editors/access-number/access-number.value-editor.module';

import ValueEditorComponent from './value-editor.component';
import {EmptyConfigurationService} from './editors/abstract-value-editor';

/**
 * @ngdoc constant
 * @name loadingSpinnerTemplateUrl
 * @module angularjs-value-editor
 *
 * @description
 * AngularJS template url with SVG spinner.
 *
 * It can be used for waiting for async operations, etc...
 */
// tslint:disable-next-line:no-var-requires
const LOADING_SPINNER_TPL_URL = require('ngtemplate-loader!html-loader!./resources/loading-spinner.svg');

/**
 * @ngdoc module
 * @name angularjs-value-editor
 * @module angularjs-value-editor
 */

export default register('angularjs-value-editor', [
    'ui.bootstrap',
    acceptableValueEditorModule,
    booleanValueEditorModule,
    dateValueEditorModule,
    hiddenValueEditorModule,
    htmlValueEditorModule,
    numberValueEditorModule,
    textValueEditorModule,
    yearValueEditorModule,
    cardNumberValueEditorModule,
    indexSelectionValueEditorModule,
    autocompleteValueEditorModule,
    passwordValueEditorModule,
    signatureValueEditorModule,
    accessNumberValueEditorModule
])
    .constant('loadingSpinnerTemplateUrl', LOADING_SPINNER_TPL_URL)
    .service(EmptyConfigurationService.serviceName, EmptyConfigurationService)
    .component(ValueEditorComponent.componentName, ValueEditorComponent)
    .name();

/**
 * @typedef ng.type.ngModel
 * @typedef ng.type.ngModel.NgModelController
 */
