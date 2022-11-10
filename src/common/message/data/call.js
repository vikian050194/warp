export class CallData {
    constructor(bookmarkId, tabId, groupId, newTab, keepGroup) {
        this.bookmarkId = bookmarkId;
        this.tabId = tabId;
        this.groupId = groupId;
        this.newTab = newTab;
        this.keepGroup = keepGroup;
    }
}