let animalObj = {
  name: "Cat",
  type: "Mammal",
  origin: {
    country: "USA",
  },
};

let animalObjWithLegs = {
  ...animalObj,
  legCount: 4,
};

animalObj.name = "Cat changed";
animalObj.origin.country = "Canada";

console.log("animalObj");
console.log(animalObj);

console.log("animalObjWithLegs");
console.log(animalObjWithLegs);
