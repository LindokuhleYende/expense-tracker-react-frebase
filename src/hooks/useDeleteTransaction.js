import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";

function useDeleteTransaction() {
    const deleteTransaction = async (transactionId) => {
        try {
            const docRef = doc(db, "transactions", transactionId);
            await deleteDoc(docRef);
            console.log("Transaction deleted:", transactionId);
        } catch (error) {
            console.error("Error deleting transaction:", error);
        }
    };

    return { deleteTransaction };
}

export default useDeleteTransaction;
