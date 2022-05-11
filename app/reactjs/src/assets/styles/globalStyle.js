import { Container } from 'react-bootstrap';
import styled from "styled-components";
import underlineIcon from "../images/icons/underlineIcon.svg";
import replyIcon from "../images/icons/replyIcon.svg";
import iconPlus from "../images/icons/iconPlus.svg";
import replyIconGreen from "../images/icons/replyIconGreen.svg";
import { Button, Modal } from '@mui/material';



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
export const ReplyIcon = styled.i`
  ${mixinIcon({ urlIcon: replyIcon, width: 10, height: 9 })};
`;
export const ReplyIconGreen = styled.i`
  ${mixinIcon({ urlIcon: replyIconGreen, width: 10, height: 9 })};
`;
export const PlusIcon = styled.i`
  ${mixinIcon({ urlIcon: iconPlus, width: 13, height: 13 })};
`;
export const ButtonDefault = styled(Button)`
    min-width: 132px;
    height: 32px;
    transition: .3s ease-in-out;
    font-family: "ProximaNovaSoftW03-Semibold";
    font-size: 18px;
    line-height: 22px;
    border-radius: 7px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: ${OrangeColor};
    text-transform: initial;
    background-color: #FFF;
    transition: .3s ease-in-out;
    padding: 6px 20px;
    &:hover{
        background-color: ${OrangeColor};
        color: #FFF;
    }
    .spinner-grow{
        margin-right: 10px;
    }
`;
export const DefaultMain = styled.div`
    position: relative;
    padding: 30px 0;
    @media(max-width: 1200px){
        padding-top: 0;
    }
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
    & > div{
        margin: 0;
        &.masonry-two-columns{
            align-content: flex-start;
        }
    }
    max-width: 100%;
    @media(max-width: 320px){
        padding: 0;
    }
`;
export const HeadContentItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 7px 19px 12px 13px;
    .user-info-tooltip{
        display: inline-flex;
    }
    .name-post{
        margin-right: 5px;
        font-family: 'ProximaNovaSoftW03-Semibold';
        cursor: pointer;
        @media(max-width: 575px){
            margin-right: 0;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            max-width: 62px;
            display: inline-block;
        }
        @media(max-width: 320px){
            max-width: 48px;
        }
    }
    .default-tooltip{
        .MuiTooltip-popper{
            .MuiTooltip-tooltip{
                margin-top: 3px;
                padding: 5px 10px;
                background-color: #1e52a0;
            }
            .MuiTooltip-arrow{
                color: #1e52a0;
            }
        }
    }
    .user-info-tooltip{
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
                        transition: .3s ease-in-out;
                        svg{
                            font-size: 18px;
                        }
                        &:hover{
                            color: #FFF;
                            background-color: #edaf5d;
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
                        transition: .3s ease-in-out;
                        svg{
                            margin-left: 3px;
                            font-size: 18px;
                        }
                        &:hover{
                            color: #FFF;
                            background-color: #edaf5d;
                        }
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
            transition: .3s ease-in-out;
            &.open-zoom-icon{
                color: #071D33;
                font-size: 14px;
            }
        }
        & > div{
            margin-left: 15px;
            cursor: pointer;
            @media(max-width: 320px){
                margin-left: 8px;
            }
        }
        
        .users-enligne-pli{
            display: flex;
            align-items: center;
            &:hover{
                svg{
                    &:first-of-type{
                        color: ${OrangeColor};
                    }
                }
            }
            
        }
        .nb-message-comment{
            display: flex;
            align-items: center;
            svg{
                &:last-child{
                    transition: none;
                    transform-origin: center
                }
            }
            &:hover{
                svg{
                    &:first-of-type{
                        color: ${OrangeColor};
                    }
                }
            }
            &.comment-is-open{
                svg{
                    &:last-child{
                        transform: rotate(180deg);
                    }
                }
            }
        }
        .btn-copy{
            &:hover{
                svg{
                    color: ${OrangeColor};
                }
            }
        }
    }
