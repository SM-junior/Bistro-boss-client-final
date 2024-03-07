import React from 'react';
import { PaymentElement, CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { async } from '@firebase/util';

const CheckOutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        })

        if (error) {
            console.log('error', error);
        }
        else {
            console.log('paymentMethod', paymentMethod);
        }
    }

    return (
        <div className='bg-slate-200 mx-auto w-1/2 p-3 rounded-xl'>
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
                <button className='btn btn-sm my-4' type="submit" disabled={!stripe}>
                    Pay
                </button>
            </form>
        </div>
    );
};

export default CheckOutForm;