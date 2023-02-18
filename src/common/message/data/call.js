export class CallData {
    constructor(bookmarkId, tabId, tabIndex, groupId, newTab, keepGroup) {
        this.bookmarkId = bookmarkId;
        this.tabId = tabId;
        this.tabIndex = tabIndex;
        this.groupId = groupId;
        this.newTab = newTab;
        this.keepGroup = keepGroup;
    }
}