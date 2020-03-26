import config from './app.config';
import * as jQuery from 'jquery';
import 'angular';
import './required-vendors';
import register from '@kpsys/angularjs-register';
import valueEditorModule from '../dist/angularjs-value-editor';
import '../dist/angularjs-value-editor.css';
import DemoController from './demo.controller';

console.log(valueEditorModule);

declare global {
    interface Window {
        jQuery: JQueryStatic;
        $: JQueryStatic;
        luxon: any;
    }
}

// @ts-ignore
window.$ = window.jQuery = jQuery;

register('app', [valueEditorModule])
    .config(config)
    .controller('demoController', DemoController);
