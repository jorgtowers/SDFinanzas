import { Tabs } from "expo-router";
import { InfoIcon, HomeIcon, PencilIcon, PlusIcon } from "../../components/IconSet";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: { backgroundColor: '#000000ff', borderTopColor: "gray" },
                tabBarActiveTintColor: 'cyan',
                backgroundColor:"#9c2a2aff",

            }}
        >
            <Tabs.Screen name="index"
                options={{
                    title: "Transations",
                    tabBarIcon: ({ color }) => <HomeIcon color={color}
                    />
                }} />
            <Tabs.Screen name="budgedList"
                options={{
                    title: "Budged",
                    tabBarIcon: ({ color }) => <InfoIcon color={color} />
                }} />
            <Tabs.Screen name="transactionAddScreen"
                options={{
                    title: "Transaction",
                    headerShown: true,
                    headerTintColor:"#ffffffff",
                    headerStyle:{ backgroundColor:"rgba(0, 0, 0, 1)" },
                    tabBarIcon: ({ color }) => <PencilIcon color={color} />
                }} />
            <Tabs.Screen name="budgedAddScreen"
                options={{
                    title: "Budged",
                      headerShown: true,
                    headerTintColor:"#ffffffff",
                    headerStyle:{ backgroundColor:"rgba(0, 0, 0, 1)" },
                    tabBarIcon: ({ color }) => <PlusIcon color={color} />
                }} />
        </Tabs>
    );
}