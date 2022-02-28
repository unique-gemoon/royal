import { LinearProgress } from '@mui/material';
import React from 'react'
import { CountDownStyle } from '../../assets/styles/componentStyle';

export default function CountDown({maxCount, setState}) {
  const count = maxCount - setState;

  return (
    <CountDownStyle>
          <span className={`count-text ${count === 0 ? "typing-stop": ""}`}>{count}</span>
          <LinearProgress className="progressBar-item" variant="determinate" value={count * 100 / maxCount} />
    </CountDownStyle>
      
  )
}
