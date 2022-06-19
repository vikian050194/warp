export const filterHistoryByCount = (history, threshold) => {
    if (history.length <= threshold) {
        return history;
    }

    return history.slice(history.length - threshold);
};

export const filterHistoryByTime = (history, threshold) => history.filter(i => new Date(i.date) >= threshold);
