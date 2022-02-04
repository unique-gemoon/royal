import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FormComment } from '../../assets/styles/componentStyle';
import Input from '../ui-elements/input';
import SendIcon from '@mui/icons-material/Send';
import Emojis from '../emojis';

export default function CommentForm({ opened, setOpened = () => {}}) {
    const [state, setState] = useState({
        comment: {
            name: "comment-input",
            placeholder: "Mon commentaire",
            value: "",
            type: "text",
        },
        opened
    });
    useEffect(() => {
        setOpened(state.opened);
    }, [state]);
    return (
        <FormComment>
            <div className='content-form-comment'>
                <Input
                    {...state.comment}
                    onChange={(e) => {
                        const cpState = { ...state };
                        cpState.comment.value = e.target.value;
                        setState(cpState);
                    }}
                />
                <Emojis setState={setState} state={state} />
            </div>
            
            <Button className='btn-send-comment'>
                <SendIcon />
            </Button>
        </FormComment>
    );
}
