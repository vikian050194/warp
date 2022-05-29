export class HistoryItem {
    constructor(id, date) {
        this.id = id,
        this.date = date;
    }
}

export class HistoryItemView {
    constructor(index, date, name) {
        this.index = index;
        this.date = date;
        this.name = name;
    }
}
