import { useRef, useState } from "react"

export default function SearchableList({ items, itemKeyFn, children }) {
    const lastChange = useRef();
    const [searchTerm, setSearchTerm] = useState('');

    const searchResults = items.filter((item) =>
        JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
    );

    function handleChange(event) {
        if (lastChange.current) {
            clearTimeout(lastChange.current);
        }

        lastChange.current = setTimeout(() => { // store the timing to the ref
            lastChange.current = null; // set last set current to null to clear the store identifier
            setSearchTerm(event.target.value); // just writing this would delay it and therefore, we have to set it to the Ref

        }, 500);
    }


    return (
        <div className="searchable-list">
            <input type="search" placeholder="Search" onChange={handleChange} />
            <ul>
                {searchResults.map((item) => (
                    <li key={itemKeyFn(item)}>
                        {children(item)}
                    </li>
                ))}
            </ul>
        </div>
    )
}