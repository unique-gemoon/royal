import { Container } from 'react-bootstrap';
import styled from "styled-components";
import underlineIcon from "../images/icons/underlineIcon.svg";



export const BleuColor = "#225282";
export const OrangeColor = "#EDAF5D";
export const mixinIcon = ({ urlIcon, width, height, important = false }) => `
  width: ${width}px;
  min-width: ${width}px;
  height: ${height}px;
  background: url(${urlIcon}) ${important ? "!important" : ""};
  display: inline-block;
  vertical-align: middle;
  background-repeat: no-repeat;
  background-size: contain;
`;

export const UnderlineIcon = styled.i`
  ${mixinIcon({ urlIcon: underlineIcon, width: 15, height: 15 })};
`;
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
        pointer-events: none;
        z-index: 99;
    }
`;
export const ContainerDef = styled(Container)`

    @media(min-width: 1200px){
        max-width: 1200px;
    }
    @media(min-width: 1430px){
        max-width: 1380px;
    }
    & > div{
        margin: 0;
    }
`;
export const HeadContentItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 7px 19px 12px 13px;
    .name-post{
        margin-right: 5px;
        font-family: 'ProximaNovaSoftW03-Semibold';
        cursor: pointer;
    }
    .MuiTooltip-popper{
        .MuiTooltip-tooltip{
            width: 172px;
            height: 172px;
            border-radius: 50%;
            background-color: #225282;
            color: #FFF;
            margin: 10px 0;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
        }
        &[data-popper-placement*="top"] {
            .MuiTooltip-arrow{
                margin-bottom: -1em;
            }
        }
        &[data-popper-placement*="bottom"] {
            .MuiTooltip-arrow{
                margin-top: -1em;
            }
        }
        .MuiTooltip-arrow{
            color: #225282;
            width: 1.6em;
            height: 1.1em;
        }
        .name-post{
            color: #FFF;
            font-size: 15px;
            line-height: 1;
            padding-bottom: 10px;
            width: calc(100% - 10px);
            display: block;
            margin: 0 auto 10px;
            max-height: 40px;
            position: relative;
            cursor: default;
            &::before{
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                border: 1px dashed #61728C;
            }
        }
        .folowers-post {
            width: 100%;
            display: flex;
            justify-content: center;
            .abonnes-post {
                margin: 0 8px;
                font-size: 13px;
                line-height: 13px;
                color: #9BA7BC;
                margin-bottom: 8px;
                span{
                    font-size: 14px;
                    line-height: 14px;
                    font-family: 'ProximaNovaSoftW03-Semibold';
                    display: block;
                    color: #FFF;
                }
            }
        }
        .tooltip-btns-action {
            display: flex;
            align-items: center;
            justify-content: center;
            button{
                min-width: auto;
                padding: 0;
                &.toggle-item-message {
                    color: #EDAF5D;
                    border-radius: 50%;
                    border: 1px solid #EDAF5D;
                    padding: 3px;
                    width: 28px;
                    height: 28px;
                    min-width: 28px;
                    margin-right: 5px;
                    svg{
                        font-size: 18px;
                    }
                }
                &.btn-switch-folowers{
                    background-color: #FFF;
                    font-family: 'ProximaNovaSoftW03-Semibold';
                    font-size: 13px;
                    line-height: 14px;
                    height: 26px;
                    color: #edaf5d;
                    border-radius: 24px;
                    text-transform: capitalize;
                    padding: 4px 10px;
                    svg{
                        margin-left: 3px;
                        font-size: 18px;
                    }
                }
            }
        }
    }
    
    .timer-post{
        font-size: 14px;
        line-height: 24px;
        color: #798993;
    }
    .bloc-content-item{
        width: 100%;
        display: flex;
        align-items: center;
    }
    .option-item{
        margin-left: auto;
        display: flex;
        align-items: center;
        font-size: 14px;
        line-height: 1;
        svg{
            color: #96A9B2;
            font-size: 18px;
            margin-left: 3px;
            &.open-zoom-icon{
                color: #071D33;
                font-size: 14px;
            }
        }
        & > div{
            margin-left: 15px;
            cursor: pointer;
        }
        .users-enligne-pli{
            display: flex;
            align-items: center;
            
        }
        .nb-message-comment{
            display: flex;
            align-items: center;
        }
    }
`;
export const DetailsItems = styled.div`
    display: flex;
    align-items: center;
    .item-detail{
        height: 23px;
        width: 23px;
        min-width: 23px;
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
        &.soundage-detail{
            background-color: #62c4b4;
        }
    }
`;
export const FooterDefault = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
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