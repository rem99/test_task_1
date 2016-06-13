import diff from './diff';

diff.provider('DiffConfig', function () {
    this.templateUrl = './tpl.diff.html';
    this.template = undefined;

    this.setTemplateUrl = function (templateUrl) {
        this.templateUrl = templateUrl;
    };

    this.setTemplate = function (template) {
        this.template = template;
    };

    this.$get = function () {
        return this;
    };
});
