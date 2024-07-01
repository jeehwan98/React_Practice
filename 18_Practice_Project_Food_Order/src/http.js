export async function fetchAvailableMeals() {
    try {
        const response = await fetch('http://localhost:3000/meals');
        if (!response.ok) {
            throw new Error('Failed to fetch available meals');
        }
        const resData = await response.json();
        return resData;
    } catch (error) {
        console.log(resData);
        throw error;
    }
} 