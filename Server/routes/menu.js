const { Router } = require("express");
const fs = require("fs");

const menuRoutes = Router();

console.log("chargement des images");

// --------------------Breakfast--------------------------
const morningBurrito64base = fs
  .readFileSync("./images/morning_burrito.jpg")
  .toString("base64");
const croissant64base = fs
  .readFileSync("./images/croissant.jpg")
  .toString("base64");
const chiaPudding64base = fs
  .readFileSync("./images/chia_pudding.jpg")
  .toString("base64");
const overnightOats64base = fs
  .readFileSync("./images/overnight_oats.jpg")
  .toString("base64");
// -----------------------Lunch----------------------------
const sandwich64base = fs
  .readFileSync("./images/sandwich.jpg")
  .toString("base64");
const grilledCheese64base = fs
  .readFileSync("./images/grilled_cheese.jpg")
  .toString("base64");
const vegeterianWrap64base = fs
  .readFileSync("./images/vegeterian_wrap.jpg")
  .toString("base64");
const goatCheesePanini64base = fs
  .readFileSync("./images/goat_cheese_panini.jpg")
  .toString("base64");
const chickenFetaPanini64base = fs
  .readFileSync("./images/chicken_feta_wrap.jpg")
  .toString("base64");
// -----------------------Salads----------------------------
const spinachSalad64base = fs
  .readFileSync("./images/spinach_salad.jpg")
  .toString("base64");
const marketSalad64base = fs
  .readFileSync("./images/market_salad.jpg")
  .toString("base64");
// -----------------------Smoothies-------------------------
const morningSmoothie64base = fs
  .readFileSync("./images/morning_smoothie.jpg")
  .toString("base64");
const strawberryBananaSmoothie64base = fs
  .readFileSync("./images/strawberry_banana_smoothie.jpg")
  .toString("base64");
const tropicalSmoothie64base = fs
  .readFileSync("./images/tropical_smoothie.jpg")
  .toString("base64");
const comfortSmoothie64base = fs
  .readFileSync("./images/comfort_smoothie.jpg")
  .toString("base64");
const greenSmoothie64base = fs
  .readFileSync("./images/green_smoothie.jpg")
  .toString("base64");
// -----------------------Coffees---------------------------
const cocaCola64base = fs
  .readFileSync("./images/coca_cola.jpg")
  .toString("base64");
const fanta64base = fs.readFileSync("./images/fanta.jpg").toString("base64");
const pepsi64base = fs.readFileSync("./images/pepsi.jpg").toString("base64");
const sprite64base = fs.readFileSync("./images/sprite.png").toString("base64");
const espresso64base = fs
  .readFileSync("./images/espresso.jpg")
  .toString("base64");
const latte64base = fs.readFileSync("./images/latte.jpg").toString("base64");
const americano64base = fs
  .readFileSync("./images/americano.jpg")
  .toString("base64");

menuRoutes.get("/", async (req, res) => {
  res.json([
    {
      titre: "Déjeuner",
      items: [
        {
          idItem: "1",
          nomItem: "Burrito matin",
          image: morningBurrito64base,
          prix: 10.0,
        },
        {
          idItem: "2",
          nomItem: "Croissant",
          image: croissant64base,
          prix: 2.5,
        },
        {
          idItem: "3",
          nomItem: "Pouding de chia",
          image: chiaPudding64base,
          prix: 7.75,
        },
        {
          idItem: "4",
          nomItem: "Overnight à l'avoine",
          image: overnightOats64base,
          prix: 7.5,
        },
      ],
    },
    {
      titre: "Sandwichs",
      items: [
        {
          idItem: "5",
          nomItem: "Grilled Cheese",
          image: grilledCheese64base,
          prix: 7.5,
        },
        {
          idItem: "6",
          nomItem: "Wrap végé",
          image: vegeterianWrap64base,
          prix: 12.0,
        },
        {
          idItem: "7",
          nomItem: "Wrap au poulet-féta",
          image: chickenFetaPanini64base,
          prix: 11.5,
        },
        {
          idItem: "8",
          nomItem: "Panini Chèvre",
          image: goatCheesePanini64base,
          prix: 6.0,
        },
      ],
    },
    {
      titre: "Salades",
      items: [
        {
          idItem: "9",
          nomItem: "Salade épinard",
          image: spinachSalad64base,
          prix: 5.0,
        },
        {
          idItem: "10",
          nomItem: "Salade du marché",
          image: marketSalad64base,
          prix: 3.5,
        },
      ],
    },
    {
      titre: "Smoothies",
      items: [
        {
          idItem: "11",
          nomItem: "Tropical",
          image: tropicalSmoothie64base,
          prix: 7.5,
        },
        {
          idItem: "12",
          nomItem: "Fraise, banane",
          image: strawberryBananaSmoothie64base,
          prix: 7.5,
        },
        {
          idItem: "13",
          nomItem: "Réconfort",
          image: comfortSmoothie64base,
          prix: 8.5,
        },
        {
          idItem: "14",
          nomItem: "Vert-grano",
          image: greenSmoothie64base,
          prix: 9.6,
        },
        {
          idItem: "15",
          nomItem: "Réveil matin",
          image: morningSmoothie64base,
          prix: 11.5,
        },
      ],
    },
    {
      titre: "Breuvages",
      items: [
        {
          idItem: "16",
          nomItem: "Coca Cola",
          image: cocaCola64base,
          prix: 2.75,
        },
        {
          idItem: "17",
          nomItem: "Fanta",
          image: fanta64base,
          prix: 2.99,
        },
        {
          idItem: "18",
          nomItem: "Pepsi",
          image: pepsi64base,
          prix: 2.75,
        },
        {
          idItem: "19",
          nomItem: "Sprite",
          image: sprite64base,
          prix: 2.75,
        },
        {
          idItem: "20",
          nomItem: "Espresso",
          image: espresso64base,
          prix: 3.75,
        },
        {
          idItem: "21",
          nomItem: "Latte",
          image: latte64base,
          prix: 4.0,
        },
        {
          idItem: "22",
          nomItem: "Americano",
          image: americano64base,
          prix: 3.25,
        },
      ],
    },
  ]);
});

//module.exports = menuRoutes;

module.exports = {
  menuRoutes,
  sandwich64base,
  // smoothie64base,
  morningBurrito64base,
  croissant64base,
  chiaPudding64base,
  overnightOats64base,
  grilledCheese64base,
  vegeterianWrap64base,
  goatCheesePanini64base,
  chickenFetaPanini64base,
  spinachSalad64base,
  marketSalad64base,
  morningSmoothie64base,
  strawberryBananaSmoothie64base,
  tropicalSmoothie64base,
  comfortSmoothie64base,
  greenSmoothie64base,
  cocaCola64base,
  fanta64base,
  pepsi64base,
  sprite64base,
  espresso64base,
  latte64base,
  americano64base,
};
