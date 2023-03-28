import Header from "../components/Header";
import RestaurantNavbar from "../components/RestaurantNavbar";
import Menud from "../components/Menud";

export default function Menu() {
    return (
        <div className="bg-white w-[100%] rounded p-3 shadow">
            <RestaurantNavbar />
            <Menud />
        </div>
    )
}