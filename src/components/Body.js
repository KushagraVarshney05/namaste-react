import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

function filterData(searchText, restaurants) {
    const filterData = restaurants.filter((restaurant) =>
    restaurant?.data?.name?.toLowerCase()?.includes(searchText.toLowerCase())
  );

  return filterData;
}

const Body = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  // empty dependency array => once after render
  // dep arry [searchText] => once after initial render + everytime after redern (my searchText changes)
  useEffect(() => {
    // API call
    getRestaurants();
  }, []);

  async function getRestaurants() {
    const data = await fetch(
     "https://www.swiggy.com/dapi/restaurants/list/v5?lat=27.913562&lng=78.080701&collection=96823&tags=layout_ux4&sortBy=&filters=&type=rcv2&offset=0&page_type=null"
    );
     // "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
    const json = await data.json();
    // console.log(json.data.cards[2].card.card.info);
    // console.log(json.data.cards);

    // Optional Chaining
    setAllRestaurants(json?.data?.cards);
    setFilteredRestaurants(json?.data?.cards);
    
  }

  // console.log("render");

  // not render component (Early return)
  if (!allRestaurants) return null;

  if (filteredRestaurants?.length === 0)
    return <h1>No Restraunt match your Filter!!</h1>;

  return allRestaurants?.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button
          className="search-btn"
          onClick={() => {
            //need to filter the data
            const data = filterData(searchText, allRestaurants);
            // update the state - restaurants
            setFilteredRestaurants(data);
          }}
        >
          Search
        </button>
      </div>
      <div className="restaurant-list">
        
        {filteredRestaurants.slice(2).map((restaurant) => {
          return (
            <RestaurantCard {...restaurant?.card?.card?.info} key={restaurant?.card?.card?.info?.id} />
          );
        })}
      </div>
    </>
  );
};

export default Body;
