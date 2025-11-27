import { View, Text } from "react-native";

// La función definida arriba
const formatearMoneda = (cantidad, locale = "es-ES", currency = "EUR") => {
	const num = parseFloat(cantidad);
	if (isNaN(num)) return "0";

	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency: currency,
		minimumFractionDigits: 2,
	}).format(num);
};

export function CardSummary({ styles, color, title, widthPercent, value,instance, percentSide2SideTitle }) {
	return (
		<>
			<View style={{ ...styles.card, width: widthPercent }}>
				<Text style={styles.label}> {title}: {percentSide2SideTitle!=null?percentSide2SideTitle:""}</Text>
				<Text
					style={{
						...styles.summary,
						color: color
							,
					}}
				>
				{instance?.Emoji}	{formatearMoneda(value, "en-EU", "USD")}    
				</Text>
			</View>
		</>
	);
}
