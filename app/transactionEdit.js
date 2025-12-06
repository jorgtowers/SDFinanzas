import { ScrollView, Text, TextInput, StyleSheet, Button, View, Pressable } from "react-native";
import { Screen } from "../components/Screen";
import { useState, useEffect } from "react";
import { dbContext } from "../database/fb";
import { doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { categories, types } from "../database/master";
import { router } from "expo-router";
import { HeaderTabs } from "../components/headerTabs";
import { CalculatorIcon } from "../components/IconSet";

export default function TransactionEdit() {
    const navigation = useNavigation();
    const { transaction, c } = useLocalSearchParams();

    const [item, setItem] = useState({
        type: "",
        category: "",
        description: "",
        amount: 0,
        usd: 0,
        factor: 0,
        ves: 0,
        date: "",
        createdAt: "",
    });


    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(dbContext, c, transaction);
            const snap = await getDoc(docRef);

            if (!snap.exists()) {
                console.log("Documento no encontrado");
                return;
            }

            const data = snap.data();

            // carga los valores al formulario
            setItem({ ...item, ...data });
        };

        fetchData();
    }, []);

    const formatDecimal = (value) => {
        /*     let clean = value.replace(/[^0-9.]/g, '');
             const parts = clean.split('.');
             if (parts.length > 2) parts.pop();
             if (parts[1]) parts[1] = parts[1].slice(0, 2);
             return parts.join('.');*/
    };



    const onUpdateVES = () => {
        let _usd = item.usd??"";
        let _ves = item.ves??"";
        let _factor = item.factor??"";

        const numUsd = parseFloat(_usd);
        const numVes = parseFloat(_ves);
        const numFactor = parseFloat(_factor);

        // 🛑 NO CALCULAR SI ALGUNO ES NaN o 0 donde no debe
        const safeUsd = !isNaN(numUsd) && numUsd !== 0;
        const safeVes = !isNaN(numVes) && numVes !== 0;
        const safeFactor = !isNaN(numFactor) && numFactor !== 0;

        setItem(prev => ({ ...prev, ves: numVes.toFixed(2) }));
        if (safeUsd) {
            let f = (numVes / numUsd).toFixed(2);
            setItem(prev => ({ ...prev, factor: f }));
        } else if (safeFactor) {
            let u = (numVes / numFactor).toFixed(2);
            setItem(prev => ({ ...prev, usd: u }));
        }
        console.log(item);
    };


    const onUpdateUSD = () => {
        let _usd = item.usd;
        let _ves = item.ves;
        let _factor = item.factor;

        const numUsd = parseFloat(_usd);
        const numVes = parseFloat(_ves);
        const numFactor = parseFloat(_factor);

        // 🛑 NO CALCULAR SI ALGUNO ES NaN o 0 donde no debe
        const safeUsd = !isNaN(numUsd) && numUsd !== 0;
        const safeVes = !isNaN(numVes) && numVes !== 0;
        const safeFactor = !isNaN(numFactor) && numFactor !== 0;

        setItem(prev => ({ ...prev, usd: numUsd.toFixed(2) }));
        if (safeVes) {
            let f = (numVes / numUsd).toFixed(2);
            setItem(prev => ({ ...prev, factor: f }));
        }
        if (safeFactor) {
            let v = (numUsd * numFactor).toFixed(2);
            setItem(prev => ({ ...prev, ves: v }));
        }
 console.log(item);
    };

    const onUpdateFactor = () => {

        let _usd = item.usd;
        let _ves = item.ves;
        let _factor = item.factor;

        const numUsd = parseFloat(_usd);
        const numVes = parseFloat(_ves);
        const numFactor = parseFloat(_factor);

        // 🛑 NO CALCULAR SI ALGUNO ES NaN o 0 donde no debe
        const safeUsd = !isNaN(numUsd) && numUsd !== 0;
        const safeVes = !isNaN(numVes) && numVes !== 0;
        const safeFactor = !isNaN(numFactor) && numFactor !== 0;

        setItem(prev => ({ ...prev, factor: numFactor.toFixed(2) }));

        if (safeUsd) {
            let v = (numUsd * numFactor).toFixed(2);
            setItem(prev => ({ ...prev, ves: v }));
        }
        if (safeVes) {
            let u = (numVes / numFactor).toFixed(2);
            setItem(prev => ({ ...prev, usd: u }));
        }
         console.log(item);
    }


    const onSend = async () => {
        const docRef = doc(dbContext, c, transaction);
        await updateDoc(docRef, item);
        router.replace("/"); // <- ir a Home
    };

    const onDelete = async () => {
        const docRef = doc(dbContext, c, transaction);
        await deleteDoc(docRef, item);
        router.replace("/"); // <- ir a Home
    };

    return (
        <Screen>
            <ScrollView>
                <HeaderTabs titleScreen="Edit" destinationURL="/" />
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
                        value={item.amount}
                        keyboardType="number-pad"
                        style={styles.input}
                        placeholder="0.00"
                        onChangeText={(text) => setItem({ ...item, amount: text })}
                    />
                </View>
                {/* USD */}
                <View style={styles.row}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>USD:</Text>

                        <TextInput
                            placeholder="0.00"
                            value={item.usd}
                            keyboardType="numeric"
                            style={styles.input}
                            onChangeText={(text) => setItem({ ...item, usd: text })}
                        />
                    </View>

                    <Pressable style={styles.calcButton} onPress={() => onUpdateUSD()}>
                        <CalculatorIcon size={22} color="#333" />
                    </Pressable>
                </View>
                {/* FActor */}
                <View style={styles.row}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Factor:</Text>

                        <TextInput
                            placeholder="0.00"
                            value={item.factor}
                            keyboardType="numeric"
                            style={styles.input}
                            onChangeText={(text) => setItem({ ...item, factor: text })}
                        />
                    </View>

                    <Pressable
                        style={styles.calcButton}
                        onPress={() => onUpdateFactor()}
                    >
                        <CalculatorIcon size={22} color="#333" />
                    </Pressable>
                </View>

                {/* VES */}
                <View style={styles.row}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>VES:</Text>
                        <TextInput
                            placeholder="0.00"
                            value={item.ves}
                            keyboardType="numeric"
                            style={styles.input}
                            onChangeText={(text) => setItem({ ...item, ves: text })}
                        />
                    </View>
                    <Pressable
                        style={styles.calcButton}
                        onPress={() => onUpdateVES()}
                    >
                        <CalculatorIcon size={22} color="#333" />
                    </Pressable>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

                    <Button title="Delete" onPress={onDelete} color={"#ce8981ff"} width="48%" />
                    <Button title="Update" onPress={onSend} color={"#3f7cccff"} width="48%" />
                </View>

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
        fontSize: 20,
        backgroundColor: "white"
    }
});
