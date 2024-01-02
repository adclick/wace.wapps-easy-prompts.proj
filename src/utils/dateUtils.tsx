const timeAgo = (date: Date): string => {
    const now: Date = new Date();
    const diffInSeconds: number = Math.floor((now.getTime() - date.getTime()) / 1000);

    const rtf: Intl.RelativeTimeFormat = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

    if (diffInSeconds < 60) {
        return rtf.format(-diffInSeconds, 'second');
    } else if (diffInSeconds < 3600) {
        const diffInMinutes: number = Math.floor(diffInSeconds / 60);
        return rtf.format(-diffInMinutes, 'minute');
    } else if (diffInSeconds < 86400) {
        const diffInHours: number = Math.floor(diffInSeconds / 3600);
        return rtf.format(-diffInHours, 'hour');
    } else {
        const diffInDays: number = Math.floor(diffInSeconds / 86400);
        return rtf.format(-diffInDays, 'day');
    }
}

export default {
    timeAgo
}