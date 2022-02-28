import React from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button } from '@mui/material';

export default function HeadOptionItem({ item, setItem = () => {}}) {
    return (
        <div>
            <Button onClick={()=>{ 
                    setItem({...item,isOpen:true});
                }
            }>
                <VisibilityIcon /> 
            </Button>{item.isOpen ? 'opened' : "no Opned"}
        </div>
    )
}
