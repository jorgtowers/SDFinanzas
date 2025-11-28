import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { dbContext } from "../../database/fb";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { FlatList } from "react-native";
import { useState, useEffect } from "react";
import { HeaderTabs } from "../../components/headerTabs";
import { ScrollView } from "react-native";
import { categories, types } from "../../database/master";
import { TransactionItem } from "../../components/transactionItem";
import { CardSummary } from "../../components/cardSummary";

export default function BudgedList() {
	const [transactions, setTransactions] = useState([]);
	const [incomes, setIncomes] = useState(0);
	const [expenses, setExpenses] = useState(0);
	const [balance, setBalance] = useState(0);
	const [credits, setCredits] = useState(0);
	const [debits, setDebits] = useState(0);
	const [transactionType, setTransactionType] = useState("income");

	useEffect(() => {
		const collRef = collection(dbContext, "budgeds");
		const q = query(collRef, orderBy("createdAt", "desc"));

		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			console.log("Snapshot received!");
			const transactionsArray = [];
			querySnapshot.forEach((doc) => {
				transactionsArray.push({
					id: doc.id,
					...doc.data(),
				});
			});


			setTransactions(transactionsArray);



			const expensesType = ["expense"];

			// Inicializar sumas si aún no están definidas
			let totalExpenses = 0;

			transactionsArray.forEach((transaction) => {
				// 1. Uso de 'includes' en lugar de 'contains'
				const type = transaction?.type;
				const amount = parseFloat(transaction?.amount);

				// 2. Manejo explícito de valores no numéricos o nulos
				if (isNaN(amount) || amount === null) {
					console.warn(
						`Transacción con monto inválido detectada:`,
						transaction
					);
					return; // Saltar a la siguiente iteración
				}

				if (expensesType.includes(type))
					totalExpenses += amount;

				// Opcional: considerar un 'else' para transacciones no clasificadas
			});

			setExpenses(totalExpenses);

			setBalance(totalExpenses);

		});

		return () => unsubscribe();

	}, []);


	return (
		<>
		 <HeaderTabs titleScreen="Budgeds" destinationURL="/budgedAddScreen"   />
			<View style={styles.filaSuperior}>
				<CardSummary
					styles={styles}
					widthPercent={"48%"}
					title={"Expenses"}
					instance={types?.find((x) => x.Value == "expense")}
					color={
						types?.find((x) => x.Value == "expense")?.Color ||
						"black"
					}
					percentSide2SideTitle={
						"(" + (100).toFixed(2) + "%)"
					}
					value={expenses}
				/>
				<CardSummary
					styles={styles}
					widthPercent={"48%"}
					title={"Balance"}
					color={"#29439eff"}
					value={balance}
				/>

			</View>
			{transactions.length === 0 ? (
				<Text style={{ color: "black" }}>No transactions found.</Text>
			) : (
				<View style={{ flex: 1 }}>
					<ScrollView>

						{(() => {
							// Calcular total general
							const totalGlobal = transactions.reduce(
								(sum, t) => sum + (parseFloat(t.amount) || 0),
								0
							);

							return Object.entries(

								// Agrupar por nombre de categoría (string)
								transactions.reduce((acc, tx) => {
									const categoryName = tx.category || "Sin categoría";

									if (!acc[categoryName]) acc[categoryName] = [];
									acc[categoryName].push(tx);
									return acc;
								}, {})

							).map(([categoryName, items]) => {

								// Total por categoría
								const totalCategoria = items.reduce(
									(sum, t) => sum + (((t.category=="income"?1:1)* parseFloat(t.amount)) || 0),
									0
								);

								// Porcentaje respecto del total
								const porcentaje = totalGlobal > 0
									? ((totalCategoria / totalGlobal) * 100).toFixed(2)
									: 0;

								return (
									<View key={categoryName} style={styles.categoryBlock}>

										{/* TÍTULO CON % Y TOTAL */}


										<View style={styles.categoryHeader}>
											<Text style={styles.categoryTitle}>
												{categories.find(x => x.Value == categoryName).Emoji}
												{categoryName} {" "}
												{totalCategoria.toLocaleString("en-US", {
													style: "currency",
													currency: "USD"
												})} ({porcentaje}%)
											</Text>
										</View>

										{/* TRANSACCIONES */}
										{items.map(o => (
											<TransactionItem
												key={o.id}
												styles={styles}
												o={o}
												types={types}
												categories={categories}
												collection={"budgeds"}
											/>
										))}
									</View>
								);
							});
						})()}

					</ScrollView>
				</View>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	filaSuperior: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		marginTop:10
	},
	container: {
		marginBottom: 10,
	},
	fecha: {
		fontSize: 12,
		color: "#888888",
	},
	label: {
		fontSize: 12,
		color: "gray",
		fontWeight: "bold",
	},
	summary: {
		fontSize: 20,
		fontWeight: "bold",
	},
	summaryInLine: {
		fontSize: 14,
		fontWeight: "bold",
	},
	card: {
		backgroundColor: "#f0f0f0",
		padding: 10,
		borderRadius: 5,
		marginBottom: 10,
		borderColor: "gray",
		borderWidth: 1,
	},
	categoryBlock: {
		marginBottom: 20,
		padding: 12,
		backgroundColor: "#d5dbe6ff",
		borderRadius: 8,
	},
	categoryTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#727c89ff",
		marginBottom: 6,
	},
	categoryTotal: {
		color: "#ccc",
		marginBottom: 10,
	}
});
