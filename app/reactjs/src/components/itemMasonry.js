import React, { useState } from 'react';
import HeadItem from './itemMasonry/headItem';


export default function ItemMasonry({item, setItem = ()=>{}}) {

    return (
        <div className='item-masonry'>
            {/* <HeadItem item={item} setItem={setItem} /> */}
            <img style={{ width: "100%" }} src={item.image} alt='' />
        </div>
    )
}
