import React, {ReactNode, useState} from 'react';

import './AlertBox.css';

function AlertBox(props) {
    const visible = 'flex';
    const invisible = 'none';
    const [isVisible,  setIsVisible] = useState(props.isInUse? visible : invisible);

    function handleNoClick() {
        setIsVisible(invisible);
    }

    return (
        <div className='divAlert' style={{display: isVisible}}>
            <label>{props.message}</label>
            <button className='bYesAlert' type='button' onClick={handleNoClick}>No</button>
            <button className='bYesAlert' type='button' onClick={props.yesClick}>Yes</button>
        </div>
    );
}

export default AlertBox;