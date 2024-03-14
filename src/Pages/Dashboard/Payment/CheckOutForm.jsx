import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState, useEffect, useContext } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { authContext } from '../../../Provider/AuthProvider';
import './checkoutForm.css'

const CheckoutForm = ({ cart, price }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState();
    const { user } = useContext(authContext);
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    // console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [price, axiosSecure])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)
        if (card == null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message)
            console.log('error', error);

        } else {
            setError('')
            // console.log('payment Method', paymentMethod);
        }

        setProcessing(true)

        //confirm card payment...........
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || 'anonymous',
                        email: user?.email || 'unknown'
                    },
                },
            })

        if (confirmError) {
            console.log(confirmError);
        }

        setProcessing(false)

        console.log("paymentIntent:-", paymentIntent);

        if (paymentIntent.status == 'succeeded') {
            const transactionId = paymentIntent.id;
            setTransactionId(transactionId)

            //save payment data to the database.................
            const payment = {
                email: user?.email,
                transactionId,
                price,
                data: new Date(),
                status: "service pending",
                quantity: cart.length,
                itemName: cart.map(item => item.name),
                cartItems: cart.map(item => item._id),
                menuItems: cart.map(item => item.menuItemId)
            }
            axiosSecure.post('/payments', payment)
                .then(res => {
                    if (res.data.insertedId) {
                        //confirm display
                    }
                    console.log(res.data.insertedResult);
                })


            console.log('transaction Id:', transactionId);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-sm w-24 mt-3 btn-primary' type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            {error && <p className='text-red-600'>{error}</p>}
            {transactionId && <p className='text-red-600'>Transaction ID: <span className='text-[12px] italic font-semibold'>{transactionId}</span></p>}
        </>
    );
};

export default CheckoutForm;