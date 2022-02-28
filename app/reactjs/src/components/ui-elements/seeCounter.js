import React from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function SeeCounter({countSee, }) {
  return (
      <div className='see-count-bloc'>
          {countSee} <VisibilityIcon />
      </div>
    );
}
