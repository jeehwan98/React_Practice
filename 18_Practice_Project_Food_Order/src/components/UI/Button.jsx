export default function Button({ children, textOnly, className, ...props }) {
    // const cssClasses = textOnly ? `text-button ${className}` : 'button';
    let cssClasses = textOnly ? 'text-button' : 'button';

    cssClasses += ' ' + className;

    return (
        <>
            <button className={cssClasses} {...props}>
                {children}
            </button>
        </>
    )
}