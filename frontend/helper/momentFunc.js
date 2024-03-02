import moment from 'moment';

moment.updateLocale('en', {week: {dow: 1}});

export const getTodayDate = () => {
    return moment();
};

export const getStartAndEndDateOfMonth = (date) => {
    if (!date) date = moment();
    return {
        start: date.clone().startOf('month'),
        end: date.clone().endOf('month'),
    }
}

export const getStartAndEndDateOfCalendar = (date) => {
    if (!date) date = moment();
    return {
        start: date.clone().startOf('month').startOf('week'),
        end: date.clone().endOf('month').endOf('week'),
    }
}

export const getCalendarDates = ({start}) => {
    if (!start) start = getStartAndEndDateOfCalendar().start;
    const end = getStartAndEndDateOfCalendar().end;
    const currentDay = start;
    const daysOfMonth = [];

    while(currentDay.isSameOrBefore(end, 'day')) {
        daysOfMonth.push(currentDay.clone());
        currentDay.add(1, 'day');
    }
    return daysOfMonth;
}

export const isDateBeforeDate = (start, end) => {
    return moment(start).isSameOrBefore(moment(end));
}

export const isCurrentDate = (date) => {
    return moment().isSame(date, 'day');
}

export const formatDate = (date, formatString) => {
    return moment(date).format(formatString);
}