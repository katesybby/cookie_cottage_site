// js/menu-data.js

// Type: cookie | bar | mini | box
// glutenFree: true/false

const MENU_ITEMS = [
  { name: "Classic Sugar", price: 3.25, type: "cookie", tags: ["classic"] },
  { name: "Raspberry Cheesecake", price: 3.25, type: "cookie", tags: ["raspberry", "cheesecake"] },
  { name: "Huckleberry Lemon Swirl", price: 3.25, type: "cookie", tags: ["huckleberry", "lemon"] },
  { name: "Pumpkin Chocolate Chip w/ Cream Cheese Frosting", price: 3.25, type: "cookie", tags: ["pumpkin", "seasonal"] },
  { name: "Milk Chocolate Chipper", price: 3.25, type: "cookie", tags: ["chocolate chip"] },
  { name: "Cookies And Cream", price: 3.25, type: "cookie", tags: ["oreo"] },
  { name: "Lemon Cheesecake", price: 3.25, type: "cookie", tags: ["lemon"] },
  { name: "Key Lime", price: 3.25, type: "cookie", tags: ["lime"] },
  { name: "Snickerdoodle", price: 3.25, type: "cookie", tags: ["cinnamon"] },
  { name: "Raspberry Tart", price: 3.25, type: "cookie", tags: ["raspberry"] },
  { name: "Triple Chocolate", price: 3.25, type: "cookie", tags: ["chocolate"] },
  { name: "Mint Chocolate Chip", price: 3.25, type: "cookie", tags: ["mint", "chocolate"] },

  // Gluten-free
  { name: "GF Chocolate Chipper", price: 3.25, type: "cookie", glutenFree: true, tags: ["gf", "chocolate chip"] },
  { name: "GF Classic Sugar", price: 3.25, type: "cookie", glutenFree: true, tags: ["gf"] },
  { name: "GF Huckleberry", price: 3.25, type: "cookie", glutenFree: true, tags: ["gf", "huckleberry"] },
  { name: "GF Toasted Coconut Cheesecake", price: 3.25, type: "cookie", glutenFree: true, tags: ["gf", "coconut"] },

  // Bars & loaves
  { name: "Lemon Bars", price: 6.49, type: "bar", tags: ["lemon", "bar"] },
  { name: "Peanut Butter Lovers Bar", price: 3.25, type: "bar", tags: ["peanut butter"] },
  { name: "Magic Bars", price: 6.49, type: "bar", tags: ["bar"] },
  { name: "Caramel Chocolate Chip Bars", price: 6.49, type: "bar", tags: ["caramel", "chocolate"] },
  { name: "Pumpkin Cheesecake Mini Loaf", price: 4.79, type: "bar", tags: ["pumpkin", "loaf"] },

  // Minis
  { name: "Mini Cookies - Box of 6", price: 6.5, type: "mini", tags: ["mini", "box"] },
  { name: "Mini Cookies - Box of 12", price: 13.0, type: "mini", tags: ["mini", "box"] },

  // Boxes
  { name: "Box of 4 (Choose Your Flavors)", price: 11.7, type: "box", tags: ["box"] },
  { name: "Box of 6 (Choose Your Flavors)", price: 16.9, type: "box", tags: ["box"] },
  { name: "Box of 12 (Choose Your Flavors)", price: 32.5, type: "box", tags: ["box"] },
  { name: "Baker’s Choice Box of 4", price: 13.7, type: "box", tags: ["baker's choice"] },
  { name: "Baker’s Choice Box of 6", price: 21.9, type: "box", tags: ["baker's choice"] },
  { name: "Baker’s Choice Box of 12", price: 42.5, type: "box", tags: ["baker's choice"] },

  // You can keep adding all the other flavors from the Doordash menu here
];
