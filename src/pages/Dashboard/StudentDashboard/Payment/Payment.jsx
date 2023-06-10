import { AuthCredential } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useLoaderData, useLocation, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../../Provider/AuthProvider';
import Swal from 'sweetalert2';

const Payment = () => {
    const {user}=useContext(AuthContext)
    const {email}=user;
    const [cardNumber, setCardNumber] = useState('');
    const [date, setDate] = useState('');
    const [code, setCode] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                cardNumber,
                date,
                code
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.insertedId){
                    Swal.fire(
                        'Success!',
                        'Payment Successfull.',
                        'success'
                    );
                }
                navigate('/dashboard/selectedClasses')
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div>
            <h1 className="text-4xl font-bold text-green-500 text-center mt-16 mb-16">Payment</h1>
            <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="cardNumber" className="block text-green-500 text-lg  font-bold mb-2">
                        Card Number
                    </label>
                    <input
                        type="text"
                        id="cardNumber"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-green-500 text-lg focus:outline-none focus:shadow-outline"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="Enter your card number"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="expirationDate" className="block text-green-500 text-lg font-bold mb-2">
                        Payment Date
                    </label>
                    <input
                        type="date"
                        id="expirationDate"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-green-500 text-lg focus:outline-none focus:shadow-outline"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        placeholder="Enter the expiration date"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="cvv" className="block text-green-500 text-lg font-bold mb-2">
                        Code
                    </label>
                    <input
                        type="text"
                        id="cvv"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-green-500 text-lg focus:outline-none focus:shadow-outline"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Enter the code"
                        required
                    />
                </div>
                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Submit Payment
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Payment;
