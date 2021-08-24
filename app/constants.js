// Mockdata
export const LISTS = [
  {
    id: '1',
    name: 'Savings',
    description: 'Log personal savings weekly',
    type: 'Budget',
    color: 'FFFF00', // Yellow
    reminder: 'Weekly',
  },
  {
    id: '2',
    name: 'Electricity',
    description: 'Electricity meter readings',
    type: 'Meter Readings',
    color: '008000', // Green
    reminder: 'Every 2 hours',
  },
  {
    id: '3',
    name: 'Daily Expenses',
    description: 'Log to keep track of daily expenses',
    type: 'Expenses',
    color: 'FF0000', // Red
    reminder: 'Daily',
  },
];

export const LOG_TYPES = [
  {label: 'Budget', value: 'budget'},
  {label: 'Meter Readings', value: 'meterReadings'},
  {label: 'Expenses', value: 'expenses'},
];

export const LOG_COLORS = [
  {label: 'Gray', value: '808080'},
  {label: 'Red', value: 'ff0000'},
  {label: 'Orange', value: 'ff8400'},
  {label: 'Yellow', value: 'ffff00'},
  {label: 'Green', value: '00b30f'},
  {label: 'Brown', value: '4d3232'},
  {label: 'Blue', value: '002aff'},
  {label: 'Navy', value: '000a3b'},
];
