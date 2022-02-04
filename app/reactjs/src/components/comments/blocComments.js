import React, { useState } from 'react';
import { CommentsBloc } from '../../assets/styles/componentStyle';
import CommentForm from './commentForm';
import ListComments from './listComments';

export default function BlocComments({item}) {
    const [opened, setOpened] = useState(false);
    return (
        <CommentsBloc className={`${opened ? 'emoji-open' : ''}`}>
            <CommentForm opened={opened} setOpened={setOpened}/>
            <ListComments items={item.comments} />
        </CommentsBloc>
    );
}