`;
export const DetailsItems = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    &.is-other-media{
        min-width: 56px;
    }
    .bloc-more-medias{
        display: flex;
        position: absolute;
        left: 28px;
        background-color: #FFF;
        z-index: 1;
    }
    .mediaDetails {
        display: flex;
        background: #FFF;
        opacity: 0;
        transition: .5s linear;
        overflow: hidden;
        max-width: 0;
        width: auto;
        &.showMedia{
            max-width: 400px;
            opacity: 1;
        }
    }
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
        &.sondage-detail{
            background-color: #62c4b4;
        }
        &.more-media{
            background-color: #bababa;
            cursor: pointer;
            i{
                transform-origin: center;
                transition: .3s linear;
            }
            &.is-showing{
                i{
                    transform: rotate(45deg);
                }
            }
        }
    }
`;

export const HeaderMobile = styled.div`
    position: sticky;
    top: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 30px;
    background-color: #FFF;
`;

export const FooterDefault = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    
`;
export const OptionsBtnAction = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    float: right;
    @media(max-width: 1200px){
        float: none;
        display: flex;
        margin: auto;
        width: 600px;
        max-width: 100%;
    }
    @media(max-width: 767px){
            background-color: #FFF;
            padding: 9px 25px;
            width: 100%;
    }
`;
export const ModalPopIn = styled(Modal)`
    .content-modal{
        padding: 24px 30px;
        color: #FFF;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 748px;
        max-width: 90%;
        min-height: 200px;
        border-radius: 12.81px;
        background: linear-gradient(#2d7fc3 0%, #579be9 100%);  
        outline: none !important;
        @media(max-width: 767px){
            padding: 24px 15px;
        }
        .header-modal {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
            h2{
                font-family: "ProximaNovaSoftW03-Semibold";
                font-weight: normal;
                font-size: 20px;
                line-height: 24px;
                text-align: left;
                color: #fff;
                margin-bottom: 0;
            }
            & > svg{
                color: ${OrangeColor};
                font-size: 24px;
                margin-right: 12px;
                cursor: pointer;
                transition: .3s linear;
                position: relative;
                right: 0;
                &:hover{
                    right: 5px;
                }
            }
        }
        
        .content-form{
            border-radius: 12.81px;
            background: rgba(31, 85, 119, .5);
            padding: 32px 26px 16px;
            @media(max-width: 767px){
                padding: 25px 15px 16px;
            }
            
        }
        .form-connexion{
            .password-input{
                margin-bottom: 10px;
            }
            .pass-oublier{
                text-decoration: underline;
                cursor: pointer;
                font-size: 15px;
                line-height: 22px;
                display: inline-block;
            }
        }
        .form-forgot-pass{
            .content-form{
                padding-bottom: 32px;
                & > div{
                    margin-bottom: 0;
                }
                @media(max-width: 767px){
                    padding-bottom: 25px;
                }
            }
        }
        .bloc-btn-modal{
            text-align: center;
            margin-top: 20px;
        }
        
    }
    .message-modal-content {
        width: 530px;
        max-width: 100%;
        margin: auto;
        text-align: center;
        font-family: "ProximaNovaSoftW03-Semibold";
        font-size: 16px;
        line-height: 22px;
        & > svg{
            font-size: 42px;
            color: #6ed5ed;
            margin-bottom: 20px;
        }
        .titre-message-modal{
            font-size: 18px;
            line-height: 22px;
            color: #fff;
            margin-bottom: 20px;
        }
        .text-message-modal{
            margin-bottom: 26px;
            opacity: .8;
            p{
                margin-bottom: 0;
            }
        }
        button{
            min-width: 70px;
            height: 32px;
            text-transform: uppercase;
        }
    }
`;
export const ErroreMessageForm = styled.div`
    font-family: "ProximaNovaSoftW03-Semibold";
    font-size: 16px;
    line-height: 21px;
    text-align: center;
    background: #d87a73;
    color: #FFF;
    padding: 5px 10px;
    border-radius: 6px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    span{
        display: block;
        width: 100%;
        text-align: center;
        margin-left: 10px;
    }
    svg{
        transform-origin: center;
        transform: rotate(45deg);
        cursor: pointer;
    }
`;