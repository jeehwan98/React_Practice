// Primitives: number, string, boolean
// More complex: arrays, objects
// Function types: parameters

// Primitives
let age: number;
age = 12;

let userName: string;
userName = 'Max';

let isInstructor: boolean;
isInstructor = true;

// Arrays
let hobbies: string[]; // array of strings
hobbies: ['Sports', 'Cooking'];

// Objects
// let person: {
//     name: string;
//     age: number;
// };

// person = {
//     name: 'Max',
//     age: 32
// };

// when we don't want to store just one object but an array of such objects
// let people: {
//     name: string;
//     age: number;
// }[];

// Type inference
let course = 'React - The Complete Guide';
// course = 12341; // gives us an error because we're trying to assign a different type

// Union (|) is used when we want to assign more than 1 type, giving us flexibile values and types
let lecture: string | number = 'React - The Complete Guide'; // union

lecture = 12341;

// Type as : we define our own base type, in which a more complex type definition is stored
// then use the type alias of repeating the entire type definitions
type Person = {
    name: string;
    age: number;
};

let person: Person;
let people: Person[];

// Functions & types
function add(a: number, b: number) {
    return a + b;
}

function print(value: any) {
    console.log(value); // because it doesn't return any values, it returns `void`, which is similar to null or undefined but it is only used in functions
}


// Generics: type inference can often automatically determine the types based on the values provided
function insertAtBeginning<T>(array: T[], value: T) {
    const newArray = [value, ...array];
    return newArray;
}

const demoArray = [1, 2, 3];

const updatedArray = insertAtBeginning(demoArray, -1); // [-1, 1, 2, 3]
const stringArray = insertAtBeginning(['a', 'b', 'c'], 'd');

stringArray[0].split('');
// updatedArray[0].split('');
