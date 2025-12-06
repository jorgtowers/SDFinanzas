import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator, Pressable } from 'react-native';
import { Stack } from "expo-router";
import { Link } from "expo-router";
import { CircleInfoIcon, HomeIcon } from '../components/IconSet';

export default function Layout() {
  return (
    <View style={styles.container}>
      <Stack  screenOptions={{
        headerStyle:{ backgroundColor:"red", padding:10},
        headerTintColor:"black",
        headerTitle:"",
        headerShown:false,
        headerLeft:()=><></>,
        headerRight:()=><></>,
        backgroundColor:"red"
      }} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d1818ff",

    marginBottom: 40,
  }
});