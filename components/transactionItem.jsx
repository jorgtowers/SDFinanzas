import { View, Text, Pressable } from "react-native";
import { Link } from "expo-router";
import { format } from "date-fns";

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

const toDateTime = (secs) => {
	var t = new Date(1970, 0, 1); // Epoch
	t.setSeconds(secs);
	return t;
};

export function TransactionItem({ styles, o, types, categories, collection }) {
	return (
		<>
			<Link
				asChild
				href={{
					pathname: "/transactionEdit",
					params: { transaction: o.id, c: collection },
				}}
			>
				<Pressable>
					<View style={styles.card} key={o.id}>
						<View style={styles.filaSuperior}>
							<Text>{o.description.slice(0, 30)}</Text>
							<Text
								style={{
									...styles.summaryInLine,
									color:
										types.find((x) => x.Value == o.type)
											?.Color || "black",
								}}
							>
								{formatearMoneda(
									parseFloat(o.amount),
									"en-EU",
									"USD"
								)}
								{" (" +
									(o.type == "income" || o.type == "credit"
										? "+"
										: "-") +
									")"}
							</Text>
						</View>
						<View style={styles.filaSuperior}>
							<Text style={styles.fecha}>
								{" "}
								{format(
									toDateTime(o.createdAt.seconds),
									"eeee, dd MMM yyyy"
								)}
							</Text>
							<Text>
								{" "}
								{
									categories.find(
										(x) => x.Value == o.category
									)?.Emoji
								}{" "}
								{o.category}
							</Text>
						</View>
					</View>
				</Pressable>
			</Link>
		</>
	);
}
