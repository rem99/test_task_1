export default class DiffBuilder {
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
