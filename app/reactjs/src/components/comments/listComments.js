import React, { useState } from 'react';
import ItemComment from './itemComment';
import ItemCommentSimple from './itemCommentSimple';

export default function ListComments({items, ...props}) {
    console.log(props.state);
  return (
    <>
      {!props.state ?
        <div className='list-comments'>
          {items && items.map((item, index) => (
            <ItemComment key={index} name={item.user} time={item.time} subject={item.subject} children={item.reponses} />
          ))}
        </div>
        : <div className='list-comments liste-comment-modal'>
          {items && items.map((item, index) => (
            <ItemCommentSimple key={index} item={item} />
          ))}
        </div>
      }
    </>
    
  );
}
