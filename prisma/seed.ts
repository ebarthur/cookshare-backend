import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const categories = [
    { id: 1, name: 'Appetizers & Snacks' },
    { id: 2, name: 'Breakfast & Brunch' },
    { id: 3, name: 'Main Dishes' },
    { id: 4, name: 'Desserts' },
    { id: 5, name: 'Beverages' },
    { id: 6, name: 'Soups & Stews' },
    { id: 7, name: 'Salads' },
    { id: 8, name: 'Side Dishes' },
    { id: 9, name: 'Breads & Pastries' },
    { id: 10, name: 'Healthy & Low-Calorie' },
    { id: 11, name: 'Vegetarian & Vegan' },
    { id: 12, name: 'Meat & Poultry' },
    { id: 13, name: 'Seafood' },
    { id: 14, name: 'Pasta & Noodles' },
    { id: 15, name: 'Rice & Grains' },
    { id: 16, name: 'Sauces & Condiments' },
    { id: 17, name: 'Slow Cooker' },
    { id: 18, name: 'Instant Pot & Pressure Cooker' },
    { id: 19, name: 'Grilling & BBQ' },
    { id: 20, name: 'Holiday & Seasonal' },
    { id: 21, name: 'Italian Cuisine' },
    { id: 22, name: 'Mexican Cuisine' },
    { id: 23, name: 'Chinese Cuisine' },
    { id: 24, name: 'Indian Cuisine' },
    { id: 25, name: 'French Cuisine' },
    { id: 26, name: 'Japanese Cuisine' },
    { id: 27, name: 'Mediterranean Cuisine' },
    { id: 28, name: 'Middle Eastern Cuisine' },
    { id: 29, name: 'Thai Cuisine' },
    { id: 30, name: 'African Cuisine' },
    { id: 31, name: 'Kid-Friendly' },
    { id: 32, name: 'Gluten-Free' },
    { id: 33, name: 'Keto & Low-Carb' },
    { id: 34, name: 'Dairy-Free' },
    { id: 35, name: 'Paleo' },
    { id: 36, name: 'Quick & Easy' },
    { id: 37, name: 'Budget-Friendly' },
    { id: 38, name: 'Party & Entertaining' },
    { id: 39, name: 'Comfort Food' },
    { id: 40, name: 'Italian' },
    { id: 41, name: 'Mexican' },
    { id: 42, name: 'Chinese' },
    { id: 43, name: 'Indian' },
    { id: 44, name: 'French' },
    { id: 45, name: 'Japanese' },
    { id: 46, name: 'Mediterranean' },
    { id: 47, name: 'Middle Eastern' },
    { id: 48, name: 'Thai' },
    { id: 49, name: 'African' },
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: {},
      create: category,
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
