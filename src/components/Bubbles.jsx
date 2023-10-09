import React from 'react';
import classes from './Bubbles.module.css';

const Bubbles = (props)=>{
    return(
        <li key={props.key} className={props.isUser ? classes.right : classes.left}>
            <p className={classes.message}>{props.mess}</p>
            <p className={classes.name}>{'-'+props.name}</p>
        </li>
    )
}

export default Bubbles;