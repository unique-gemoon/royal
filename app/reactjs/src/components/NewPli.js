import React, { useEffect, useRef, useState } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { BlocAddPli } from '../assets/styles/componentStyle';
import { useOutsideAlerter } from '../helper/events';

export default function NewPli() {
    const [togglePli, setTogglePli] = useState(false);
    const ref = useRef(null);
    useOutsideAlerter(ref, () => setTogglePli(false));
    useEffect(() => {
        if (togglePli) {
            document.body.classList.add("add-pli-showing");
        } else {
            document.body.classList.remove("add-pli-showing");
        }
    }, [togglePli]);
  return (
    <BlocAddPli>
          {togglePli ? 
            <div className="bloc-new-pli">
                  <div className='content-new-pli'>
                    Hello
                </div>
            </div> 
          : null}
          
          <div onClick={() => setTogglePli(!togglePli)} className={`toggled-new-pli ${togglePli ? "open-pli" : ""}`}>
            <KeyboardArrowUpIcon /> 
        </div>
    </BlocAddPli>
  );
}
