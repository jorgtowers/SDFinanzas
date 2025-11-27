import { Tabs } from "expo-router";
import { InfoIcon, HomeIcon, PencilIcon, PlusIcon } from "../../components/IconSet";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: { backgroundColor: '#ffffffff', borderTopColor: "gray" },
                tabBarActiveTintColor: 'cyan',
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
                    tabBarIcon: ({ color }) => <PencilIcon color={color} />
                }} />
            <Tabs.Screen name="budgedAddScreen"
                options={{
                    title: "Budged",
                    tabBarIcon: ({ color }) => <PlusIcon color={color} />
                }} />
        </Tabs>
    );
}