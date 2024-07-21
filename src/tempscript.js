const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient();

async function inserCategories() {
  try {
    const category = await client.category.createMany({
      data: [
        { label: "Shoes" },
        { label: "Clothing" },
        { label: "Accessories" },
        { label: "Electronics" },
        { label: "Home & Kitchen" },
        { label: "Beauty & Personal Care" },
        { label: "Health & Wellness" },
        { label: "Sports & Outdoors" },
        { label: "Toys & Games" },
        { label: "Books" },
        { label: "Movies & TV" },
        { label: "Music" },
        { label: "Video Games" },
        { label: "Computers & Accessories" },
        { label: "Office Supplies" },
        { label: "Pet Supplies" },
        { label: "Automotive" },
        { label: "Tools & Home Improvement" },
        { label: "Garden & Outdoor" },
        { label: "Grocery & Gourmet Food" },
        { label: "Baby" },
        { label: "Arts, Crafts & Sewing" },
        { label: "Industrial & Scientific" },
        { label: "Luggage & Travel Gear" },
        { label: "Collectibles & Fine Art" },
        { label: "Software" },
        { label: "Cell Phones & Accessories" },
        { label: "Appliances" },
        { label: "Musical Instruments" },
        { label: "Gift Cards" },
        { label: "Luxury Beauty" },
        { label: "Handmade Products" },
        { label: "3D Printing" },
        { label: "Smart Home" },
        { label: "Home Audio & Theater" },
        { label: "Camera & Photo" },
        { label: "Wearable Technology" },
        { label: "Tires & Wheels" },
        { label: "Motorcycle & Powersports" },
        { label: "Replacement Parts" },
        { label: "Car Care" },
        { label: "Light Bulbs" },
        { label: "Bedding" },
        { label: "Furniture" },
        { label: "Home Décor" },
        { label: "Bath" },
        { label: "Storage & Organization" },
        { label: "Heating, Cooling & Air Quality" },
        { label: "Iron & Steamers" },
        { label: "Vacuums & Floor Care" },
        { label: "Seasonal Décor" },
        { label: "Event & Party Supplies" },
        { label: "Costumes & Accessories" },
        { label: "Sewing" },
        { label: "Scrapbooking" },
        { label: "Knitting & Crochet" },
        { label: "Painting, Drawing & Art Supplies" },
        { label: "Beading & Jewelry Making" },
        { label: "Fabric" },
        { label: "Printmaking" },
        { label: "Model & Hobby Building" },
        { label: "Scuba Diving & Snorkeling" },
        { label: "Surfing" },
        { label: "Water Sports" },
        { label: "Fishing" },
        { label: "Camping & Hiking" },
        { label: "Cycling" },
        { label: "Climbing" },
        { label: "Golf" },
        { label: "Fitness & Exercise" },
        { label: "Running" },
        { label: "Tennis & Racquet Sports" },
        { label: "Winter Sports" },
        { label: "Team Sports" },
        { label: "Swimming" },
        { label: "Equestrian Sports" },
        { label: "Track & Field" },
        { label: "Martial Arts" },
        { label: "Boxing" },
        { label: "Yoga" },
        { label: "Pilates" },
        { label: "Dance" },
        { label: "Accessories & Supplies" },
        { label: "Travel" },
        { label: "Hotels" },
        { label: "Flights" },
        { label: "Car Rentals" },
        { label: "Vacation Packages" },
        { label: "Tours & Activities" },
        { label: "Cruises" },
        { label: "Camping" },
        { label: "Hostels" },
        { label: "Travel Guides" },
        { label: "Travel Accessories" },
        { label: "RV Rentals" },
        { label: "Travel Insurance" },
        { label: "Restaurant Gift Cards" },
        { label: "Dining" },
        { label: "Weddings" },
        { label: "Event Planning" },
      ],
    });

    console.log("done");
  } catch (error) {
    console.log(error);
  }
}

// inserCategories();

const categrories = [
  {
    id: 14,
    userId: 1,
    categoryId: 2,
    isSelected: true,
  },
  {
    id: 15,
    userId: 1,
    categoryId: 3,
    isSelected: true,
  },
];

let id = 6,
  isSelected = true;
const newAR = categrories.map((ca) =>
  ca.categoryId === id ? { categoryId: id, isSelected: isSelected } : ca
);

console.log({ newAR });
