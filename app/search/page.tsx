import Header from "./components/Header";
import SearchSidebar from "./components/SearchSidebar";
import RestaurantCard from "./components/RestaurantCard";
import { PRICE, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
interface SearchParams {
    city?: string,
    cuisine?: string,
    price?: PRICE
}
const fetchRestaurantByCity = (searchParams: SearchParams) => {
    const where: any = {}
    if (searchParams.city) {
        const location = {
            name: {
                equals: searchParams.city.toLowerCase()
            }
        }
        where.location = location
    }
    if (searchParams.cuisine) {
        const cuisine = {
            name: {
                equals: searchParams.cuisine.toLowerCase()
            }
        }
        where.cuisine = cuisine
    }
    if (searchParams.price) {
        const price = {
            equals: searchParams.price
        }
        where.price = price
    }

    const select = {
        id: true,
        name: true,
        main_image: true,
        price: true,
        cuisine: true,
        location: true,
        slug: true,
    }

    return prisma.restaurant.findMany({
        where,
        select
    })

}

const fetchLocations = async () => {
    return prisma.location.findMany()
}
const fetchCuisines = async () => {
    return prisma.cuisine.findMany()
}
export default async function Search({ searchParams }: { searchParams: SearchParams }) {
    const restaurants = await fetchRestaurantByCity(searchParams)
    const locations = await fetchLocations()
    const cuisine = await fetchCuisines()
    return (
        <main>
            <Header />
            <div className="flex py-4 m-auto w-2/3 justify-between items-start">
                <SearchSidebar locations={locations} cuisine={cuisine} searchParams={searchParams} />
                <div className="w-5/6">
                    {
                        restaurants.length ? (
                            <>
                                {
                                    restaurants.map((restaurant) => {
                                        return (
                                            <RestaurantCard restaurant={restaurant} key={restaurant.id} />
                                        )
                                    })
                                }
                            </>
                        )
                            : <p>Sorry, we found no restaurant in this area</p>
                    }

                </div>
            </div>
        </main>
    )
}