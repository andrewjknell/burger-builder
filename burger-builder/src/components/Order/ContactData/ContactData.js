import React, { Component } from 'react';
import axios from '../../../axios';
import { connect } from 'react-redux';

import classes from './ContactData.css';
import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';
import Input from '../../UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email',
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            zip: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Zip Code',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched: false,
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'none', displayValue: 'Please Choose One' },
                        { value: 'cheapest', displayValue: 'Cheapest' },
                        { value: 'fastest', displayValue: 'Fastest' },
                    ]
                },
                validation: {},
                value: 'none',
                valid: true,
            },
        },
        formIsValid: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {}
        for (let i in this.state.orderForm) {
            formData[i] = this.state.orderForm[i].value;
        }
        const order = {
            totalPrice: this.props.totalPrice,
            ingredients: this.props.ings,
            orderData: formData,
            userId: this.props.userId,
        }

        this.props.onOrderBurger(order, this.props.token);
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.validation),
            touched: true,
        });
        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputIdentifier]: updatedFormElement
        })
   
        let formIsValid = true;
        for (let i in updatedOrderForm) {
            formIsValid = updatedOrderForm[i].valid && formIsValid
        }
        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
        })
    }

    render() {
        let formElementsArray = [];
        for (let i in this.state.orderForm) {
            formElementsArray.push({
                id: i,
                config: this.state.orderForm[i],
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(el => {
                    return (
                        <Input
                            key={el.id}
                            elementType={el.config.elementType}
                            elementConfig={el.config.elementConfig}
                            value={el.config.value}
                            invalid={!el.config.valid}
                            shouldValidate={el.config.validation}
                            touched={el.config.touched}
                            changed={(event) => this.inputChangeHandler(event, el.id)}
                        />
                    )
                })}
                <Button btnType='Success' disabled={!this.state.formIsValid} clicked={this.orderHandler}>Order</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />
        };
        return (
            <div className={classes.ContactData}>
                <h3>Enter Your Contact Data</h3>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burger.ingredients,
        totalPrice: state.burger.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));