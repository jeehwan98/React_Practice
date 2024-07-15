'use server';
import { redirect } from 'next/navigation';
import { saveMeal } from "./meals";

// all files written in this file will be treated as server actions

function isInvalidText(text) {
    return !text || text.trim === '';
}

export async function shareMeal(prevState, formData) {

    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
        creator: formData.get('name'),
        creator_email: formData.get('email')
    };

    if (
        isInvalidText(meal.title) ||
        isInvalidText(meal.summary) ||
        isInvalidText(meal.instructions) ||
        isInvalidText(meal.creator) ||
        isInvalidText(meal.creator_email) ||
        !meal.creator_email.includes('@') ||
        !meal.image || meal.image.size === 0
    ) {
        // throw new Error('Invalid input');
        return {
            message: 'Invalid input.' // it has to be a serializable object
        }
    }

    await saveMeal(meal);
    redirect('/meals');
}