import { ScrollView, Text, TextInput, StyleSheet, Button, View } from "react-native";
import { Screen } from "../components/Screen";
import { useState, useEffect } from "react";
import { dbContext } from "../database/fb";
import { doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { categories, types } from "../database/master";
import { router } from "expo-router";

export default function TransactionEdit() {
    const navigation = useNavigation();
    const { transaction,c } = useLocalSearchParams();

    const [item, setItem] = useState({
        type: "",
        category: "",
        description: "",
        amount: "",
        date: "",
        createdAt: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(dbContext, c, transaction );
            const snap = await getDoc(docRef);

            if (!snap.exists()) {
                console.log("Documento no encontrado");
                return;
            }

            const data = snap.data();
            console.log("DATA →", data);

            // carga los valores al formulario
            setItem({ ...item, ...data });
        };

        fetchData();
    }, []);

    const onSend = async () => {
        const docRef = doc(dbContext, c, transaction );
        await updateDoc(docRef, item);
          router.replace("/"); // <- ir a Home
    };

    return (
        <Screen>
            <ScrollView>

                <Text>Edit transaction!</Text>

                {/* TYPE */}
                <View style={styles.container}>
                    <Text style={styles.label}>Type:</Text>
                    <Picker
                        style={styles.input}
                        selectedValue={item.type}
                        onValueChange={(val) => setItem({ ...item, type: val })}
                    >
                        {types.map((type) => (
                            <Picker.Item key={type.Value} label={type.Text} value={type.Value} />
                        ))}
                    </Picker>
                </View>

                {/* CATEGORY */}
                <View style={styles.container}>
                    <Text style={styles.label}>Category:</Text>
                    <Picker
                        style={styles.input}
                        selectedValue={item.category}
                        onValueChange={(val) => setItem({ ...item, category: val })}
                    >
                        {categories.map((c) => (
                            <Picker.Item key={c.Value} label={c.Text} value={c.Value} />
                        ))}
                    </Picker>
                </View>

                {/* DESCRIPTION */}
                <View style={styles.container}>
                    <Text style={styles.label}>Description:</Text>
                    <TextInput
                        placeholder="Description"
                        value={item.description}
                        style={styles.input}
                        onChangeText={(text) => setItem({ ...item, description: text })}
                    />
                </View>

                {/* AMOUNT */}
                <View style={styles.container}>
                    <Text style={styles.label}>Amount:</Text>
                    <TextInput
                        placeholder="Amount"
                        value={item.amount}
                        keyboardType="number-pad"
                        style={styles.input}
                        onChangeText={(text) => setItem({ ...item, amount: text })}
                    />
                </View>

                <Button title="Update Transaction" onPress={onSend} />

            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    label: {
        color: "gray",
        fontSize: 10,
    },
    container: {
        marginBottom: 10,
    },
    input: {
        padding: 5,
        fontSize:20
    }
});
