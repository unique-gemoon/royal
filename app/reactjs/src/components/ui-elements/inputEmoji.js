import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FormEmoji } from '../../assets/styles/componentStyle';
import Input from './input';
import SendIcon from '@mui/icons-material/Send';
import Emojis from '../emojis';

export default function InputEmoji({ name, placeholder, typeInput, opened, setOpened = () => {}, ...props}) {
    const [state, setState] = useState({
        inputEmoji: {
            name: "message-input",
            placeholder: "Ecrire un message",
            value: "",
            type: "text",
            as: typeInput
        },
        opened
    });
    useEffect(() => {
        setOpened(state.opened);
    }, [state]);
    return (
        <FormEmoji className={props.className}>
            <div className='content-form-emoji'>
                <Input
                    {...state.inputEmoji}
                    onChange={(e) => {
                        const cpState = { ...state };
                        cpState.inputEmoji.value = e.target.value;
                        setState(cpState);
                    }}
                />
                <Emojis setState={setState} state={state} />
            </div>
            
            <Button className='btn-send-emoji'>
                <SendIcon />
            </Button>
        </FormEmoji>
    );
}
