import app from 'app';
import difflib from 'jsdifflib';

app.service('DiffService', function () {

    class DiffBuilder {
        constructor() {
            this.rows = [];
        }
        add(text, operation = '', changedFrom = undefined) {
            this.rows.push({
                line: this.rows.length + 1,
                text,
                operation,
                changedFrom
            });
        }
        getDiff() {
            return this.rows;
        }
    }

    this.compare = function(baseText, newText) {
        var diffBuilder = new DiffBuilder();

        if (baseText.length === 0 && newText.length === 0) {
            return diffBuilder.getDiff();
        }

        baseText = baseText.split('\n');
        newText = newText.split('\n');

        if (baseText.length === 1 && baseText[0] === '') {
            baseText = []
        }
        if (newText.length === 1 && newText[0] === '') {
            newText = []
        }

        var sequence = new difflib.SequenceMatcher(baseText, newText);
        var opcodes = sequence.get_opcodes();

        var OPERATION = 0;
        var BASE_STARTS = 1;
        var BASE_ENDS = 2;
        var NEW_STARTS = 3;
        var NEW_ENDS = 4;

        opcodes.forEach(function(opcode) {
            for (let i = opcode[BASE_STARTS]; i < opcode[BASE_ENDS]; i++) {
                if (opcode[OPERATION] === "equal") {
                    diffBuilder.add(baseText[i]);
                } else {
                    var iteration = i - opcode[BASE_STARTS];
                    var newLineNum = opcode[NEW_STARTS] + iteration;
                    if (newLineNum < opcode[NEW_ENDS]) {
                        diffBuilder.add(newText[newLineNum], '*', baseText[i]);
                    } else {
                        diffBuilder.add(baseText[i], '-');
                    }
                }
            }
            var baseBlockLength = opcode[BASE_ENDS] - opcode[BASE_STARTS];
            var newBlockLength = opcode[NEW_ENDS] - opcode[NEW_STARTS];
            if (baseBlockLength < newBlockLength) {
                for (let i = opcode[NEW_STARTS] + baseBlockLength; i < opcode[NEW_ENDS]; i++) {
                    diffBuilder.add(newText[i], '+');
                }
            }
        });
        return diffBuilder.getDiff();
    }
});
