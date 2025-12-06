import { View } from "react-native";

export function Screen({ children }) {
	return (
		<View style={{flex:1,backgroundColor:"rgba(0, 0, 0, 1)"}}>
			{children}
		</View>
	);
}
