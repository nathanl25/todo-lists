export const formatStatus = (str: string) => {
  return str
    .split('_')
    .map(
      (word) => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
    )
    .join(' ');
};

export const formatForDateInput = (rawDate: string) => {
  const localRawDate = rawDate.slice(0, 23) + '-11:00';
  const date = new Date(localRawDate);
  const inputDate = date.toJSON().slice(0, 16);
  return inputDate;
};
