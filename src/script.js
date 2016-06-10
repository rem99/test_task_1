import difflib from "jsdifflib";

var base = ['Some', 'Simple', 'Text', 'File'];
var newtxt = ['Another', 'Text', 'File', 'With', 'Additional', 'Lines'];

var sequence = new difflib.SequenceMatcher(base, newtxt);
var opcodes = sequence.get_opcodes();

var OPERATION = 0;
var BASE_STARTS = 1;
var BASE_ENDS = 2;
var NEW_STARTS = 3;
var NEW_ENDS = 4;

var diffView = function() {
    this.linesCount = 0;
    this.linesHTML = [];
};

diffView.prototype.addLine = function(oldValue, operation, newValue) {
    this.linesCount++;
    if (!operation) {
        operation = '';
    }
    var lineHTML = '<tr><td>' + this.linesCount + '</td><td>' + operation + '</td><td>' + oldValue;
    if (newValue !== undefined) {
        lineHTML += ' | ' + newValue;
    }
    lineHTML += '</td></tr>';
    this.linesHTML.push(lineHTML);
};

diffView.prototype.getTable = function () {
    return '<table>' + this.linesHTML.join('') + '</table>'
};

var view = new diffView();

opcodes.forEach(function(opcode) {
    for (var i = opcode[BASE_STARTS]; i < opcode[BASE_ENDS]; i++) {
        if (opcode[OPERATION] === "equal") {
            view.addLine(base[i]);
        } else {
            var iteration = i - opcode[BASE_STARTS];
            var newLineNum = opcode[NEW_STARTS] + iteration;
            if (newLineNum < opcode[NEW_ENDS]) {
                view.addLine(base[i], '*', newtxt[newLineNum]);
            } else {
                view.addLine(base[i], '-');
            }
        }
    }
    var baseBlockLength = opcode[BASE_ENDS] - opcode[BASE_STARTS];
    var newBlockLength = opcode[NEW_ENDS] - opcode[NEW_STARTS];
    if (baseBlockLength < newBlockLength) {
        for (var i = opcode[NEW_STARTS] + baseBlockLength; i < opcode[NEW_ENDS]; i++) {
            view.addLine(newtxt[i], '+');
        }
    }
});
document.write(view.getTable());
