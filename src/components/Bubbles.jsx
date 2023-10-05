import React from 'react';
import classes from './Bubbles.module.css';

const Bubbles = (props)=>{
    return(
        <li key={props.id} className={props.isUser ? classes.right : classes.left}>
            <p>{props.mess}</p>
        </li>
    )
}

export default Bubbles;