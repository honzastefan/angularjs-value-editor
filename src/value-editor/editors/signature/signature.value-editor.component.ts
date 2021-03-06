import ValueEditorComponent, {ValueEditorBindings} from '../../value-editor.component';
import AbstractValueEditor, {OptionsChangeDetection} from '../abstract-value-editor';
import * as angular from 'angular';
import {ILogService, IOnInit, ITimeoutService} from 'angular';
import {
    SignatureValueEditorConfigurationService,
    SignatureValueEditorOptions
} from './signature-value-editor-configuration.provider';
import {SignatureValueEditorLocalizationsService} from './signature-value-editor-localization.provider';
import {TextValueEditorValidations} from '../text/text.value-editor.component';
import {getFormModel} from '../../utils/forms';

export class SignatureValueEditorComponentController extends AbstractValueEditor<string, SignatureValueEditorOptions> implements IOnInit {
    public items: string[] = [];
    public showSelect: boolean;

    /*@ngInject*/
    constructor($scope: angular.IScope,
                signatureValueEditorConfigurationService: SignatureValueEditorConfigurationService,
                signatureValueEditorLocalizationsService: SignatureValueEditorLocalizationsService,
                private $injector: angular.auto.IInjectorService,
                private $timeout: ITimeoutService,
                private $log: ILogService) {
        super($scope, signatureValueEditorConfigurationService, signatureValueEditorLocalizationsService);
    }

    public $onInit() {
        super.$onInit();

        if (this.options.canDoAction) {
            this.loadItems();
        }
    }

    protected onOptionsChange(newOptions: SignatureValueEditorOptions, oldOptions, whatChanged: OptionsChangeDetection<SignatureValueEditorOptions>) {
        if (newOptions.canDoAction) {
            this.loadItems();
        }
    }

    private loadItems() {
        this.$timeout(async () => {
            try {
                const $formModel = this.valueEditorController.formController ? getFormModel(this.valueEditorController.formController) : undefined;

                this.items = await this.$injector.invoke<Promise<string[]>>(this.options.dataSource, this, {
                    $model: this.model,
                    $name: this.valueEditorController.name,
                    $formModel
                });
            } catch (e) {
                this.$log.error('Unable to fetch items. Error:', e);
            } finally {
                this.showSelect = this.options.canDoAction && this.items && this.items.length > 0;
            }
        });
    }
}

/**
 * @ngdoc component
 * @name signatureValueEditor
 * @module angularjs-value-editor.signature
 *
 * @requires ng.type.ngModel.NgModelController
 * @requires component:kpValueEditor
 *
 * @description
 * Value editor for signature input.
 *
 * Supported options: {@link type:SignatureValueEditorOptions}
 *
 * Supported validations: {@link type:TextValueEditorValidations}
 *
 * @example
 * <example name="signatureValueEditorExample" module="signatureValueEditorExample" frame-no-resize="true">
 *     <file name="index.html">
 *         <main>
 *              <kp-value-editor type="'signature'" ng-model="model" options="{canDoAction: true}"></kp-value-editor>
 *              <div>Model: {{model}}</div>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         angular.module('signatureValueEditorExample', ['angularjs-value-editor'])
 *          .config((signatureValueEditorConfigurationServiceProvider) => signatureValueEditorConfigurationServiceProvider.setConfiguration({
 *              dataSource: () => Promise.resolve(['one', 'two', 'three'])
 *          }));
 *     </file>
 * </example>
 */
export default class SignatureValueEditorComponent {
    public static componentName = 'signatureValueEditor';

    public require = {
        ngModelController: 'ngModel',
        valueEditorController: `^${ValueEditorComponent.componentName}`
    };

    public templateUrl = require('./signature.value-editor.tpl.pug');

    public controller = SignatureValueEditorComponentController;
}

export interface SignatureValueEditorBindings extends ValueEditorBindings<SignatureValueEditorOptions, TextValueEditorValidations> {
}
