import * as moment from 'moment';

export function utcToLocal(str: string, format: string = "YYYY-MM-DD hh:mm:ss") {
    return moment(str).local().format(format);
}

export function dateBeforeComparison(startDate: string, endDate: string) {
    return moment(startDate).isBefore(endDate);
}

export function dateAfterComparison(startDate: string, endDate: string) {
    return moment(endDate).isAfter(startDate);
}