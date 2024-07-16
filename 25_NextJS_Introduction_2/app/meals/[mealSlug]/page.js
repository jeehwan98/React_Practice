import classes from './page.module.css';
import { notFound } from 'next/navigation';
import Image from 'next/image'
import { getMeal } from '../../../lib/meals';

export async function generateMetadata({ params }) {
    const meal = getMeal(params.mealSlug);

    if (!meal) {
        notFound();
    }

    return {
        title: meal.title,
        description: meal.summary,
    }
};

export default function MealsInfoPage({ params }) {
    const meal = getMeal(params.mealSlug);

    console.log(meal);
    if (!meal) {
        notFound();
    }

    meal.instructions = meal.instructions.replace(/\n/g, '<br />');

    return (
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image src={`https://bucket-for-react-practice-98.s3.ap-northeast-2.amazonaws.com/images/${meal.image}`} alt={meal.title} fill />
                </div>
                <div className={classes.headerText}>
                    <h1>{meal.title}</h1>
                    <p className={classes.creator}>
                        by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
                    </p>
                    <p className={classes.summary}>{meal.summary}</p>
                </div>
            </header>
            <main>
                <p
                    className={classes.instructions}
                    dangerouslySetInnerHTML={{
                        __html: meal.instructions,
                    }}></p>
            </main>
        </>
    )
}