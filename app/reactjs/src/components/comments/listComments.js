import React, { useState } from 'react';
import ItemComment from './itemComment';

export default function ListComments({items}) {
    
  return (
    <div className='list-comments'>
      {items && items.map((item, index) => (
        <ItemComment key={index} name={item.user} time={item.time} subject={item.subject} children={item.reponses} />
      ))}
    </div>
  );
}
