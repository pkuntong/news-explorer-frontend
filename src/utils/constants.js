export const APIKey = 'f2fbde65449a4625b945cd7d23ac2a2a';

export const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://nomoreparties.co/news/v2/everything'
    : 'https://newsapi.org/v2/everything';

const currentDate = new Date();

export const parseCurrentDate = date => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const previousWeek = new Date();
previousWeek.setDate(currentDate.getDate() - 7);

export const parsePreviousWeek =
  previousWeek.getFullYear() +
  '-' +
  String(previousWeek.getMonth() + 1).padStart(2, '0') +
  '-' +
  String(previousWeek.getDate()).padStart(2, '0');