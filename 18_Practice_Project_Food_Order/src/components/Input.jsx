export default function Input({ label, id, ...props }) {
    return (
        <p className="control">
            <label htmlFor={id}>{label}</label>
            <input id={id} name={id} required {...props} /> {/* name is required for us to handle the submission of the form later on with some native build in form features provided to us */}
        </p>
    )
}