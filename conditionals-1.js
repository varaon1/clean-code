const summerRate = 1.0;
const winterRate = 1.12;
const winterServiceCharge = 180;
const winterStart = new Date("2021-12-20T23:00:00.000Z");
const winterEnd = new Date("2022-03-19T23:00:00.000Z");

function getTicketPrice(date, quantity) {
  let charge;
  if (date < winterStart || date > winterEnd) {
    charge = quantity * summerRate;
  } else {
    charge = quantity * winterRate + winterServiceCharge;
  }
  return charge;
}
