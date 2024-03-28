import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import SectionTitle from '../../../Components/SectionTitle';
import CheckoutForm from './CheckoutForm';
import useCart from '../../../hooks/useCart';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
    const [cart] = useCart();
    //calculate total cart items price
    const total = cart.reduce((acc, item) => { return acc + item.price }, 0);
    //convert price into 2 decimal( point. ar por only 2ta digit thakbe )
    const price = parseInt(total.toFixed(2))


    return (
        <div>
            <SectionTitle subTitle='Please Process' title='payment'></SectionTitle>
            <div className='w-3/4 mx-auto'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm cart={cart} price={price} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment; 