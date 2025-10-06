const crimes = [
  { name: "Pickpocketed a tourist", min: 50, max: 150, risk: 0.2 },
  { name: "Stole a bicycle", min: 80, max: 200, risk: 0.25 },
  { name: "Mugged a drunk guy", min: 150, max: 300, risk: 0.3 },
  { name: "fuck a girl in public forcefully ", min: 100000, max: 400000, risk: 0.8 },
  { name: "Ran a street scam", min: 200, max: 500, risk: 0.35 },
  { name: "Stole a luxury car", min: 80000, max: 200000, risk: 0.5 },
  { name: "Call a police Nigg@", min: 300000, max: 700000, risk: 0.75 },
  { name: "Robbed a convenience store", min: 500, max: 1200, risk: 0.4 },
  { name: "Hijacked a truck", min: 700, max: 1800, risk: 0.5 },
  { name: "Did a drug deal", min: 1000, max: 3000, risk: 0.6 },
  { name: "Bribed a cop", min: -500, max: -100, risk: 0.1 }, // negative = fine
  { name: "Won an underground race", min: 1500, max: 4000, risk: 0.6 },
  { name: "Robbed a bank", min: 5000, max: 10000, risk: 0.7 },
  { name: "Planned a jewelry heist", min: 3000, max: 8000, risk: 0.6 },
  { name: "Escorted a VIP", min: 800, max: 2000, risk: 0.3 },
  { name: "Smuggled weapons", min: 2000, max: 5000, risk: 0.65 },
  { name: "Sold stolen phones", min: 300, max: 800, risk: 0.35 },
  { name: "Beat a rival gang", min: 400, max: 1000, risk: 0.4 },
  { name: "Bribed a politician", min: -1000, max: -300, risk: 0.2 },
  { name: "Rented out fake IDs", min: 600, max: 1300, risk: 0.35 }
];

const missions = [
  { id: 1, name: "Street Heist", difficulty: 1, reward: 1000000 },
  { id: 2, name: "Car Theft", difficulty: 2, reward: 250000 },
  { id: 3, name: "Bank Robbery", difficulty: 3, reward: 400000 },
  { id: 4, name: "Gang War", difficulty: 4, reward: 800000 },
  { id: 5, name: "Legendary Heist", difficulty: 5, reward: 10000000 } // 1 million bonus mission
];


const guns = [
  { id: 1, name: "Pistol", price: 500, damage: 25 },
  { id: 2, name: "Shotgun", price: 1500, damage: 50 },
  { id: 3, name: "SMG", price: 3000, damage: 35 },
  { id: 4, name: "Assault Rifle", price: 5000, damage: 60 },
  { id: 5, name: "Sniper Rifle", price: 7000, damage: 90 }
];

const shopItems = [
  { id: 1, name: "Med Kit", price: 300, effect: "heal" },
  { id: 2, name: "Armor Vest", price: 800, effect: "defense" },
  { id: 3, name: "Energy Drink", price: 150, effect: "speed" }
];

const mapLocations = [
  "Downtown",
  "Harbor",
  "Old Town",
  "Industrial Zone",
  "Airport",
  "Casino District"
];

module.exports = {
  crimes,
  missions,
  guns,
  shopItems,
  mapLocations
};
