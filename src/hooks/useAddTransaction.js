import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import useGetUserInfo from "./useGetUserInfo";

function useAddTransaction() {
    const transactionCollectionRef = collection(db, "transactions");
    const { userID } = useGetUserInfo();
    const addTransaction = async ({
        description,
        transactionAmount,
        transactionType,
    }) => {
        if (!userID) {
            throw new Error("User ID is missing. Please log in again.");
        }
        await addDoc(transactionCollectionRef, {
            userID,
            description,
            transactionAmount,
            transactionType,
            createdAt: serverTimestamp(),
        });
    };
    return { addTransaction };
};

export default useAddTransaction