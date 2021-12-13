export default class Helper {
    static formatDate(date: string): string {
        if (!date) {
            return "";
        }

        return (new Date(date)).toLocaleString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        })
    }
}