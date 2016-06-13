import 'angular';
import 'diff/diff';
import 'diff/diff.provider.diffConfig';
import diffTpl from 'text!diff/tpl.diff.html';

export default angular.module('app', ['diff']).config(function (DiffConfigProvider) {
    DiffConfigProvider.setTemplate(diffTpl);
});
