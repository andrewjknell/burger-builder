import React from 'react';
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl';


const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Meat', type: 'meat' },
    { label: 'Cheese', type: 'cheese' },
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price <strong>{props.curPrice.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                added={() => props.ingredAdded(ctrl.type)}
                subbed={() => props.ingredSub(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
            />
        ))}
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            >ORDER NOW</button>
    </div>
)

export default buildControls