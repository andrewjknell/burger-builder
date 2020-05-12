import React from 'react';

import classes from './Order.css';

const order = (props) => {
    const ingredients = [];
    for (let i in props.ingredients) {
        ingredients.push({
            name: i,
            amount: props.ingredients[i]
        })
    }

    const ingredOutput = ingredients.map(ig => {
        return (
            <span
                style={{
                    display: 'inline-block',
                    textTransform: 'capitalize',
                    margin: '0 8px',
                    border: '1px solid #ccc',
                    padding: '5px'
                }}
                key={ig.name}
            >{ig.name}: {ig.amount},</span>
        )
    })
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredOutput}  </p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )
};

export default order;