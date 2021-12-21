const summerRate = 1.00;
const winterRate = 1.12;
const winterServiceCharge = 180;
var winterStart = 4

function getTicketPrice(date, quantity) {
  let charge;
  if (date.before(WINTER_START) || date.after(WINTER_END)) {
    charge = quantity * summerRate;
  }
  else {
    charge = quantity * winterRate + winterServiceCharge;
  }
  return charge;
}
