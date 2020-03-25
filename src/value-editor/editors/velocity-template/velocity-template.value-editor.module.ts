import register from '@kpsys/angularjs-register';
import VelocityTemplateValueEditorComponent from './velocity-template.value-editor.component';

/**
 * @ngdoc module
 * @name angularjs-value-editor.velocity-template
 * @module angularjs-value-editor.velocity-template
 *
 * @description
 *
 */

export default register('angularjs-value-editor.velocity-template')
    .component(VelocityTemplateValueEditorComponent.componentName, VelocityTemplateValueEditorComponent)
    .name();
