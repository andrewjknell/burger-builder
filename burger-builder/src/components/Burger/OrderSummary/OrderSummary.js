import React, { Component } from 'react';
import Auxilary from '../../../hoc/Auxilary/Auxilary';
import Button from '../../UI/Button/Button';


class OrderSummary extends Component {   
    render() {
        const ingredSum = Object.keys(this.props.ingredients)
            .map(igKey => {
                return (
                    <li key={igKey}>
                        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
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
                <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType='Danger' clicked={this.props.purchaseCancel}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.purchaseContinue}>ORDER</Button>
            </Auxilary>

        );
    }
}

export default OrderSummary;