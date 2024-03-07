import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from './CheckOutForm';
import {loadStripe} from '@stripe/stripe-js';


const stripePromise=loadStripe('import.meta.env.PK')
const Payment = () => {
    return (
        <div>
            <Helmet><title>Bistro Boss || payment</title></Helmet>
            <div className='text-center py-10'>
                <h2 className='text-2xl font-semibold'>Payment</h2>
                <Elements stripe={stripePromise}>
                    <CheckOutForm></CheckOutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;