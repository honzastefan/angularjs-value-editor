import {DefaultOptions} from '../../typings';
import AbstractValueEditorConfigurationProvider, {AbstractValueEditorConfigurationService} from '../../common/abstract-value-editor-configuration.provider';
import {ValueEditorOptions} from '../../value-editor.component';

/**
 * @ngdoc type
 * @name CardNumberValueEditorAdditionalRequestParameters
 * @module angularjs-value-editor.card-number
 *
 * @property {string} inputName Value editor name.
 * @property {string} currentValue Current input value.
 *
 * @description
 * Additional parameters for request function.
 */
export interface CardNumberValueEditorAdditionalRequestParameters {
    inputName: string;
    currentValue: string;
}

/**
 * @ngdoc type
 * @name CardNumberValueEditorOptions
 * @module angularjs-value-editor.card-number
 *
 * @property {string} inputSize Bootstrap input size.
 * @property {Object} requestParameters Request parameters.
 * @property {function} requestFunction Function providing generation of card number.
 *  ```
 *  function (requestParameters?: {}, additionalParameters?: CardNumberValueEditorAdditionalRequestParameters): PromiseLike<string>;
 *  ```
 *  - **requestParameters**: Parameters from {@link CardNumberValueEditorOptions}.requestParameters
 *  - **additionalParameters**: Some {@link CardNumberValueEditorAdditionalRequestParameters additional parameters}.
 *
 * @description
 * Extends {@link type:ValueEditorOptions}
 *
 * Defaults: {@link cardNumberValueEditorDefaultOptions}
 */
export interface CardNumberValueEditorOptions<PARAMS = {}> extends ValueEditorOptions {
    inputSize?: string;
    requestParameters?: PARAMS;
    requestFunction?: (requestParameters?: PARAMS, additionalParameters?: CardNumberValueEditorAdditionalRequestParameters) => PromiseLike<string>;
}

/**
 * @ngdoc constant
 * @name cardNumberValueEditorDefaultOptions
 * @module angularjs-value-editor.card-number
 *
 * @description
 * For description see {@link CardNumberValueEditorOptions}
 *
 * ```javascript
 *  {
 *      inputSize: 'sm',
 *      requestParameters: {},
 *      requestFunction: (requestParameters, additionalParameters) => Promise.resolve(additionalParameters.currentValue)
 *  }
 * ```
 */
export const CARD_NUMBER_VALUE_EDITOR_DEFAULT_OPTIONS: DefaultOptions<CardNumberValueEditorOptions> = {
    inputSize: 'sm',
    requestParameters: {},
    requestFunction: (requestParameters, additionalParameters) => Promise.resolve(additionalParameters.currentValue)
};

/**
 * @ngdoc provider
 * @name cardNumberValueEditorConfigurationServiceProvider
 * @module angularjs-value-editor.card-number
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link cardNumberValueEditorDefaultOptions}
 */
export default class CardNumberValueEditorConfigurationProvider extends AbstractValueEditorConfigurationProvider<CardNumberValueEditorOptions> {
    public static readonly providerName = 'cardNumberValueEditorConfigurationService';

    /*@ngInject*/
    constructor(cardNumberValueEditorDefaultOptions: DefaultOptions<CardNumberValueEditorOptions>) {
        super(cardNumberValueEditorDefaultOptions);
    }
}

/**
 * @ngdoc service
 * @name cardNumberValueEditorConfigurationService
 * @module angularjs-value-editor.card-number
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link cardNumberValueEditorDefaultOptions}
 */
export interface CardNumberValueEditorConfigurationService extends AbstractValueEditorConfigurationService<CardNumberValueEditorOptions> {
}
