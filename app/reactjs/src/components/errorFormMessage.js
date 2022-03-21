import React from 'react'
import { ErroreMessageForm } from '../assets/styles/globalStyle'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

export default function ErrorFormMessage({text, onClick}) {
  return (
      <ErroreMessageForm>
          <AddCircleOutlinedIcon onClick={onClick} />
          <span>{text}</span>
      </ErroreMessageForm>
  )
}
