function NutritionComponent ({ label, quantity, unit }) {
    return (
        <div>
            <ul>
                <li><b>{ label }:</b> { quantity.toFixed(2) } {unit}</li>
            </ul>
        </div>
    )
}

export default NutritionComponent;