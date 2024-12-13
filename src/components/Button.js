function Button({ type = "button", name, className }) {
    return (
        <button type={type} className={`btn ${className}`}>
            {name}
        </button>
    );
}

export default Button;