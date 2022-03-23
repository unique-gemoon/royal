import React from "react";
import { Col, Row } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import {
  ContainerDef,
  FooterDefault
} from "../assets/styles/globalStyle";
import ConnexionForm from "./connexionForm";
import InscriptionForm from "./inscriptionForm";
import SeeCounter from "./ui-elements/seeCounter";

export default function FooterAuthHome({ setMsgNotifTop = () => {} }) {
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1200px)" });
  
  return (
    <FooterDefault>
      <ContainerDef>
        <Row className="align-items-center justify-content-center">
          {isDesktopOrLaptop && (
            <Col md={3}>
              <div className="d-md-flex">
                <SeeCounter countSee={14} />
              </div>
            </Col>
          )}
          <Col md={6}>
            <div className="d-flex justify-content-center">
              <InscriptionForm/>
              <ConnexionForm setMsgNotifTop={setMsgNotifTop}/>
            </div>
          </Col>
          {isDesktopOrLaptop && <Col md={3}></Col>}
        </Row>
      </ContainerDef>
    </FooterDefault>
  );
}
