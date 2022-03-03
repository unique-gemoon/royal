import React from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { CountSee } from '../../assets/styles/componentStyle';

export default function SeeCounter({countSee, }) {
  return (
    <CountSee>
          {countSee} <VisibilityIcon />
    </CountSee>
    );
}
