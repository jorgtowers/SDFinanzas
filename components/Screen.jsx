import { View } from "react-native";

export function Screen({ children }) {
	return (
		<View style={{ padding: 20, backgroundColor: "#ffffffff" }}>
			{children}
		</View>
	);
}
