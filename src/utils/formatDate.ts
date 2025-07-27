import { format } from 'date-fns';


export const formatDate = (date: string) => {
  const d = new Date(date);
  const formattedDate = format(d, "d MMMM 'at' HH:mm");

  return formattedDate;
}
