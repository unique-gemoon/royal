import React from "react";
import { useSelector } from 'react-redux';
import { useMediaQuery } from "react-responsive";
import { Row, Col } from "react-bootstrap";
import OptionsBtnFooter from "./optionsBtnFooter";
import {
  ContainerDef,
  FooterDefault,
} from "../assets/styles/globalStyle";
import NewPli from "./newPli";
import SeeCounter from "./ui-elements/seeCounter";
import ProfileMenu from "./profileMenu";
import { ROLES } from "../config/vars";


export default function FooterHome({
    action,
    setAction = () => {},
    dataNotifs,
    setDataNotifs = () => {},
    setMsgNotifTop = () => {},
  }) {

    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1199px)" });
    const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1200px)" });
    const auth = useSelector((store) => store.auth);

    return (<FooterDefault>
        {isDesktopOrLaptop && (
          <ContainerDef>
            <Row className="align-items-center">
              <Col md={3}>
                <div className="d-md-flex align-items-center">
                {auth.roles.includes(ROLES.ROLE_USER) && <ProfileMenu setMsgNotifTop={setMsgNotifTop}/>}
                  <SeeCounter countSee={14} />
                </div>
              </Col>
              <Col md={6}>
                <NewPli action={action} setAction={setAction} setMsgNotifTop={setMsgNotifTop}/>
              </Col>
              <Col md={3}>
                <OptionsBtnFooter
                  action={action}
                  setAction={setAction}
                  dataNotifs={dataNotifs}
                  setDataNotifs={setDataNotifs}
                  setMsgNotifTop={setMsgNotifTop}
                />
              </Col>
            </Row>
          </ContainerDef>
        )}
        {isTabletOrMobile && (
          <OptionsBtnFooter
            action={action}
            setAction={setAction}
            dataNotifs={dataNotifs}
            setDataNotifs={setDataNotifs}
            setMsgNotifTop={setMsgNotifTop}
          />
        )}
      </FooterDefault>);
}
