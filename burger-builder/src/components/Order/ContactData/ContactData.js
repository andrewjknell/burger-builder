import React, { Component } from 'react';
import axios from '../../../axios-orders';

import classes from './ContactData.css';
import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            zip: '',
        },
        loading: false,
    }

    orderHandler = () => {
        this.setState({ loading: true });
        const order = {
            customerData: {
                name: 'andrew',
                address: {
                    street: '1234 st',
                    state: 'ca',
                },
                email: 'test@gmail.com'
            },
            totalPrice: this.props.price,
            ingredients: this.props.ingredients,
        }
        console.log(order.totalPrice, '------------------')
        axios.post('/orders.json', order)
            .then(res => {
                this.setState({ loading: false })
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({ loading: false })
            })
    }

    render() {
        let form = (
            <form>
                <input className={classes.Input} type='text' name='name' placeholder='Your Name' />
                <input className={classes.Input} type='email' name='email' placeholder='Your Email' />
                <input className={classes.Input} type='text' name='street' placeholder='Street' />
                <input className={classes.Input} type='text' name='zip' placeholder='Zip Code' />
                <Button btnType='Success' clicked={this.orderHandler}>Order</Button>
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