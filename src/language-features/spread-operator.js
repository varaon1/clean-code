let animalObj = {
  name: "Cat",
  type: "Mammal",
  origin: {
    country: "USA",
  },
};
let count = 20;
let animalObjWithLegs = {
  ...animalObj,
  legCount: 4,
};
if (!true) {
  console.log("aaa");
}

animalObj.name = "Cat changed";
animalObj.origin.country = "Canada";

console.log("animalObj");
console.log(animalObj);

console.log("animalObjWithLegs");
console.log(animalObjWithLegs);
