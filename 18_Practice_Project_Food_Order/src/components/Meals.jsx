import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch"
import { fetchAvailableMeals } from "../http"
import MealItem from "./MealItem.jsx";

export default function Meals() {
    const [loadedMeals, setLoadedMeals] = useState([]);

    // fetch list of meals
    useEffect(() => {
        async function fetchMeals() {
            const response = await fetch('http://localhost:3000/meals');
            if (!response.ok) {
                throw new Error('Failed to fetch meals');
            }
            const meals = await response.json();
            setLoadedMeals(meals);
        }

        fetchMeals();
    }, []);

    return (
        <ul id="meals">
            {loadedMeals.map((meal) => (
                <MealItem key={meal.id} meal={meal} />
            ))}
        </ul>
    )
}