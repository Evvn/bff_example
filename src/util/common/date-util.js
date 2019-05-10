/* eslint-disable no-plusplus */
/* eslint-disable vars-on-top */
import moment from 'moment';

export const getTotalMonths = (startDate, endDate) => {
  const startDateMoment = moment(startDate, 'MM/YYYY');
  const endDateMoment = moment(endDate, 'MM/YYYY');
  const numberOfPeriods = endDateMoment.diff(startDateMoment, 'months');

  return parseInt(numberOfPeriods, 10) + 1; // add one to make the dates inclusive
};

export const getPeriods = (startDate, periods) => {
  const startDateMoment = moment(startDate, 'MM/YYYY').date(1);
  const periodsOut = [];
  for (let i = startDateMoment.month(); i < startDateMoment.month() + periods; i++) {
    const newDate = startDateMoment.month(i);
    const newMonth = newDate.format('MMM');
    const newYear = newDate.format('YYYY');
    periodsOut.push(`${newMonth} - ${newYear}`);
  }

  return periodsOut;
};

export const ISODateToAU = date => moment(date).format('DD/MM/YYYY');
