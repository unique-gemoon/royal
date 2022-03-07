import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { BarTimer } from '../assets/styles/componentStyle';
import { Button } from "@mui/material";
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
export default function BarTemporelle({ state, setState, ...props}) {
    return (
        <BarTimer>
            <LinearProgress className="progressBar-item" variant="determinate" value={93} />
            <div className='bloc-timer-Bar'>
                <Button><RemoveIcon /></Button>
                <div className='content-timer-bar'>
                    <span className='timer-down'>320</span>
                    <div className='timer-item'>
                        <TimerOutlinedIcon /> 04 : 12 : 06
                    </div>
                    <span className='timer-up'>400</span>
                </div>
                <Button><AddIcon /></Button>
            </div>
        </BarTimer>
    );
}
