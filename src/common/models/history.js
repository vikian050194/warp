export class HistoryItem {
    constructor(id, date) {
        this.id = id,
        this.date = date;
    }
}

export class HistoryItemView {
    constructor(id, index, date, name) {
        this.id = id;
        this.index = index;
        this.date = date;
        this.name = name;
    }
}
