// styled-components

// import { styled } from 'styled-components';

// const Label = styled.label`
//   display: block;
//   margin-bottom: 0.5rem;
//   font-size: 0.75rem;
//   font-weight: 700;
//   letter-spacing: 0.1em;
//   text-transform: uppercase;
//   color: ${({ $invalid }) => ($invalid ? '#f87171' : '#6b7280')};
// `
// // values injected into the string will in the end be picked up by that label function and be executed and handled by that styled components package
// // if we inject dynamic values, those tagged template functions will receive those injected values as arguments
// // this styled component package will execute this function to dynamically derive a value that uses this place in our styling rules

// const Input = styled.input`
//   width: 100%;
//   padding: 0.75rem 1rem;
//   line-height: 1.5;
//   background-color: ${({ $invalid }) => ($invalid ? '#fed2d2' : '#d1d5db')};
//   color: ${({ $invalid }) => ($invalid ? '#ef4444' : '#374151')};
//   border: 1px solid ${({ $invalid }) => ($invalid ? '#f73f3f' : 'transparent')};
//   border-radius: 0.25rem;
//   box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
// `

// we should always look for opportuniities like this, where we can either outsource reusable components that have certain styling applied to them, which we might need in different parts of the app
// or components that might have certain combinations of JSX elements that we might need to reuse in other parts of the app
// export default function CustomInput({ label, invalid, ...props }) {
//     return (
//     <p>
//         <Label $invalid={invalid}>{label}</Label> {/* this allows me to pass this label text as a child between these styled component label tags */}
//         <Input $invalid={invalid} {...props} />
//     </p>
//     )
// };

export default function Input({ label, invalid, ...props }) {
  // slightly better alternative is to set up a base label  classes string that does not include text-stone-300 but only all the base classes which don't change
  let labelClasses = "block mb-2 text-xs font-bold tracking-wide uppercase"

  let inputClasses = "w-full px-3 py-2 leading-tight border rounded shadow"

  // apply styles conditionally with tailwind
  if (invalid) {
    // labelClasses = "block mb-2 text-xs font-bold tracking-wide uppercase text-red-400"
    labelClasses += ' text-red-400';  // just add the red color if invalid is true and else
    inputClasses += ' text-red-500 bg-red-100 border-red-300'
  } else {
    labelClasses += ' text-stone-300' // white space in front has to be added so that this does not become one long class, but instead two
    inputClasses += ' text-gray-700 bg-stone-300';
  }

  return (
  <p>
      <label className={labelClasses}>{label}</label> {/* this allows me to pass this label text as a child between these styled component label tags */}
      <input className={inputClasses} {...props} />
  </p>
  )
};