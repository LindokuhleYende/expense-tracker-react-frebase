import { useState } from "react";
import { signOut } from "firebase/auth";
import useAddTransaction from "../../hooks/useAddTransaction";
import useGetTransactions from "../../hooks/useGetTransactions";
import useGetUserInfo from "../../hooks/useGetUserInfo";
import { useNavigate } from "react-router";
import { auth, db } from "../../config/firebase-config";
import { Button } from "react-bootstrap"
import "./expense.css"
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import useDeleteTransaction from "../../hooks/useDeleteTransaction";

function ExpenseTracker() {
    const { addTransaction } = useAddTransaction();
    const { transactions, transactionTotals } = useGetTransactions();
    const { name, profilePhoto } = useGetUserInfo();
    const navigate = useNavigate();

    const [description, setDescription] = useState("");
    const [transactionAmount, setTransactionAmount] = useState(0);
    const [transactionType, setTransactionType] = useState("expense");

    const { balance, income, expenses } = transactionTotals;

    //update    
    const [editId, setEditId] = useState(null);

    //delete
    const { deleteTransaction } = useDeleteTransaction();


    const onSubmit = (e) => {
        e.preventDefault();

        const transactionData = {
            description,
            transactionAmount,
            transactionType,
            name, // from useGetUserInfo()
            createdAt: serverTimestamp(),
        };

        if (editId) {
            const docRef = doc(db, "transactions", editId);
            updateDoc(docRef, transactionData)
                .then(() => {
                    console.log("Transaction updated!");
                    resetForm();
                })
                .catch((error) => console.error("Error updating transaction:", error));
        } else {
            addTransaction(transactionData)
                .then(() => {
                    console.log("Transaction added!");
                    resetForm();
                })
                .catch((error) => console.error("Error adding transaction:", error));
        }
    };

    const resetForm = () => {
        setDescription("");
        setTransactionAmount("");
        setTransactionType("expense");
        setEditId(null);
    };

    const startEdit = (transaction) => {
        setDescription(transaction.description);
        setTransactionAmount(transaction.transactionAmount);
        setTransactionType(transaction.transactionType);
        setEditId(transaction.id); // Firestore doc ID
    };

    const signUserOut = async () => {
        try {
            await signOut(auth);
            localStorage.clear();
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div className="container">
                <div className="balance-section">
                    {profilePhoto && (
                        <div className="profile">
                            {" "}
                            <img className="profile-photo" src={profilePhoto} alt="profile-pic" />
                        </div>

                    )}
                    <Button variant="outline-info" onClick={signUserOut}>
                        Sign Out
                    </Button>
                    <h1> {name}'s Expense Tracker</h1>
                    <div className="balance">
                        <h3> Your Balance</h3>
                        {balance >= 0 ? <h2> R{balance}</h2> : <h2> -R{balance * -1}</h2>}
                    </div>
                    <div className="summary">
                        <div className="income">
                            <h4> Income</h4>
                            <p>R{income}</p>
                        </div>
                        <div className="expenses">
                            <h4> Expenses</h4>
                            <p>R{expenses}</p>
                        </div>
                    </div>
                    <form className="form-section" onSubmit={onSubmit}>
                        <input
                            type="text"
                            placeholder="Description"
                            value={description}
                            required
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Amount"
                            value={transactionAmount}
                            required
                            onChange={(e) => setTransactionAmount(e.target.value)}
                        />
                        <br />

                        <input
                            type="radio"
                            id="expense"
                            value="expense"
                            checked={transactionType === "expense"}
                            onChange={(e) => setTransactionType(e.target.value)}
                        />
                        <label htmlFor="expense"> Expense</label>
                        <input
                            type="radio"
                            id="income"
                            value="income"
                            checked={transactionType === "income"}
                            onChange={(e) => setTransactionType(e.target.value)}
                        />
                        <label htmlFor="income"> Income</label>
                        <br />
                        <Button variant="outline-success" type="submit"> Add Transaction</Button>
                    </form>
                </div>

            </div>
            <div className="transaction-section">
                <h3> Transactions</h3>
                <ul>
                    {transactions.map((transaction) => {
                        const { id, description, transactionAmount, transactionType } =
                            transaction;
                        return (
                            <li key={id}>
                                <h4> {description} </h4>
                                <p>
                                    R{transactionAmount} •{" "}
                                    <label
                                        style={{
                                            color: transactionType === "expense" ? "red" : "green",
                                        }}
                                    >
                                        {" "}
                                        {transactionType}{" "}
                                    </label>
                                </p>
                                <Button variant="outline-info" onClick={() => startEdit(transaction)}>✏️ Edit</Button>
                                <Button variant="outline-light" onClick={() => {
                                    if (window.confirm("Are you sure you want to delete this transaction?")) {
                                        deleteTransaction(transaction.id);
                                    }
                                }}>🗑️ Delete</Button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
};

export default ExpenseTracker