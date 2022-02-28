import { Button } from '@mui/material';
import React, { useState } from 'react';
import { BlocActionButton , ButtonIcon} from "../../assets/styles/componentStyle"

export default function ButtonAction({ children, className='', icon=null, setCount=null}) {

    const [toggleAction, setToggleAction] = useState(false);
    const [countNotif, setCountNotif] = useState(setCount);
    return (
        <BlocActionButton className={className}>
            <ButtonIcon className={`btn-white ${toggleAction ? 'isopen' : ''}`} 
                onClick={() => { 
                    setToggleAction(!toggleAction); 
                    setTimeout(() => {
                        setCountNotif("")
                    }, 1000);  
                }} >
                {icon}
                 {countNotif ? <span className='count-notif'>{countNotif}</span> : null} 
            </ButtonIcon>
            {toggleAction ? 
                <div className="content-button-action">
                    {children}
                </div>
            : null}
            
        </BlocActionButton>
        
    )
}
