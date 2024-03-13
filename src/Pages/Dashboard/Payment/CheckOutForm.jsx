import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState, useEffect, useContext } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { authContext } from '../../../Provider/AuthProvider';

const CheckoutForm = ({ price }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState();
    const {user} = useContext(authContext);
    const [processing, setProcessing]=useState(false);
    const [transactionId, setTransactionId]=useState('');

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price })
            .then(res => {
                // console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret)
            })
    }, [])

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

        console.log("paymentIntent:-",paymentIntent);

        if(paymentIntent.status=='succeeded'){
            const transactionId=paymentIntent.id;
            setTransactionId(transactionId)
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
                <button className='btn btn-sm w-24 mt-6 btn-primary' type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            {error && <p className='text-red-600 py-6'>{error}</p>}
            {transactionId && <p className='text-red-600 py-6'>Transaction ID: <span className='text-[12px] italic font-semibold'>{transactionId}</span></p>}
        </>
    );
};

export default CheckoutForm;