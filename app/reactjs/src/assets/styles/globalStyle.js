import { Container } from 'react-bootstrap';
import styled from "styled-components";



export const BleuColor = "#225282";
export const OrangeColor = "#EDAF5D";

export const DefaultMain = styled.div`
    position: relative;
    padding: 30px 0;
    &:before{
        content: "";
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 200px;
        background: linear-gradient(rgba(130, 179, 244, 0) 0%, #80b1f4 93.45%);
    }
`;
export const ContainerDef = styled(Container)`
    @media(min-width: 1200px){
        max-width: 1380px;
    }
`;
export const HeadContentItem = styled.div`
    display: flex;
    align-items: center;
    .name-post{
        margin-right: 5px;
        font-family: 'ProximaNovaSoftW03-Semibold';
    }
    .timer-post{
        font-size: 14px;
        line-height: 24px;
        color: #798993;
    }
`;
export const DetailsItems = styled.div`
    display: flex;
    align-items: center;
    .item-detail{
        height: 23px;
        width: 23px;
        border-radius: 50%;
        color: #FFF;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 5px;
        & > svg{
            font-size: 15px;
        }
        &.format-text-detail{
            background-color: #6ed5ed;
        }
        &.sound-detail{
            background: linear-gradient(#fc6965 0.01%, #fc9765 92.44%);
        }
        &.image-detail{
            background-color: #edaf5d;
        }
        &.video-detail{
            background: linear-gradient(#d34b48 9.26%, #cd4b48 100%);
        }
    }
`;
export const FooterDefault = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    .see-count-bloc{
        font-family: 'ProximaNovaSoftW03-Semibold';
        font-size: 20px;
        color: #1E52A0;
        display: flex;
        align-items: center;
        & > svg{
            margin-left: 10px;
        }
    }
`;
export const OptionsBtnAction = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    float: right;

`;