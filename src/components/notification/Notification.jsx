import React from 'react';
import PropTypes from 'prop-types';
import css from './Notification.module.css';

export const Notification = ({ message }) => {
    return (
        <>
            <h3 className={css.msg}>{message}</h3>
        </>
    )
}

Notification.pripTypes = {
    message: PropTypes.string,
}