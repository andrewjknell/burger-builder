import React from 'react';
import Auxilary from '../../hoc/Auxilary';
import classes from './Layout.css';

const layout = (props) => (
    <Auxilary>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Auxilary>
);

export default layout;