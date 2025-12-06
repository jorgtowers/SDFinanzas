import { ScrollView, Text, TextInput, StyleSheet, Button, View } from "react-native";
import { Screen } from "../../components/Screen";
import { useState, useEffect } from "react";
import { dbContext } from "../../database/fb";
import { collection, addDoc } from "firebase/firestore";
import { useNavigation } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { categories, types } from "../../database/master";

export default function TransactionAddScreen() {
    const navigation = useNavigation();
    const [newItem, setNewItem] = useState({
        date: new Date(),
        amount: 0,
        description: '',
        category: '',
        type: '',
        usd:0,
        factor:0,
        ves:0,
        createdAt: new Date(),
    });

    const onSend = async () => {
        await addDoc(collection(dbContext, 'transactions'), newItem);
        navigation.goBack();
    };


    return <>
        <Screen>
            <ScrollView >
                <Text >
                    Add new transaction!
                </Text>
                <View style={styles.container}>
                    <Text style={styles.label}>Type:</Text>
                    <Picker
                     style={styles.input}
                        selectedValue={newItem.type}
                        onValueChange={(itemValue, itemIndex) =>
                            setNewItem({ ...newItem, type: itemValue })
                        }>
                            { types.map((type) => (
                                <Picker.Item key={type.Value} label={type.Text} value={type.Value} />
                            )) }
                    </Picker>
                </View>
                <View style={styles.container}>

                    <Text style={styles.label}>Category:</Text>
                    <Picker
                     style={styles.input}
                        selectedValue={newItem.category}
                        onValueChange={(itemValue, itemIndex) =>
                            setNewItem({ ...newItem, category: itemValue })
                        }>
                        { categories.map((category) => (
                            <Picker.Item key={category.Value} label={category.Text} value={category.Value} />
                        )) }
                       </Picker>
                </View>
                <View style={styles.container}>

                    <Text style={styles.label}>Description:</Text>

                    <TextInput placeholder="Description"
                        value={newItem.description}
                         style={styles.input}
                        onChangeText={(text) => setNewItem({ ...newItem, description: text })}>

                    </TextInput>
                </View>
                <View style={styles.container}>

                    <Text style={styles.label}>Amount:</Text>

                    <TextInput 
                        value={newItem.amount}
                         placeholder="0.00"
                        keyboardType="number-pad"
                        style={styles.input}
                        onChangeText={(text) => setNewItem({ ...newItem, amount: text })}>

                    </TextInput>
                </View>
                                <View style={styles.container}>

                    <Text style={styles.label}>USD:</Text>

                    <TextInput 
                        value={newItem.usd}
                         placeholder="0.00"
                        keyboardType="number-pad"
                        style={styles.input}
                        onChangeText={(text) => setNewItem({ ...newItem, usd: text })}>

                    </TextInput>
                </View>
                                <View style={styles.container}>

                    <Text style={styles.label}>Factor:</Text>

                    <TextInput 
                        value={newItem.factor}
                         placeholder="0.00"
                        keyboardType="number-pad"
                        style={styles.input}
                        onChangeText={(text) => setNewItem({ ...newItem, factor: text })}>

                    </TextInput>
                </View>
                                <View style={styles.container}>

                    <Text style={styles.label}>VES:</Text>

                    <TextInput 
                        value={newItem.ved}
                         placeholder="0.00"
                        keyboardType="number-pad"
                        style={styles.input}
                        onChangeText={(text) => setNewItem({ ...newItem, ves: text })}>

                    </TextInput>
                </View>
                <Button title="Add Transaction" onPress={onSend} />
            </ScrollView>
        </Screen>
    </>;
}

const styles = StyleSheet.create({
    label: {
        color: "gray",
        fontSize: 10,
    },
    container: {
        marginBottom: 10,
    },
    input:{
        padding:5,
        fontSize:20,
        backgroundColor:"gray",
        margin:5
    }
});