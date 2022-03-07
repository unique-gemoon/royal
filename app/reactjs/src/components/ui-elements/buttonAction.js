import { Button } from '@mui/material';
import React, { useRef, useState } from 'react';
import { BlocActionButton , ButtonIcon} from "../../assets/styles/componentStyle";
import { motion, useCycle } from "framer-motion";

export default function ButtonAction({ children, className = '', icon = null, setCount = null, action, setAction = () => { }}) {

    const [toggleAction, setToggleAction] = useState(false);
    const [countNotif, setCountNotif] = useState(setCount);
    const containerRef = useRef(null);
    const sidebar = {
        open:{
            transition: {
                opacity: 1,
                duration: 0.15
            }
        },
        closed: {
            transition: {
                opacity: 0,
                duration: 0.15
            }
        }
    };
    return (
        <BlocActionButton className={className}>
            <ButtonIcon className={`btn-white ${action.isOpen ? 'isopen' : ''}`} 
                onClick={() => { 
                    setAction({...action, isOpen:!action.isOpen}); 
                    console.log(action)
                    setTimeout(() => {
                        setCountNotif("")
                    }, 1000);  
                }} >
                {icon}
                 {countNotif ? <span className='count-notif'>{countNotif}</span> : null} 
            </ButtonIcon>
            {action.isOpen ? 
                <motion.div 
                    initial={false}
                    variants={sidebar}
                    animate={action.isOpen ? "open" : "closed"}
                    ref={containerRef}
                className="content-button-action">
                    {children}
                </motion.div>
            : null}
            
        </BlocActionButton>
        
    )
}
