import { Pressable } from 'react-native';
import { HomeIcon, PlusIcon } from './IconSet';
import { Stack, useRouter } from 'expo-router'; 

export function HeaderTabs({titleScreen, destinationURL}){
    const router = useRouter();
    return <Stack.Screen
                options={{
                    title: titleScreen,
                    headerShown: true,
                    headerTitleStyle: {
                        fontSize: 20,
                        fontWeight: "bold",
                    },
                    headerRight: () => (
                        <Pressable
                            style={{ marginLeft: 10 }}
                            onPress={() => router.push(destinationURL)} // <-- lo que tú quieras
                        >
                            <PlusIcon style={{color:"rgba(68, 116, 138, 1)", marginRight:10}}  />
                        </Pressable>
                    ),
                    headerLeft: () => (
                        <Pressable
                            style={{ marginLeft: 10 }}
                            onPress={() => router.push("/")} // <-- lo que tú quieras
                        >
                            <HomeIcon style={{color:"rgba(68, 116, 138, 1)", marginRight:10}}  />
                        </Pressable>
                    ),
                }}
            />
}