import React, { Component } from 'react';
import axios from '../../../axios-orders';

import classes from './ContactData.css';
import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';
import Input from '../../UI/Input/Input';

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
                    required: true
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
        loading: false,
    }

    orderHandler = () => {
        this.setState({ loading: true });
        const formData = {}
        for (let i in this.state.orderForm) {
            formData[i] = this.state.orderForm[i].value;
        }
        const order = {
            totalPrice: this.props.price,
            ingredients: this.props.ingredients,
            orderData: formData,
        }
        axios.post('/orders.json', order)
            .then(res => {
                this.setState({ loading: false })
                this.props.history.push('/orders');
            })
            .catch(err => {
                this.setState({ loading: false })
            })
    }

    checkValid(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = { ...this.state.orderForm }
        const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValid(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for(let i in updatedOrderForm){
            formIsValid = updatedOrderForm[i].valid && formIsValid
        }
        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
        })
    }

    render() {
        const formElementsArray = [];
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
        if (this.state.loading) {
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

export default ContactData;