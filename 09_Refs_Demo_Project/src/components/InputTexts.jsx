import { forwardRef, useRef } from "react"

const InputTexts = forwardRef(function InputTexts({ label, textarea, ...props }, ref) {
    const inputRef = useRef();
    const classes = "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"

    return (
        <p className="flex flex-col gap-1 my-4">
            <label className="text-sm font-bold uppercase text-stone-500">
                {label}
            </label>
            {textarea ? (
                <textarea
                    className={classes}
                    ref={ref}
                    {...props}
                    // ref={inputRef}
                    // type={type}
                    // onChange={onChange}
                    // value={value}
                />
            ) : (
                <input 
                    className={classes}
                    ref={ref}
                    {...props}
                    // ref={inputRef}
                    // type={type}
                    // onChange={onChange}
                    // value={value}
                />
                )}
            {/* <input
                className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
                ref={inputRef}
                type={type}
                onChange={onChange}
                value={value}
            /> */}
        </p>
    )
});

export default InputTexts;