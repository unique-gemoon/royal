import React from 'react'
import { NotificationMessage } from '../assets/styles/componentStyle'
import { ContainerDef } from '../assets/styles/globalStyle'
import CloseIcon from '@mui/icons-material/Close';

export default function MessageNotif({ textNotif, showMessage, setShowMessage = () =>{}}) {
  return (
      <NotificationMessage className={showMessage ? "isMesssage" : ""}>
        <ContainerDef>
            <span>{textNotif}</span>
              <CloseIcon onClick={() => setShowMessage(!showMessage)} />
        </ContainerDef>

    </NotificationMessage>
  )
}
