import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publisherKey = 'pk_test_51H8UkkJEuWjkdYEWJj50VNqFMx7Z5VT6Zm2JptXA1jSxJHlSHlsDIqBOmsPDfANVHv6GbZwMt91RieciHrbWcAB400a48bCqEt';

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }

    return (
        <StripeCheckout 
            label= 'Pay Now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publisherKey}
        />  
    );
};

export default StripeCheckoutButton;