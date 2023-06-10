import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../Provider/AuthProvider';

const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        if (user && user.email) {
            fetch(`http://localhost:5000/payment?user_email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setTransactions(data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [user]);

    const sortedTransactions = [...transactions].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA; // Sort in descending order (newest to oldest)
    });

    return (
        <div className='text-center'>
            <h2>Payment ({transactions.length})</h2>
            {sortedTransactions.length > 0 ? (
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Date</th>
                                <th>Card Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedTransactions.map((transaction, index) => (
                                <tr key={transaction._id}>
                                    <td>{index + 1}</td>
                                    <td>{transaction.date}</td>
                                    <td>{transaction.cardNumber}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No selected transactions found.</p>
            )}
        </div>
    );
};

export default PaymentHistory;
