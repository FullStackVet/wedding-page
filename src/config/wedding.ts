// wedding details to establish timezone, names, location and user TZ
export const WEDDING_DETAILS = {
  date: new Date("2030-12-25T21:00:00-04:00"), // (9pm EST Dec 25, 2030 / UTC-4)
  location: "Toronto, Ontario",
  title: "Groom & Person", // their names
};

// get user's local TZ
export const getUserLocalOffset = () => new Date().getTimezoneOffset() / -60;
