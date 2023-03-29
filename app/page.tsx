import Header from "./components/Header";
import RestaurantCard from "./components/Card";
import { PrismaClient, Cuisine, PRICE, Location, Review } from "@prisma/client";
export interface RestaurantCardType {
  id: number;
  name: string;
  main_image: string,
  cuisine: Cuisine,
  location: Location,
  price: PRICE;
  slug: string;
  reviews: Review[];
}
const prisma = new PrismaClient()

const fetchRestaurant = async (): Promise<RestaurantCardType[]> => {
  const restaurant = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      slug: true,
      location: true,
      price: true,
      reviews: true,
    }
  })
  return restaurant
}
export default async function Home() {
  const restaurants = await fetchRestaurant()
  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap ">
        {
          restaurants.map((restaurant) => {
            return (
              <RestaurantCard restaurant={restaurant} />
            )
          })
        }
      </div>
    </main>
  )
}
