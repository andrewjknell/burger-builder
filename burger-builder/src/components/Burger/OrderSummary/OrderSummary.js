import React from 'react';
import Auxilary from '../../../hoc/Auxilary';
import Button from '../../UI/Button/Button';


const orderSummary = (props) => {
    const ingredSum = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
                </li>
            );
        })
    return (
        <Auxilary>
            <h3>your order</h3>
            <p>a delicious burger with the following ingredients</p>
            <ul>
                {ingredSum}
            </ul>
            <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType='Danger' clicked={props.purchaseCancel}>CANCEL</Button>
            <Button btnType='Success' clicked={props.purchaseContinue}>ORDER</Button>
        </Auxilary>

    );
}

export default orderSummary;