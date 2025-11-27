import { ScrollView, Text } from "react-native";
import { Screen } from "../components/Screen";

export default function About() {
    return <>
            <Screen>
                <ScrollView >
                    <Text >
                        This is a simple blog app built with React Native and Expo. It fetches
                        posts from a public API and displays them in a list. Tap on a post to see
                        its details.
                    </Text>
                    <Text >
                        Developed by Solution Developer.
                    </Text>
                </ScrollView>
            </Screen>
        </>;
}