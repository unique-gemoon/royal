import React from 'react'
import CotteIcon from '../../assets/images/icons/cotteIcon'
import { SimpleComment } from '../../assets/styles/componentStyle'

export default function ItemCommentSimple({item}) {
  return (
    <SimpleComment className={`${item.cotte ? "cotte-comment" : ""}`}>
      {item.cotte ? <span className='cotte-comment'><CotteIcon /></span> : null}
      <div className="head-comment">
        <span className="name-user-comment">{item.user}</span>
        {item.time ? " . " : null}
        <span className="time-comment">Il y a {item.time}</span>
      </div>
      {item.citation && 
        <div div className='citation-bloc'>
          <span className='citation-user'>{item.citation.citationUser}</span>
          <span className='citation-text'>{item.citation.citationText}</span>
        </div>
      }
      <div className="content-text-comment"> {item.subject}</div>
    </SimpleComment>
  )
}
