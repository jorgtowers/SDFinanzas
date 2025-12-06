import { StyleSheet, Text, View } from "react-native";
import { dbContext } from "../database/fb";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { categories, types } from "../database/master";
import { TransactionItem } from "./transactionItem";
import { CardSummary } from "./cardSummary";
import { format } from "date-fns";
import { Screen } from "expo-router/build/views/Screen";
import SegmentedControl from "@react-native-segmented-control/segmented-control";

export function TransactionList() {
	const [transactions, setTransactions] = useState([]);
	const [incomes, setIncomes] = useState(0);
	const [expenses, setExpenses] = useState(0);
	const [balance, setBalance] = useState(0);
	const [credits, setCredits] = useState(0);
	const [debits, setDebits] = useState(0);
	const [transactionType, setTransactionType] = useState("balance");

	let updateStates = (transactionsArray) => {
		if (transactionType === "balance") {
			setTransactions(transactionsArray);
		} else {
			let join =types.find(x=>x.Value==transactionType).Join; 
			let joins=types.filter(t=>t.Join==join).map(y=>y.Value);
			let filtered = transactionsArray.filter(x=> joins.includes(x.type));
			setTransactions(filtered);
		}

		const incomesType = ["income"];
		const expensesType = ["expense"];
		const creditType = types.filter((x) => x.Join == "Credits").map((x) => x.Value);
		const debitType = types.filter((x) => x.Join == "Debits").map((x) => x.Value);

		// Inicializar sumas si aún no están definidas
		let totalIncomes = 0,
			totalExpenses = 0,
			totalCredits = 0,
			totalDebits = 0;

		transactionsArray.forEach((transaction) => {
			// 1. Uso de 'includes' en lugar de 'contains'
			const type = transaction?.type;
			const amount = parseFloat(transaction?.amount) * ((types.find(x=>x.Value==type)?.Factor??1));

			// 2. Manejo explícito de valores no numéricos o nulos
			if (isNaN(amount) || amount === null) {
				console.warn(
					`Transacción con monto inválido detectada:`,
					transaction
				);
				return; // Saltar a la siguiente iteración
			}

			if (incomesType.includes(type)) {
				totalIncomes += amount;
			} else if (expensesType.includes(type)) {
				totalExpenses += amount;
			} else if (creditType.includes(type)) {
				totalCredits += amount;
			} else if (debitType.includes(type)) {
				totalDebits += amount;
			}
			// Opcional: considerar un 'else' para transacciones no clasificadas
		});
		setIncomes(totalIncomes);
		setExpenses(totalExpenses);
		setCredits(totalCredits);
		setDebits(totalDebits);
		setBalance(totalIncomes + totalExpenses);
	};

	useEffect(() => {
		const collRef = collection(dbContext, "transactions");
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

			updateStates(transactionsArray);
		});

		return () => unsubscribe();
	}, [transactionType]);

	// La función definida arriba
	const formatearMoneda = (cantidad, locale = "es-ES", currency = "EUR") => {
		const num = parseFloat(cantidad);
		if (isNaN(num)) return "0";

		return new Intl.NumberFormat(locale, {
			style: "currency",
			currency: currency,
			minimumFractionDigits: 2,
		}).format(num);
	};

	// Definimos el formato deseado
	const toDateTime = (secs) => {
		var t = new Date(1970, 0, 1); // Epoch
		t.setSeconds(secs);
		return t;
	};
	function toDateFromSecondsNoTime(seconds) {
		const d = new Date(seconds * 1000); // segundos → milisegundos
		// Crear un Date solo con año/mes/día
		return new Date(d.getFullYear(), d.getMonth(), d.getDate());
	}

	const groupByDay = (list) => {
		const result = {};

		list.forEach((t) => {
			const day = toDateFromSecondsNoTime(t.createdAt.seconds);
			if (!result[day]) {
				result[day] = [];
			}

			result[day].push(t);
		});
		return result;
	};

	return (
		<>
			<View style={styles.contaiterMargin}>
				<View style={styles.filaSuperior}>
					<CardSummary
						styles={styles}
						widthPercent={"48%"}
						title={"Incomes"}
						instance={types?.find((x) => x.Value == "income")}
						color={
							types?.find((x) => x.Value == "income")?.Color ||
							"black"
						}
						value={incomes}
					/>
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
							"(" + (((expenses*-1) / incomes) * 100).toFixed(2) + "%)"
						}
						value={expenses}
					/>
				</View>

				<CardSummary
					styles={styles}
					widthPercent={"100%"}
					title={"Balance"}
					color={"#29439eff"}
					value={balance}
					percentSide2SideTitle={
							"(" + (100-((expenses*-1) / incomes) * 100).toFixed(2) + "%)"
						}
				/>

				<View style={styles.filaSuperior}>
					<CardSummary
						styles={styles}
						widthPercent={"48%"}
						title={"Credits"}
						instance={types?.find((x) => x.Value == "credit")}
						color={
							types?.find((x) => x.Value == "credit")?.Color ||
							"black"
						}
						value={credits}
					/>
					<CardSummary
						styles={styles}
						widthPercent={"48%"}
						title={"Debits"}
						instance={types?.find((x) => x.Value == "debit")}
						color={
							types?.find((x) => x.Value == "debit")?.Color ||
							"black"
						}
						value={debits}
					/>
				</View>
				<View>
					<SegmentedControl
						backgroundColor="#d3d3d3ff"
						style={{}}
						color="#0f0"
						tintColor="#f00"
						values={types
							.filter((x) => x.Listable)
							.map((x) => x.Value)}
						selectedType={transactionType === "income" ? 1 : 0}
						onChange={(event) => {
							const index =
								event.nativeEvent.selectedSegmentIndex;
							const va = event.nativeEvent.value;
							setTransactionType(index === 0 ? "income" : va);
						}}
					/>
				</View>
			</View>
			{transactions.length === 0 ? (
				<Text style={{ color: "black" }}>No transactions found.</Text>
			) : (
				<View style={styles.contaiterMargin}>
					<ScrollView>
						{Object.entries(groupByDay(transactions)).map(
							([day, items]) => {
								// Total por día
								const dayTotal = items.reduce(
									(sum, t) =>
										sum +
										((types.find(x=>x.Value==t.type).Factor) *
											parseFloat(t.amount) || 0),
									0
								);
								return (
									<View
										key={day}
										style={{
											marginBottom: 20,
											backgroundColor: "#dae8e3ff",
											padding: 5,
										}}
									>
										{/* 🟦 Header del día */}
										<View
											style={{
												flexDirection: "row",
												justifyContent: "space-between",
												alignItems: "center",
												paddingVertical: 10,
											}}
										>
											{/* IZQUIERDA */}
											<View
												style={{
													flexDirection: "row",
													alignItems: "center",
												}}
											>
												{/* NÚMERO GRANDE */}
												<Text
													style={{
														fontSize: 36,
														fontWeight: "bold",
														marginRight: 10,
													}}
												>
													{format(day, "dd")}
												</Text>

												{/* DÍA Y MES/AÑO */}
												<View>
													<Text
														style={{
															fontSize: 16,
															fontWeight: "600",
														}}
													>
														{format(day, "eeee")}
													</Text>

													<Text
														style={{
															fontSize: 14,
															color: "#666",
														}}
													>
														{format(
															day,
															"MMM yyyy"
														)}
													</Text>
												</View>
											</View>

											{/* DERECHA: MONTO */}
											<Text
												style={{
													fontSize: 20,
													fontWeight: "bold",
												}}
											>
												{formatearMoneda(
													parseFloat(dayTotal),
													"en-US",
													"USD"
												)}
											</Text>
										</View>

										{/* 🟩 Items de ese día */}
										{items.map((o) => (
											<TransactionItem
												key={o.id}
												styles={styles}
												o={o}
												types={types}
												categories={categories}
												collection={"transactions"}
											/>
										))}
									</View>
								);
							}
						)}
					</ScrollView>
				</View>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	contaiterMargin: {
		flex: 1,
		padding: 10,
		backgroundColor:"rgba(0, 0, 0, 1)"
	},

	filaSuperior: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
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
		fontSize: 18,
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
});
