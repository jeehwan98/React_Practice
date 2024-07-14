import classes from './meals-grid.module.css';
import MealItems from './meal-item';

export default function MealsGrid({ meals }) {
    console.log(meals);
    return (
        <ul className={classes.meals}>
            {meals.map(meal => (
                <li
                    key={meal.id}
                    className={classes.meals}
                >
                    <MealItems {...meal} />
                </li>
            ))}
        </ul>
    )
}