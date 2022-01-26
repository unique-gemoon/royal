import React, { useState } from 'react';
import { MasonryItem } from '../../assets/styles/componentStyle';
import HeadItem from './headItem';

export default function ItemMasonry({item, setItem = ()=>{}}) {

    return (
        <MasonryItem>
            {/* <HeadItem item={item} setItem={setItem} /> */}
            <img style={{ width: "100%" }} src={item.image} alt='' />
        </MasonryItem>
    )
}
