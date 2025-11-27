import { TransactionList } from '../../components/transactionsList';
import {HeaderTabs} from '../../components/headerTabs'


export default function Index() {
    return <>
        <HeaderTabs titleScreen="Transactions" destinationURL="/transactionAddScreen"  />
    <TransactionList />
    </> 

}

