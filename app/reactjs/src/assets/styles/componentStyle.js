import { Button, TextField } from "@mui/material";
import { Form, Modal } from "react-bootstrap";
import styled from "styled-components";
import { BleuColor, OrangeColor,  } from "./globalStyle";


export const GroupInput = styled(Form.Group)`
    margin-bottom: 20px;
    .error-message{
        font-family: "ProximaNovaSoftW03-Semibold";
            font-size: 15px;
            background: #d87a73;
            color: #FFF;
            padding: 5px 10px;
            border-radius: 0 0 6px 6px;
            display: flex;
            justify-content: flex-start;
            margin-bottom: 16px;
            svg{
                margin-right: 10px;
                transform-origin: center;
                transform: rotate(45deg);
                cursor: pointer;
            }
            span{
                opacity: .8;
            }
    }
`;

export const InputForm = styled(Form.Control)`
    background-color: transparent;
    box-shadow: none !important;
    border: 0;
    color: #FFF !important;
    padding: 0 10px;
    border-left: 1px solid #FFF;
    height: 18px;
    border-radius: 0;
    font-size: 13px;
    &::-webkit-input-placeholder {
        font-size: 13px;
        color: #FFF;
        opacity: .6;
    }
    &::-moz-placeholder {
        font-size: 13px;
        color: #FFF;
        opacity: .6;
    }
    &:-ms-input-placeholder {
        font-size: 13px;
        color: #FFF;
        opacity: .6;
    }
    &:-moz-placeholder {
        font-size: 13px;
        color: #FFF;
        opacity: .6;
    }
    &:focus,
    &:invalid {
        background: none;
        outline: none;
    }
`;
export const InputDef = styled(TextField)`
    width: 100%;
    background: rgba(21, 52, 79, .5);
    border-radius: 4.93px 4.93px 0px 0px;
    &.is-requered{
        & > label{
            &:after{
                content: "*";
                position: relative;
                color: #6ed5ed;
                font-size: 14px;
                line-height: 16.8px;
                margin-left: 3px;
            }
        }
    }
    & > label{
        line-height: 17px;
        font-family: "ProximaNovaSoftW03-Semibold";
        font-weight: normal;
        font-size: 16px;
        color: #9ba7bc;
        opacity: 0.8;
        &.Mui-focused{
            color: ${OrangeColor};
        }
        &[data-shrink="true"]{
            color: ${OrangeColor};
        }
        &[data-shrink="false"]{
            transform: translate(16px, 10px) scale(1);
        }
    }
    & > div{
        
        width: 100%;
        &.Mui-focused{
            fieldset{
                border-bottom-color: #41b9d6 !important;
            }
        }
    }
    input{
        padding: 7px 10px;
        height: auto;
        color: #FFF;
        opacity: 0.8;
        font-family: "ProximaNovaSoftW03-Semibold";
        &:-webkit-autofill,
        &:-webkit-autofill:hover, 
        &:-webkit-autofill:focus {
            -webkit-text-fill-color: #fff;
            box-shadow: 0 0 0px 1000px transparent inset;
            transition: background-color 5000s ease-in-out 0s;
        }
    }
    fieldset{
        border-radius: 4.93px 4.93px 0px 0px;
        border: 0;
        border-bottom: 2px solid #15344F;
    }
`;
export const LoadingMessage = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  padding-top: 4px;
  @keyframes ani {
    0%,
    40%,
    100% {
      transform: scale(0.5);
    }
    20% {
      transform: scale(0.9);
    }
  }
  li {
    list-style: none;
    width: 10px;
    height: 10px;
    background: #fff;
    border-radius: 50%;
    animation: ani 0.8s linear infinite;
    &:nth-child(1) {
      animation-delay: -1.3s;
      background: #d9d9d9;
    }
    &:nth-child(2) {
      animation-delay: -1.2s;
      background: #d9d9d9;
    }
    &:nth-child(3) {
      animation-delay: -1s;
      background: #FFF;
    }
  }
`;
export const TypingLoader = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
    li{
        width: 3px;
        height: 3px;
        background-color: #88C7FF;
        border-radius: 100%;
        animation: sl-bubble2 1000ms ease-in-out infinite;
        margin: 0 1px;
        &:nth-child(1){
            animation-delay: calc(.8 * -350ms);
        }
        &:nth-child(2){
            animation-delay: calc(.4 * -350ms);
        }
        &:nth-child(3){
            animation-delay: calc(.1 * -350ms);
        }
    }


    @keyframes sl-bubble2 {
        to {
            -webkit-transform: translateY(0);
            transform: translateY(0);
        }
        50% {
            -webkit-transform: translateY(-10px);
            transform: translateY(-10px);
        }
        from {
            -webkit-transform: translateY(0);
            transform: translateY(0);
        }
    }
`;
export const EntrainTyping = styled.div`
    background: linear-gradient(#12377c 7.35%, #1e52a0 100%);
    display: flex;
    align-items: center;
    font-family: "ProximaNova-Semibold";
    font-size: 13px;
    line-height: 15.6px;
    text-align: left;
    color: #fff;
    padding: 6px 20px;
    ${TypingLoader}{
        position: relative;
        top: 3px;
        margin-right: 10px;
    }
`;

export const ModalDefault = styled.div`
    &.modal-footer{
        padding: 0;
        border: 0;
        &.modal-sinscrir{
            button{
                border-radius: 7.17px;
                background: #fff;
                color: ${OrangeColor};
                &:hover{
                    color: #FFF;
                    background-color: ${OrangeColor};
                }
            }
        }
        button{
            min-width: 98px;
            height: 32px;
            transition: .3s ease-in-out;
            font-family: "ProximaNovaSoftW03-Semibold";
            font-size: 12px;
            line-height: 15px;
            margin: 0 7px 15px;
            color: #FFF;
            text-transform: initial;
        }
    }
    
`;

export const CountSee = styled.div`
   font-family: 'ProximaNovaSoftW03-Semibold';
   font-size: 20px;
   color: #1E52A0;
   display: flex;
   align-items: center;
   & > svg{
       margin-left: 10px;
   }
`;
export const DropZoneBloc = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border-width: 2px;
    border-radius: 12px;
    border-color: #EDAF5D;
    border-style: dashed;
    background-color: rgba(15, 51, 104, .70);
    color: #bdbdbd;
    outline: none;
    transition: border .24s ease-in-out;
    position: absolute;
    top: 15px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    z-index: 10;
    p{
        margin-bottom: 0;
    }
`
export const WysiwygDefault = styled.div``;

export const BlocActionButton = styled.div`
    .content-button-action{
        position: fixed;
        color: #FFF;
        z-index: 999;
    }
    &.messages-bloc-action{
        .content-button-action{
            bottom: 90px;
            left: 24px;

            @media(max-width: 1200px){
                left: 15px;
                bottom: auto;
                top: 55px;
            }
            @media(max-width: 993px){
                height: calc(100% - 145px);
                width: 100%;
                left: 0px;
                & > div{
                    height: 100% !important;
                    width: 90%;
                    margin: auto;
                }
            }
            & > div{
                background: linear-gradient(#2d7fc3 0%, #579be9 100%);
                height: calc(50vh - 110px + 25px + 90px);
                border-radius: 13px;
                overflow: hidden;
                box-shadow: 0px 3px 10px rgba(26, 57, 91, 0.9);
            }
        }
    }
    &.search-bloc-action{
        .content-button-action{
            top: 25px;
            left: 24px;
            @media(max-width: 1200px){
                left: 15px;
                top: 55px;
            }
            @media(max-width: 993px){
                max-height: calc(100% - 145px);
                width: 100%;
                left: 0px;
                & > div{
                    height: calc(100vh - 145px) !important;
                    max-height: initial !important;
                    width: 90%;
                    margin: auto;
                }
            }
            & > div{
                max-height: calc(50vh - 296px + 25px + 90px);
            }
        }
    }
    &.abonnee-bloc-action{
        .content-button-action{
            top: 25px;
            right: 24px;
            @media(max-width: 1200px){
                right: 15px;
                top: 55px;
            }
            @media(max-width: 993px){
                height: calc(100vh - 145px);
                width: 100%;
                right: 0px;
                & > div{
                    width: 90% !important;
                    margin: auto;
                    height: 100% !important;
                    max-height: initial !important;
                }
            }
            & > div{
                background: linear-gradient(#2d7fc3 0%, #579be9 100%);
                max-height: calc(50vh - 184px + 25px + 90px);
                border-radius: 13px;
                overflow: hidden;
                box-shadow: 0px 3px 10px rgba(26, 57, 91, 0.9);
                width: 300px;
            }
        }
    }
    &.notification-bloc-action{
        .content-button-action{
            bottom: 90px;
            right: 24px;
            @media(max-width: 1200px){
                right: 15px;
                bottom: auto;
                top: 55px;
            }
            @media(max-width: 993px){
                height: calc(100% - 145px);
                width: 100%;
                right: 0px;
                & > div{
                    height: 100% !important;
                    width: 90% !important;
                    margin: auto;
                }
            }
            & > div{
                background: linear-gradient(#2d7fc3 0%, #579be9 100%);
                height: calc(50vh - 230px + 25px + 90px);
                border-radius: 13px;
                overflow: hidden;
                box-shadow: 0px 3px 10px rgba(26, 57, 91, 0.9);
            }
        }
    }
`;
export const ButtonIcon = styled(Button)`
    height: 35px;
    width: 35px;
    min-width: 35px;
    border-radius: 50%;
    padding: 0;
    position: relative;
    transition: .4s ease-in-out;
    .count-notif{
        font-family: ProximaNovaSoftW03-Semibold;
        height: 24px;
        width: 24px;
        min-width: 24px;
        position: absolute;
        top: -13px;
        right: -10px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #FFF;
        background-color: #D87A73;
        font-size: 12px;
        line-height: 1;
        @media(max-width: 767px){
            border: 3px solid #FFF;
            top: -7px;
            right: -8px;
        }
    }
    &.btn-white{
        color: #EDAF5D;
        background-color: #FFF;
        margin-bottom: 8px;
        margin-left: 15px;
        @media(max-width: 1200px){
            margin-left: 0;
        }
       
        svg{
            width: 20px;
        }
        &:hover{
            background-color: ${OrangeColor};
            color: #FFF;
        }
        &.isopen{
            background: linear-gradient(#125c99 0.29%,#2d7fc3 100%);
            color: #FFF;
        }
        @media(max-width: 767px){
            margin-bottom: 0 !important;
            svg{
                font-size: 33px;
                width: auto;
            }
            &:hover{
                background-color: transparent;
                color: ${OrangeColor};
            }
            &.isopen{
                background: transparent;
                color: ${BleuColor};
            }
        }
    }
`;
export const NotificationMessage = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 14px 15px;
    background: #225282;
    box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.16);
    color: #FFF;
    text-align: center;
    z-index: 9999;
    transform: translateY(-100%);
    transition: .5s all;
    &.isMesssage{
        transform: translateY(0);
    }
    svg{
        cursor: pointer;
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
    }
`;
export const BlocProfileMenu = styled.div`
    position: relative;
    z-index: 11;
    #composition-button {
        border-radius: 11.5px;
        background: #fff;
        padding: 4px 8px;
        line-height: 1;
        font-family: "ProximaNovaSoftW03-Semibold";
        font-size: 15px;
        color: ${BleuColor};
        margin-right: 10px;
        text-transform: initial;
        i{
            width: 4px;
            height: 4px;
            background: #6ed5ed;
            border-radius: 50%;
            display: inline-block;
            margin-right: 5px;

        }
        span{
            font-family: "ProximaNovaSoftW03-Regular";
            color: #7caad6;
            font-size: 14px;
        }
        @media(max-width: 993px){
            margin-right: 0;
        }
    }
    .paper-menu-profile{
        background-color: transparent;
        border-radius: 12px;
        width: 232px;
        margin: 10px 0;
    }
    .profil-menu-options{
        border-radius: 12px;
        background: linear-gradient(#2d7fc3 0%, #579be9 100%);
        box-shadow: 0px 4px 13px rgba(26, 57, 91, .63);
        color: #FFF;
        padding: 0;
        .MuiMenuItem-root{
            font-family: 'ProximaNovaSoftW03-Regular';
            font-weight: normal;
            font-size: 13px;
            line-height: 18px;
            text-align: left;
            color: #7dbfc6;
            border-bottom: 1px solid rgba(112, 112, 112, .5);
            transition: .3s ease-in-out;
            @media(max-width: 1200px){
                justify-content: flex-end;
            }
            &:last-child{
                border: 0;
            }
            &:hover{
                color: #c0f6ff;
            }
        }
    }
`;

export const ToolBarEditor = styled.div`
    .ql-snow{
        border-radius: 12.81px;
        background: rgba(31, 85, 119, .45);
        border: 0 !important;
        padding: 4px 8px;
        .ql-formats {
            display: flex;
            align-items: center;
        }
        .ql-stroke{
            stroke: #FFF !important;
        }
        .ql-fill{
            fill: #FFF !important;
        }
        .ql-formats{
            margin-right: 0 !important;
        }
        &.ql-toolbar{
            button{
                width: 36px;
                height: 36px;
                transition: .3s all;
                margin: 0 2px;
                display: flex;
                align-items: center;
                justify-content: center;
                svg{
                    height: 22px;
                }
                &.ql-active, &:hover {
                    background: rgba(21, 52, 79, .50);
                    border-radius: 6px;
                }
            }
        }
        .ql-picker{
            &.ql-size{
                width: 40px;
                height: 36px;
                margin-right: 2px;
            }
            &.ql-expanded {
                .ql-picker-label{
                    border: 0;
                    align-items: center;
                    display: flex;
                    padding-left: 10px;
                }
                .ql-picker-options{
                    top: auto;
                    bottom: 100%;
                    background: #3070aa;
                    border: 0;
                    color: #FFF;
                    text-align: center;
                    border-radius: 6px;
                    .ql-picker-item{
                        color: #FFF;
                        transition: .3s all;
                        &:hover{
                            color: ${OrangeColor};
                        }
                    }
                }
            }
        }
        .ql-picker-label{
            align-items: center;
            display: flex;
            padding-left: 10px;
            color: #FFF !important;
            transition: .3s all;
            border: 0;
            &:hover{
                background: rgba(21,52,79,.50);
                border-radius: 6px;
            }
            &[data-value="large"]{
                font-size: 26px;
            }
            &[data-value="medium"]{
                font-size: 18px;
            }
        }
    }
`;
export const ImageUpload = styled.div`
    width: 45px;
    height: 45px;
    position: relative;
    margin: 5px;
    background-color: #145e9c;
    border-radius: 10px;
    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: 10px;
    }
    button{
        padding: 0;
        min-width: auto;
        position: absolute;
        top: -10px;
        right: -10px;
        
    }
`;

export const VideoUpload = styled.div`
    position: relative;
    margin-right: 10px;
    margin-bottom: 10px;
    button{
        padding: 0;
        min-width: auto;
        position: absolute;
        top: -10px;
        right: -10px;
        
    }
`;

export const SoundUpload = styled.div`
    display: flex;
    align-items: center;
    background-color: #FFF;
    height: 46px;
    border-radius: 10px;
    position: relative;
    margin-right: 10px;
    margin-bottom: 10px;
    .icon-sound{
        background: linear-gradient(#fc6965 0.01%,#fc9765 92.44%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #FFF;
        width: 46px;
        min-width: 46px;
        height: 46px;
        border-radius: 10px 0 0 10px;
    }
    .name-sound{
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        line-height: 21px;
        color: #565c6b;
        padding: 12px;
        margin: 0;
        span{
            display: inline-block;
            &:first-child{
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 86px;
            }
            &:last-child{
                margin-left: 2px;
            }
        }
    }
    & > button{
        padding: 0;
        min-width: auto;
        position: absolute;
        top: -10px;
        right: -10px;
    }
`;
export const CountDownStyle = styled.div`
    width: 72px;
    font-family: "ProximaNovaSoftW03-Semibold";
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    color: #fff;
    margin-left: auto;
    margin-bottom: 7px;
    padding-left: 10px;
    .count-text{
        &.typing-stop{
            color: red;
        }
    }
    .progressBar-item{
        border-radius: 2px;
        background-color: #4D69A0;
        & > span{
            background-color: #6ED5ED;
            border-radius: 2px;
        }
    }
`;
export const FolowersModal = styled.div`
    border-radius: 12px;
    .MuiTabs-indicator{
        display: none
    }
    .content-tab-modal{
        height: calc(50vh  - 240px + 25px + 90px);
        & > div{
            padding: 0;
            height: 100%;
            .list-tab-modal{
                height: 100%;
                overflow-y: auto;
            }
            .show-more-folower{
                margin-bottom: 0;
                height: 33px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                background: linear-gradient(#3064b4 0%, #1a5b93 100%);
                opacity: 0.6;
                font-size: 13px;
                line-height: 18px;
                position: relative;
                &:before {
                    content: "";
                    position: absolute;
                    top: 0px;
                    left: 0;
                    right: 0;
                    height: 8px;
                    background: linear-gradient(#1c2135 0%, rgba(28, 33, 53, 0) 100%);
                    opacity: 0.4;
                }
                svg{
                    font-size: 18px;
                    margin-right: 3px;
                }
            }
        }
        @media(max-width: 993px){
            height: calc(100% - 48px);
        }
    }
    .MuiTabs-flexContainer{
        border-radius: 12px;
        & > button{
            color: #FFF;
            position: relative;
            overflow: inherit;
            text-transform: initial;
            min-width: 130px;
            display: flex;
            align-items: center;
            flex-direction: initial;
            white-space: nowrap;
            width: 50%;
            .count-tab{
                margin-left: 10px;
                width: 21px;
                min-width: 21px;
                height: 21px;
                border-radius: 50%;
                background-color: #d87a73;
                box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1);
                font-family: 'ProximaNovaSoftW03-Semibold';
                font-size: 12px;
                line-height: 16px;
                text-align: left;
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center
            }
            &:not(.Mui-selected){
                background: linear-gradient(#3064b4 0%, #1a5b93 100%);
                &::before{
                    content: "";
                    position: absolute;
                    top: 0px;
                    left: -34px;
                    height: 46px;
                    width: 34px;
                    background-color: #ff181800;
                    border-top-right-radius: 19px;
                    box-shadow: 0px -27px 0 0 #2f63b2;

                }
            }
            &:first-child{
                border-radius: 12px 0 0 0;
            }
            &:last-child{
                border-radius: 0 12px 0 0;
                &.Mui-selected{
                    &::before{
                        content: "";
                        position: absolute;
                        top: 0px;
                        left: 0;
                        height: 46px;
                        width: 34px;
                        background-color: #ff181800;
                        border-top-left-radius: 19px;
                        box-shadow: 0px -27px 0 0 #2f63b2;

                    }
                }
            }
        }
    }
`;
export const ItemFolower = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;
    line-height: 18px;
    color: #c0f6ff;
    padding: 13px 14px;
    border-bottom: 1px solid rgba(234, 234, 234, 0.15);
    transition: .4s ease-in-out;
    &::before{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #d0eafc;
        opacity: 0;
        pointer-events: none;
    }
    &:hover{
        &::before{
            opacity: 0.15;
        }
    }
    &:last-child{
        border-bottom: 0;
    }
    .option-item-folower{
        display: inline-flex;
        margin-left: auto;
        padding-left: 15px;
        & > button{
            min-width: auto;
            padding: 0;
            margin-left: 10px;
            &.btn-switch-folowers{
                color: ${OrangeColor};
                & > svg{
                    font-size: 19px;
                }
                & > span{
                    display: none
                }
            }
            &.toggle-item-message{
                color: #FFF;
                border-radius: 50%;
                border: 1px solid rgba(234, 234, 234, 0.15);
                padding: 3px;
                svg{
                    font-size: 15px;
                }
            }
        }
    }
`;
export const FolowerSearch = styled.div`
    width: 310px;
    .form-search-folower{
        position: relative;
        display: flex;
        align-items: center;
        height: 38px;
        border-radius: 19px;
        background: linear-gradient(#2d7fc3 0%, #579be9 100%);
        box-shadow: 0px 3px 10px rgba(26, 57, 91, 0.9);
        overflow: hidden;
        padding: 12px 16px;
        & > button{
            background-color: transparent;
            border: 0;
            outline: none !important;
            color: #FFF;
            & > svg{
                font-size: 18px;
                cursor: pointer;
            }
        }
        .search-input{
            margin-left: 9px;
            width: 100%;
            .form-control{
                background-color: transparent;
                box-shadow: none !important;
                border: 0;
                color: #FFF;
                padding: 0 10px;
                border-left: 1px solid #FFF;
                height: 18px;
                border-radius: 0;
                font-size: 13px;
                &::-webkit-input-placeholder {
                    font-size: 13px;
                    color: #FFF;
                }
                &::-moz-placeholder {
                    font-size: 13px;
                    color: #FFF;
                }
                &:-ms-input-placeholder {
                    font-size: 13px;
                    color: #FFF;
                }
                &:-moz-placeholder {
                    font-size: 13px;
                    color: #FFF;
                }
                &:focus,
                &:invalid {
                    background: none;
                    outline: none;
                }
            }
        }
        .reset-search {
            margin-left: auto;
            cursor: pointer;
            svg{
                font-size: 18px;
            }
        }
    }
    .content-search-results{
        background: linear-gradient(#2f6fba 0%, #3375b5 99.88%);
        box-shadow: 0px 3px 10px rgba(26, 57, 91, .90);
        border-radius: 12px;
        overflow: hidden;
        .list-result-search {
            max-height: calc(50vh - 288px + 25px + 90px);
            background: linear-gradient(#2f6fba 0%, #3375b5 99.88%);
            overflow-y: auto;
        }
        .message-not-result{
            padding: 10px;
            margin: 0;
            text-align: center;
            font-size: 14px;
        }
        .show-more-folower{
            margin-bottom: 0;
            height: 33px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            background: linear-gradient(#3064b4 0%, #1a5b93 100%);
            opacity: 0.6;
            font-size: 13px;
            line-height: 18px;
            svg{
                font-size: 18px;
                margin-right: 3px;
            }
        }
        @media(max-width: 993px){
            height: calc(100% - 38px);
        }
    }
`;

export const BlocNotification = styled.div`
    width: 300px;
    .header-notif{
        font-family: 'ProximaNovaSoftW03-Semibold';
        height: 47px;
        color: #FFF;
        position: relative;
        overflow: initial;
        text-transform: initial;
        display: flex;
        align-items: center;
        flex-direction: initial;
        white-space: nowrap;
        justify-content: center;
        font-size: 15px;
        &:before {
            content: "";
            position: absolute;
            bottom: -6px;
            left: 0;
            right: 0;
            height: 6px;
            background: linear-gradient(#1c2135 0%, rgba(28, 33, 53, 0) 100%);
            opacity: 0.1;
        }
        .count-notif{
            margin-left: 10px;
            width: 22px;
            min-width: 22px;
            height: 22px;
            border-radius: 50%;
            background-color: #d87a73;
            box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1);
            font-family: 'ProximaNovaSoftW03-Semibold';
            font-size: 12px;
            line-height: 16px;
            text-align: left;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }  
    .content-notifs {
        height: calc(100% - 47px);
        .list-notifs{
            height: 100%;
            overflow-y: auto;
        }
        .item-notif{
            position: relative;
            display: flex;
            font-size: 13px;
            line-height: 18px;
            color: #c0f6ff;
            padding: 13px 14px 13px 24px;
            border-bottom: 1px solid rgba(234, 234, 234, 0.15);
            transition: .4s ease-in-out;
            &.new-notif{
                &::after{
                    opacity: .15;
                }
                &::before{
                    background: #db6b6b;
                    border: 1px solid #dd9b9b;
                }
            }
            &::after{
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: #d0eafc;
                opacity: 0;
            }
            &::before{
                content: "";
                position: absolute;
                left: 10px;
                top: 20px;
                min-width: 4px;
                width: 4px;
                height: 4px;
                border-radius: 50%;
                display: block;
                margin-right: 8px;
            }
            span{
                position: relative;
                display: block
            }
            .timer-notif{
                color: #97cedd;
                margin-left: auto;
                padding-left: 10px;
                white-space: nowrap;
            }
        }
        .show-more-folower{
            margin-bottom: 0;
            height: 33px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            background: linear-gradient(#3064b4 0%, #1a5b93 100%);
            opacity: 0.6;
            font-size: 13px;
            line-height: 18px;
            position: relative;
            &:before {
                content: "";
                position: absolute;
                top: 0px;
                left: 0;
                right: 0;
                height: 8px;
                background: linear-gradient(#1c2135 0%, rgba(28, 33, 53, 0) 100%);
                opacity: 0.4;
            }
            svg{
                font-size: 18px;
                margin-right: 3px;
            }
        }
    }
    
`;
export const BlocEmojis = styled.div`
    .btn-toggle-emoji{
        padding: 0;
        position: absolute;
        right: 0;
        top: -3px;
        min-width: auto;
        color: #a0a4b5;
        transition: .3s ease-in-out;
        svg{
            font-size: 18px;
        }
        &.active-emoji{
            color: #EEAA67 !important;
        }
        span{
            display: none;
        }
    }
    .emoji-group, .emoji-categories{
        padding: 0 5px;
    }
    .bloc-list-emoji{
        position: absolute;
        right: 0;
        z-index: 11;
        .emoji-picker-react {
            height: 140px;
            width: 230px;
            .content-wrapper, .emoji-group{
                &:before{
                    content: none;
                }
            }
        }

    }
`;
export const FormEmoji = styled.div`
    
    display: flex;
    &.commentaire-form{
        background-color: #d9dce1;
        padding: 14px 12px 14px 18px;
        .form-control{
            font-family: 'ProximaNovaSoftW03-Semibold';
            color: #000 !important;
            &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
                color: #6a7b89;
            }
            &::-moz-placeholder { /* Firefox 19+ */
                color: #6a7b89;
            }
            &:-ms-input-placeholder { /* IE 10+ */
                color: #6a7b89;
            }
            &:-moz-placeholder { /* Firefox 18- */
                color: #6a7b89;
            }
        }
    }
    .form-control{
        font-family: 'ProximaNovaSoftW03-Regular';
        background-color: transparent;
        border: 0;
        border-bottom: 1px solid #8a9bac;
        font-size: 13px;
        border-radius: 0;
        padding: 0;
        padding-right: 20px;
        color: #fff;
        transition: .3s ease-in-out;
        &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
            color: #fff;
        }
        &::-moz-placeholder { /* Firefox 19+ */
            color: #fff;
        }
        &:-ms-input-placeholder { /* IE 10+ */
            color: #fff;
        }
        &:-moz-placeholder { /* Firefox 18- */
            color: #fff;
        }
        &:focus{
            border-color: #EEAA67;
            box-shadow: none;
            outline: none;
        }
    }
    textarea{
        min-height: 22px;
        line-height: initial;
        border: 0;
        resize: none;
        padding-top: 5px;
        &.form-control{
            max-height: 30px;
        }
    }
    .content-form-emoji{
        position: relative;
        width: 100%;
        margin-right: 8px;
        &.is-waiting{
            pointer-events: none;
            textarea{
                opacity: .8;
                border-bottom: 1px solid red;
            }
            
        }
        .timer-waiting {
            color: #414141;
            font-family: 'ProximaNovaSoftW03-Semibold';
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding-top: 4px;
            svg{
                font-size: 17px;
            }
        }
    }
    .btn-send-emoji {
        color: #3583D6;
        border: 1px solid #3583D6;
        border-radius: 50%;
        width: 18px;
        height: 18px;
        min-width: 18px;
        padding: 0;
        top: 7px;
        svg{
            font-size: 10px;
            transform: rotate(-90deg);
            margin-bottom: 1px;
        }
    }
`;
export const MessageFindFolower = styled.div`
    height: 100%;
    .header-messagerie{
        justify-content: flex-start !important;
        padding: 5px 17px;
        .title-find-distin{
            font-size: 15px;
            display: flex;
            align-items: center;
            svg{
                margin-right: 5px;
                font-size: 18px;
            }
        }
        .back-to-list{
            cursor: pointer;
            svg{
                transition: .3s all;
            }
            &:hover{
                svg{
                    color: ${OrangeColor};
                }
            }
        }
    }
    .header-info-search{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 8px 20px;
        background: linear-gradient(#6eb3f1 0%, #4ea2db 100%);
        position: relative;
        font-family: "ProximaNovaSoftW03-Semibold";
        font-weight: normal;
        font-size: 13px;
        line-height: 18px;
        text-align: left;
        color: #fff;
        svg{
            margin-right: 4px;
            font-size: 18px;
        }
        &:before{
            content: "";
            position: absolute;
            bottom: -6px;
            left: 0;
            right: 0;
            height: 6px;
            background: linear-gradient(#1c2135 0%, rgba(28, 33, 53, 0) 100%);
            opacity: 0.4;
        }
    }
    .bloc-search-folower{
        background: linear-gradient(#1663a0 0%, #135d98 93.46%);
        display: flex;
        align-items: center;
        padding: 10px 14px;
        svg{
            font-size: 18px;
            cursor: pointer;
        }
        .search-input{
            margin-left: 10px;
            width: 100%;
            input{
                border-left: 1px solid #ffffff59;
                padding-left: 5px;
            }
        }
    }
    .content-search-results {
        height: calc(100% - 120px);
    }
    .list-result-search{
        height: 100%;
        overflow-y: auto;
        & > div{
            padding: 0 14px 0 0;
            & > span{
                    cursor: pointer;
                    display: block;
                    width: 100%;
                    padding: 13px 14px;
            }
        }
    }
`;
export const BlocMessagerie = styled.div`
    width: 310px;
    .bloc-lists-messagerie{
        height: 100%;
        position: relative;
        .start-new-message{
            position: absolute;
            bottom: 15px;
            right: 10px;
            height: 42px;
            width: 42px;
            min-width: 42px;
            border-radius: 50%;
            background-color: #EDAF5D;
            color: #FFF;
        }
        .header-messagerie{
            & > svg{
                font-size: 16px;
                margin-right: 5px;
                margin-top: -3px;
            }
        }
    }
    .header-messagerie{
        height: 47px;
        color: #FFF;
        position: relative;
        overflow: initial;
        text-transform: initial;
        display: flex;
        align-items: center;
        flex-direction: initial;
        white-space: nowrap;
        justify-content: center;
        font-size: 13px;
        font-family: 'ProximaNovaSoftW03-Semibold';
        &:before {
            content: "";
            position: absolute;
            bottom: -6px;
            left: 0;
            right: 0;
            height: 6px;
            background: linear-gradient(#1c2135 0%, rgba(28, 33, 53, 0) 100%);
            opacity: 0.1;
        }

    }  
    .content-messagerie {
        height: calc(100% - 47px);
        .list-messagerie{
            height: 100%;
            overflow-y: auto;
            
        }
        .show-more-folower{
            margin-bottom: 0;
            height: 33px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            background: linear-gradient(#174fa0 0%, #0c4a7a 100%);
            font-size: 13px;
            line-height: 18px;
            position: relative;
            color: #7fa2d6;
            &:before {
                content: "";
                position: absolute;
                top: 0px;
                left: 0;
                right: 0;
                height: 8px;
                background: linear-gradient(#1c2135 0%, rgba(28, 33, 53, 0) 100%);
                opacity: 0.4;
            }
            svg{
                font-size: 18px;
                margin-right: 3px;
                color: #7fa2d6;
            }
        }
    }
    .bloc-message-item{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        .header-messagerie{
            justify-content: space-between;
            padding: 6px 14px;
            min-height: 47px;
            .back-to-list{
                cursor: pointer;
                svg{
                    color: #edb05e;
                }
            }
            .name-messagerie{
                padding: 0 15px;
                text-align: center;
                width: 100%;
            }
            .btn-option-message{
                padding: 0;
                min-width: auto;
                color: #FFF;
                margin-left: auto
            }
            svg{
                font-size: 20px;
            }
            
        }
        .bloc-view-message{
            height: calc(100% - 47px);
            display: flex;
            flex-direction: column;
            .content-view-messagerie{
                height: 100%;
                overflow-y: scroll;
            }
            ${FormEmoji}{
                padding: 0 14px 3px;
                background: linear-gradient(#1663a0 0%, #135d98 93.46%);
                align-items: center;
                height: 42px;
                .content-form-emoji{
                    display: flex;
                    align-items: center;
                    .form-group{
                        order: 2;
                        width: 100%;
                    }
                    textarea{
                        height: 28px !important;
                        color: #fff;
                        margin-top: 6px;
                        width: 100%;
                        resize: none;
                        &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
                            color: #7fa2d6;
                        }
                        &::-moz-placeholder { /* Firefox 19+ */
                            color: #7fa2d6;
                        }
                        &:-ms-input-placeholder { /* IE 10+ */
                            color: #7fa2d6;
                        }
                        &:-moz-placeholder { /* Firefox 18- */
                            color: #7fa2d6;
                        }
                    }
                    ${BlocEmojis}{
                        order: 1;
                        margin-right: 5px;
                        position: relative;
                        .btn-toggle-emoji{
                            position: static;
                        }
                        .bloc-list-emoji{
                            bottom: 33px;
                            right: -28px;
                            .emoji-picker-react {
                                width: 206px;
                                box-shadow: none;
                            }
                        }
                    }
                }
                .btn-send-emoji{
                    background-color: ${OrangeColor};
                    color: #FFF;
                    border: 0;
                    width: 18px;
                    height: 18px;
                    margin-bottom: 7px;
                }
            }
        }
    }
`;
export const ListItemsMessagerie = styled.div``;
export const ItemListMessagerie = styled.div`
    padding: 10px 16px;
    font-size: 12px;
    line-height: 18px;
    color: #C3DEEA;
    position: relative;
    cursor: pointer;
    &:nth-child(even){
        &:before{
            content: "";
            position: absolute;
            left: 0;
            bottom: 0;
            right: 0;
            top: 0;
            background: #d0eafc;
            opacity: 0.15;
        }
    }
    .head-item-list-message{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .name-item-message {
            font-family: 'ProximaNovaSoftW03-Semibold';
            color: #FFF;
            font-size: 14px;
            display: flex;
            &.hasMesaage{
                &::before{
                    content: "";
                    position: relative;
                    top: 5px;
                    min-width: 4px;
                    width: 4px;
                    height: 4px;
                    border-radius: 50%;
                    display: block;
                    margin-right: 8px;
                    background: #db6b6b;
                    border: 1px solid #dd9b9b;
                }
            }
        }
        .date-message{
            margin-left: auto;
            padding-left: 10px;
            svg{
                color: #74E8BE;
                font-size: 18px;
                margin-right: 3px;
            }
        }
    }
`;

export const MasonryItem = styled.div`
    background-color: #FFF;
    border-radius: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.16);
    .bloc-miniature{
        padding: 0 23px;
        font-size: 15px;
        line-height: 22px;
    }
    .descripton-miniature{
        margin-bottom: 15px;
    }
    .bloc-NV1{
        &.is-larg-nv1{
            .bloc-miniature{
                max-height: 700px;
                overflow-y: scroll;
            }
        }
    }
    .Bloc-NV2{
        max-height: ${({ height }) => (height < 700 ? `calc(700px - ${height}px)` : `initial`)};
        overflow-y: scroll;
        border-radius: 0 0 20px 20px;
    }
    .content-bloc-NV2{
        padding: 22px 23px 0px;
        font-size: 15px;
        line-height: 22px;
    }
    .toggle-pli2 {
        display: flex;
        align-items: normal;
        justify-content: center;
        background-color: #94A9B2;
        color: #FFF;
        font-size: 13px;
        line-height: 1;
        padding: 5px;
        cursor: pointer;
        transition: .3s ease-in-out;
        svg{
            font-size: 16px;
            margin-left: 4px;
            transition: .3s ease-in-out;
        }
        span{
            display: flex;
            align-items: center;
            margin: 0 8px;
            &.toggle-zoom{
                cursor: pointer;
            }
        }
        &:hover{
            background-color: ${BleuColor};
        }
    }
`;

export const MusicPlayer = styled.div`
    margin-bottom: 12px;
    .controls-player{
        display: flex;
        align-items: center;
        button{
            background: linear-gradient(#fc6965 0.01%, #fc9765 92.44%);
            width: 18px;
            min-width: 18px;
            height: 18px;
            border-radius: 50%;
            color: #FFF;
            margin-right: 5px;
            svg{
                font-size: 14px;
            }
        }
        .name-player{
            font-family: 'ProximaNovaSoftW03-Semibold';
            font-size: 14px;
            color: #3f4244;
        }
        .genre-player{
            font-size: 12px;
            line-height: 17px;
            color: #6d7b8c;
        }
    }
    #waveform{
        height: 15px;
        overflow: hidden;
        wave{
            top: -10px;
        }
    }
`;
export const BarTimer = styled.div`
    .progressBar-item{
        background-color: #4D69A0;
        & > span{
            background-color: #EEAA67;
            border-radius: 0 3px 3px 0;
        }
    }
    .bloc-timer-Bar{
        display: flex;
        align-items: center;
        position: relative;
        &::before{
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 6px;
            background: linear-gradient(#1c3331 0%, rgba(28, 51, 49, 0) 92.33%);
            opacity: 0.15;
            z-index: 1;
            pointer-events: none;
        }
        button{
            padding: 0;
            width: 50px;
            height: 26px;
            min-width: 50px;
            color: #FEB92B;
            transition: .3s ease-in-out;
            border-radius: 0;
            &.active{
                background-color: ${OrangeColor};
                color: #FFF;
            }
            svg{
                font-size: 16px;
            }
            &:hover{
                background-color: ${OrangeColor};
                color: #FFF;
            }
        }
        .content-timer-bar{
            width: 100%;
            background-color: #F1F1F1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            height: 26px;
            padding: 6px 10px;
            font-size: 13px;
            line-height: 1;
            cursor: pointer;
            transition: .3s ease;
            &:hover{
                background-color: #e6e6e6;
            }
            & > span{
                color: #798993;
                min-width: 32px;
                width: 32px;
            }
            &::before{
                content: "";
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0px;
                width: 26px;
                width: 4px;
                background: #DCDFDE;
            }
            &::after{
                content: "";
                position: absolute;
                top: 0;
                bottom: 0;
                right: 0px;
                width: 26px;
                width: 4px;
                background: #DCDFDE;
            }
            .timer-item{
                display: flex;
                align-items: center;
                color: #414141;
                font-family: 'ProximaNovaSoftW03-Semibold';
                svg{
                    font-size: 13px;
                    opacity: 0.5;
                    margin-bottom: 2px;
                    margin-right: 5px;
                }
                span{
                    width: 58px;
                    display: inline-block;
                }
            }
        }
    }
    &.nv-hide{
        .bloc-timer-Bar{
            border-radius: 0 0 20px 20px;
            overflow: hidden;
        }
    }
`;

export const ItemResultSondage = styled.div`
    display: flex;
    align-items: center;
    font-family: 'ProximaNovaSoftW03-Semibold';
    font-size: 14px;
    line-height: 18px;
    .content-result-sondage{
        position: relative;
        display: flex;
        align-items: center;
        overflow: hidden;
        border-radius: 6px;
        width: 100%;
        padding: 7px 12px;
        color: #151515;
        margin-bottom: 10px;
        &::before{
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            width: ${({ purcentage }) => (purcentage ? purcentage : 0)}%;
            border-radius: 6px;
            background: linear-gradient(to right, rgb(53, 131, 214, .39) 0%,rgb(65, 185, 214, .39) 100%);
        }
        span{
            display: block;
            position: relative;
        }
        svg{
            font-size: 18px;
            margin-left: 10px;
            color: #2868a3;
        }
    }
`;
export const SondageBloc = styled.div`
    .bloc-choix-sondage{
        .titre-saoundage{
            margin-bottom: 12px;
        }
        .radio-button-form{
            input{
                display: none;
                &:checked ~ label{
                    background: #3583d6;
                    color: #FFF;
                } 
            }
            label{
                border-radius: 6px;
                border: 1px solid #3583d6;
                padding: 7px 20px;
                background: #FFF;
                font-family: 'ProximaNovaSoftW03-Semibold';
                font-size: 14px;
                line-height: 24px;
                text-align: center;
                color: #151515;
                display: block;
                margin-bottom: 10px;
                cursor: pointer;
                transition: .3s all;
                &:hover{
                    background: #3583d6;
                    color: #FFF;
                }
            }
        }
    }
    .btn-show-result{
        font-size: 14px;
        line-height: 24px;
        text-align: center;
        color: #798993;
        cursor: pointer;
        margin-bottom: 5px;
        transition: .3s ease-in-out;
        &:hover{
            color: ${BleuColor};
        }
    }
    margin-bottom: 10px;
`;
export const BlocGalleryImages = styled.div`
    display: flex;
    flex-wrap: wrap;
    cursor: pointer;
    margin: 0 -2px 15px;
    .item-gallery{
        padding: 2px;
        position: relative;
        &:before{
            content: "";
            position: absolute;
            top: 2px;
            left: 2px;
            right: 2px;
            bottom: 2px;
            background: #000;
            opacity: .22;
            transition: .3s ease-in-out;
            border-radius: 10px;
        }
        &:hover{
            &::before{
                opacity: 0;
            }
        }
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 10px;
        }
    }
    &.one-item{
        .item-gallery{
            width: 100%;
            height: 220px;
            @media(min-width: 1600px){
                height: 300px;
            }
        }
    }
    &.tow-item{
        .item-gallery{
            width: 50%;
            height: 110px;
            @media(min-width: 1600px){
                height: 170px;
            }
        }
    }
    &.four-item{
        .item-gallery{
            width: 50%;
            height: 110px;
            @media(min-width: 1600px){
                height: 170px;
            }
        }
    }
    &.three-item{
        flex-flow: column wrap;
        width: 100%;
        height: 220px;
        .item-gallery{
            width: calc(40% - 2px);
            order: 2;
            height: 110px;
            &:first-child{
                width: calc(60% - 2px);
                order: 1;
                height: 220px;
            }
        }
    }
`;
export const BlocVideoPlayer = styled.div`
    margin-bottom: 15px;
    .vjs-big-play-button{
        border: 0;
        background: transparent !important;
        font-size: 56px;
    }
    .video-js{
        border-radius: 10px;
        overflow: hidden;
        background-color: transparent;
        & > video, .vjs-control-bar{
            border-radius: 10px;
        }
    }
    .video-react {
        .video-react-big-play-button{
            font-size: 69px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: transparent !important;
            border: 0;
        }
        .video-react-control-bar{
            background-color: rgba(0, 0, 0, .27);
        }
    }
`;

export const ModalItem = styled(Modal)`
    background-color: rgba(6, 20, 30, .94);
    overflow-y: hidden;
    &.confirmation-modal{
        backdrop-filter: blur(3.4667301177978516px);
        background-color: transparent;
        .modal-dialog{
            width: 100%;
            max-width: 100%;
            .modal-content{
                width: 900px;
                max-width: 90%;
                margin: auto;
            }
        }
    }
    .modal-dialog{
        width: 900px;
        height: auto;
        margin: auto;
        max-width: 90%;
        border-radius: 20px;
        max-height: 100%;
        padding-top: 30px;
        .modal-content{
            border-radius: 0px;
            background-color: transparent;
            border: 0;
            height: 100%;
        }
        .modal-body{
            padding: 0;
            height: 100%;
            & > div{
                max-height: calc(100vh - 60px);
                overflow-y: auto;
                margin: auto;
            }
            .Bloc-NV2{
                max-height: initial;
            }
            .bloc-default-modal {
                border-radius: 13px;
                background: linear-gradient(#2d7fc3 0%,#579be9 100%);
                width: 550px;
                max-width: 100%;
                margin: auto;
                padding: 30px 20px 20px;
                text-align: center;
                color: #FFF;
                .qst-confirm{
                    font-size: 16px;
                    line-height: 27px;
                    font-family: "ProximaNovaSoftW03-Semibold";
                    margin-bottom: 30px;
                }
                .bloc-btns-confirm{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-wrap: wrap;
                    button{
                         background-color: #FFF;
                         color: ${OrangeColor};
                         font-family: "ProximaNovaSoftW03-Semibold";
                         font-size: 15px;
                         line-height: 1;
                         border-radius: 40px;
                         text-transform: capitalize;
                         height: 27px;
                         padding: 6px 27px;
                         transition: .3s ease-in-out;
                         align-items: flex-start;
                         margin: 0 4px 10px;
                         &:hover{
                            background-color: ${OrangeColor};
                            color: #FFF;
                         }
                    }
                }
            }
        }
    }
    ${BarTimer}{
        .bloc-timer-Bar{
            .content-timer-bar {
                height: 48px;
            }
            button{
                height: 48px;
                width: 115px;
            }
        }
            
    }
    ${BlocGalleryImages}{
        &.one-item{
            .item-gallery {
                height: 440px;
                margin: auto;
                @media(max-width: 1200px){
                    height: 300px;
                }
                @media(max-width: 575px){
                    height: 220px;
                }
            }
        }
        &.four-item{
            .item-gallery{
                height: 220px;
                @media(max-width: 575px){
                    height: 110px;
                }
            }
        }
        &.tow-item{
            .item-gallery{
                height: 220px;
                @media(max-width: 575px){
                    height: 110px;
                }
            }
        }
        &.three-item{
            height: 440px;
            @media(max-width: 575px){
                height: 220px;
            }
            .item-gallery{
                height: 220px;
                @media(max-width: 575px){
                    height: 110px;
                }
                &:first-child{
                    height: 440px;
                    @media(max-width: 575px){
                        height: 220px;
                    }
                }
            }
        }
    }
`;


export const SimpleComment = styled.div`
    padding: 8px 18px;
    position: relative;
    border-bottom: 1px solid #f2f2f2;
    &:last-child{
        border-bottom: 0;
    }
    &:first-child{
        &.cotte-comment {
            margin-top: 12px;
        }
    }
    &.cotte-comment {
        background: #f2f2f2;
        
    }
    .cotte-comment {
        position: absolute;
        top: -10px;
        right: 24px;
        width: 21px;
        height: 21px;
        border-radius: 3px;
        background: #fff;
        border: 1px solid #b6c6ce;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .head-comment {
        font-family: 'ProximaNovaSoftW03-Semibold';
        font-size: 14px;
        line-height: 18px;
        display: flex;
        color: #798993;
        margin-bottom: 5px;
        span{
            display: block;
            margin: 0 5px;
        }
        .name-user-comment{
            color: #070707;
            margin-left: 0;
        }
    }
    .content-text-comment{
        font-size: 15px;
        padding-left: 10px;
    }
    .citation-bloc{
        border-radius: 3px 8px 8px 3px;
        background: rgba(225, 230, 234, .3);
        border: 1px solid rgba(125, 139, 147, .3);
        padding: 5px 18px;
        position: relative;
        overflow: hidden;
        margin-bottom: 5px;
        font-size: 15px;
        line-height: 22px;
        &:before{
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 3px;
            background-color: #18458F;
            display: block;
        }
        .citation-user{
            display: block;
            line-height: 18px;
            text-align: left;
            color: #12377c;
        }
    }
`;

export const CommentItem = styled.div`
    padding: 14px 18px;
    border-bottom: 1px solid #D5DFE9;
    &:last-child{
        border-bottom: 0;
    }
    .bloc-item-reponces{
        padding: 0 10px;
    }
    .head-comment {
        font-family: 'ProximaNovaSoftW03-Semibold';
        font-size: 14px;
        line-height: 18px;
        display: flex;
        color: #798993;
        span{
            display: block;
            margin: 0 5px;
        }
        .name-user-comment{
            color: #070707;
            margin-left: 0;
        }
    }
    .content-text-comment{
        font-size: 15px;
        padding-left: 10px;
    }
    .toggle-reponces {
        margin-bottom: 0;
        cursor: pointer;
        font-size: 14px;
        line-height: 24px;
        color: #3583d6;
        svg{
            margin-right: 5px;
            path{
                fill: #3583d6;
            }
        }
        &.open{
            svg{
                transform: rotate(180deg);
            }
        }
    }
    .bloc-item-reponces{
        .reponces-list{
            padding: 0 10px;
            & > div{
                padding: 5px 0;
                margin-bottom: 5px;
                border: 0;
                &:last-child{
                    margin-bottom: 0;
                }
            }
        }
    }
    .bloc-repondre{
        padding: 0 10px;
        .repondre-comment{
            font-size: 11px;
            line-height: 24px;
            color: #798993;
            text-transform: uppercase;
            margin-bottom: 4px;
            display: flex;
            align-items: baseline;
            cursor: pointer;
            i{
                margin-right: 5px;
            }
            &.closed{
                svg{
                    path{
                        fill: #798993;
                    }
                }
            }
            svg{
                margin-right: 5px;
            }
        }
        ${FormEmoji}{
            background-color: transparent;
            padding: 0;
            margin-bottom: 12px;
            .form-control{
                color: #000 !important;
                &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
                    color: #6a7b89 !important;
                }
                &::-moz-placeholder { /* Firefox 19+ */
                    color: #6a7b89 !important;
                }
                &:-ms-input-placeholder { /* IE 10+ */
                    color: #6a7b89 !important;
                }
                &:-moz-placeholder { /* Firefox 18- */
                    color: #6a7b89 !important;
                }
            }
            .bloc-list-emoji{
                bottom: 33px;
            }
        }
    }
`;
export const CommentsBloc = styled.div`
    .liste-comment-modal{
        max-height: 260px;
        overflow-y: auto;
    }
    &.emoji-open{
        padding-top: 150px;
        .bloc-list-emoji{
            bottom: 33px;
        }
    }
    &.has-comments{
        padding-top: 0 !important;
        .bloc-list-emoji{
            bottom: auto;
        }
    }
    &.has-comments-citations{
        padding-top: 0 !important;
    }

`;
export const BlocNewPliContent = styled.div`
    .toggle-action-dropzone{
        .is-active-dropzone{
            .item-detail{
                &:not(.active){
                    background: #B2BAD3 !important;
                    pointer-events: none;
                    svg{
                        color: #FFF;
                        path{
                            fill: #FFF;
                        }
                    }
                }
            }
        }
        .item-detail{
            height: 34px;
            width: 34px;
            min-width: 34px;
            margin-right: 9px;
            input{
                display: none;
            }
            label{
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                cursor: pointer;
            }
            svg{
                font-size: 20px;
            }
            &.sondage-detail{
                svg{
                    width: 16px;
                    height: 16px;
                }
            }
            
        }
    }
    .options-new-pli{
        display: flex;
        align-items: center;
    }
    ${BlocEmojis}{
        position: relative;
        .btn-toggle-emoji{
            position: static;
            color: rgba(255, 255, 255, .55);
            svg {
                font-size: 28px;
            }
        }
        .bloc-list-emoji{
            right: auto;
            left: 0;
            bottom: 30px;
            @media(max-width: 767px){
                right: 0;
                left: auto;
                bottom: 38px;
            }
        }
    }
    &.pli2-ouverture-bloc{
        .options-new-pli{
            margin-bottom: 50px;
            display: block;
            .bloc-item-image-file{
                display: inline-flex;
                flex-wrap: wrap;
                margin-top: 15px;
                margin-right: 20px;
                @media(max-width: 767px){
                    justify-content: center;
                    width: 100%;
                    margin-right: 0px;
                }
            }
        }
    }
`;

export const BlocNewSondage = styled.div`
    border-radius: 13px;
    background-color: rgba(31, 85, 119, .43);
    color: #FFF;
    padding: 20px 27px;
    margin-bottom: 26px;
    width: 100%;
    .titre-add-sondage {
        font-family: "ProximaNovaSoftW03-Semibold";
        font-weight: normal;
        font-size: 16px;
        line-height: 19.2px;
        text-align: left;
        color: #fff;
        opacity: .8;
        margin-bottom: 12px;
        svg{
            cursor: pointer;
        }
    }
    .items-sondage{
        margin-bottom: 14px;
        .row-sondage {
            display: flex;
            align-items: center;
            margin-bottom: 12px;
            &:last-child{
                margin-bottom: 0;
            }
            button{
                min-width: auto;
            }
            svg{
                color: #71acc9;
            }
        }
    }
    .button-addiOption{
        background-color: #FFF;
        color: ${OrangeColor};
        border-radius: 8px;
        padding: 11px;
        text-transform: initial;
        height: 37px;
        transition: .3s ease-in-out;
        svg{
            margin-right: 7px;
        }
        &:hover{
            background-color: ${OrangeColor};
            color: #FFF;
        }
    }
`;
export const BlocAddPli = styled.div`
    &.is-publish-pli{
        @media(max-width: 767px){
            position: absolute;
            top: -38px;
            left: 50%;
            transform: translateX(-50%);
        }
    }
    text-align: center;
    .bloc-new-pli {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 111;
        height: calc(100vh - 70px);
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: left;
        display: none;
        padding-top: 40px;
        &.showing-new-pli{
            display: flex;
        }
        @media(max-width: 993px){
            padding: 70px 20px 0;
        }
        &::before{
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background: transparent;
            backdrop-filter: blur(2px);
        }
        .cadre-content-new-pli{
            height: 100%;
            border-radius: 13px;
            display: flex;
            align-items: center;
            form{
                max-height: 100%;
                overflow-y: auto;
                border-radius: 13px;
            }
        }
        .content-new-pli{
            position: relative;
            z-index: 1;
            width: 753px;
            max-width: 100%;
            margin: auto;
            height: auto;
            border-radius: 13px;
            background: linear-gradient(#2d7fc3 0%, #579be9 100%);
            overflow: hidden;
            @media(max-width: 993px){
                width: 100%;
            }
        }
    }
    .toggled-new-pli{
        width: 81px;
        min-width: 81px;
        height: 44px;
        border-radius: 40px 40px 0 0;
        background: #FFF;
        color: #EDAF5D;
        align-items: flex-start;
        padding-top: 10px;
        display: inline-block;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        transition: .3s ease;
        cursor: pointer;
        @media(max-width: 1200px){
            position: static;
            transform: none;
        }
        & > svg{
            font-size: 30px;
            transform-origin: center;
            transition: .1s linear;
        }
        &:hover{
            background: ${OrangeColor};
            & > svg{
                color: #FFF;
            }
        }
        &.open-pli{
            background: linear-gradient(#125c99 0.29%, #2d7fc3 100%);
            & > svg{
                color: #FFF;
                transform: rotateX(-180deg);
            }
        }
        @media(max-width: 767px){
            padding: 0;
            height: auto;
            width: auto;
            & > svg{
                font-size: 33px;
            }
            &:hover{
                background: #FFF;
                & > svg{
                    color: ${OrangeColor};
                }
            }
            &.open-pli{
                background: #FFF;
                & > svg{
                    color: ${BleuColor};
                    transform: none;
                }
            }
        }
    }
    .bloc-footer{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        & > div{
            margin-bottom: 10px;
        }
        @media(max-width:767px){
            flex-wrap: wrap;
            justify-content: center;
            .options-new-pli{
                flex-wrap: wrap;
                justify-content: center;
            }
        }
    }
    .bloc-btn-publish{
        padding-left: 14px;
        margin-left: 12px;
        position: relative;
        margin-bottom: 0 !important;
        &::before{
            content: "";
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 1px;
            height: 20px;
            border-radius: 3px;
            background-color: #35517C;
            opacity: .36;
        }
    }
    .btn-publish{
        background-color: #FFF;
        color: #EDAF5D;
        font-family: "ProximaNovaSoftW03-Semibold";
        font-size: 18px;
        line-height: 1;
        border-radius: 40px;
        text-transform: capitalize;
        height: 27px;
        padding: 6px 11px;
        transition: .3s ease-in-out;
        align-items: flex-start;
        svg{
            margin-left: 2px;
            font-size: 18px;
            transform: rotate(-90deg);
            position: relative;
            bottom: 2px;
        }
        &:hover{
            background-color: ${OrangeColor};
            color: #FFF;
        }
    }
    .cadre-content-pli{
        padding: 25px 20px 5px;
        position: relative;
        textarea{
            background-color: transparent !important;
            border: 0;
            border-radius: 0;
            border-bottom: 1px solid #84bad8;
            margin-bottom: 40px;
            min-height: 36px;
           font-family: 'ProximaNovaSoftW03-Regular';
            font-weight: normal;
            font-size: 18px;
            line-height: 21px;
            color: #FFF;
            width: 100%;
            padding-bottom: 10px;
            padding-left: 0;
            resize: none;
            &:focus{
                border-color: ${OrangeColor};
                box-shadow: none;
                outline: none;
            }
            &::-webkit-input-placeholder {
                color: #A7C9E9;
                font-family: 'ProximaNovaSoftW03-Semibold';
            }
            &::-moz-placeholder {
                color: #A7C9E9;
                font-family: 'ProximaNovaSoftW03-Semibold';
            }
            &:-ms-input-placeholder {
                color: #A7C9E9;
                font-family: 'ProximaNovaSoftW03-Semibold';
            }
            &:-moz-placeholder {
                color: #A7C9E9;
                font-family: 'ProximaNovaSoftW03-Semibold';
            }
        }
    }
    .emoji-picker-react {
        box-shadow: none;
    }
    .new-pli-nv1{
        .options-new-pli{
            & > div{
                &:last-child{
                    order: 2;
                }
            }
        }
        .liste-files{
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            overflow-x: auto;
            padding: 10px 0px;
            width: 100%;
            & > div{
                margin-right: 20px;
                display: flex;
                flex-wrap: wrap;
            }
            .bloc-item-video-file, .bloc-item-sound-file{
                & > div{
                    margin-bottom: 0px;
                }
            }
        }
        .toggle-action-dropzone{
            order: 1;
        }
        .count-publish-pli1{
            margin-left: auto;
            display: flex;
            align-items: center;
        }
        @media(max-width: 767px){
            .liste-files{
                & > div{
                    margin-right: 0;
                    width: 100%;
                    justify-content: center;
                    margin-bottom: 12px;
                }
            }
            .count-publish-pli1{
                margin-left: initial;
            }
        }
    }
    ${BarTimer}{
        background-color: #FFF;
        .content-timer-bar{
            height: 100%;
            &::before, &::after{
                content: none;
            }
        }
        .bloc-timer-Bar{
            background-color: rgba(234, 234, 234, .4);
            height: 31px;
            button{
                width: 198px;
                height: 100%;
                svg{
                    font-size: 18px;
                }
                @media(max-width: 575px){
                    width: 80px;
                }
            }
        }
    }
    .toggle-open-ouverture{
        text-align: center;
        color: #FFF;
        padding: 16px 20px;
        position: relative;
        font-family: "ProximaNovaSoftW03-Semibold";
        font-size: 17px;
        line-height: 20px;
        background: linear-gradient(rgba(48, 100, 180, .6) 0%,rgba(26, 91, 147, .6) 100%);
        cursor: pointer;
        &:before{
            content: "";
            position: absolute;
            top: 0;
            height: 6px;
            left: 0;
            right: 0;
            background: linear-gradient(#1c2135 0%, rgba(28, 33, 53, 0) 100%);
            opacity: 0.4;
            z-index: 1;
            pointer-events: none;
        }
        svg{
            color: ${OrangeColor};
        }
    }
    .new-pli-nv2{
        position: relative;
        &:before {
            content: "";
            position: absolute;
            top: 0;
            height: 6px;
            left: 0;
            right: 0;
            background: linear-gradient(#1c2135 0%,rgba(28,33,53,0) 100%);
            opacity: 0.4;
            z-index: 1;
            pointer-events: none;
        }
        .cadre-content-pli{
            padding: 25px 20px 74px;
            .bloc-footer{
                position: absolute;
                bottom: 10px;
                left: 20px;
                right: 20px;
                z-index: 9;
            }
            @media(max-width: 993px){
                padding: 25px 20px 10px;
                .bloc-footer{
                    position: static;
                    flex-wrap: wrap;
                    justify-content: center;
                }
            }
        }
        .bloc-toggle-emoji{
            display: flex;
            align-items: center;
            margin-left: 20px;
        }
        .count-publish-pli2{
            margin-left: auto;
            display: flex;
            @media(max-width: 993px){
                display: inline-flex;
                margin: initial;
            }
        }

        ${BlocEmojis}{
            .bloc-list-emoji{
                bottom: 40px;
                right: 0;
                left: auto;
            }
        }
    }

    .wisiwyg-pli2{
        max-height: 200px;
        overflow-y: auto;
        .ql-snow{
            border: 0;
        }
        .ql-editor{
            padding: 0;
            font-size: 18px;
            line-height: 22px;
            color: #fff;
            font-family: 'ProximaNovaSoftW03-Regular';
            min-height: 36px;
            margin-bottom: 5px;
            &.ql-blank{
                &::before{
                    left: 0;
                    font-family: "ProximaNovaSoftW03-Semibold";
                    font-size: 18px;
                    line-height: 22px;
                    text-align: left;
                    color: #aacff1;
                    font-style: normal;
                }
            }
            blockquote {
                border-left: 4px solid rgba(21, 52, 79, .70);
                background-color: rgba(21, 52, 79, .30);
                border-radius: 4px;
                padding: 10px 10px 10px 16px;
            }
        }
    }
`;
export const ItemMessage = styled.div`
  background: #ffffff;
  box-shadow: 0 3px 51px 0 rgba(182, 172, 251, .42);
  border-radius: 20px;
  margin-bottom: 10px;
  padding: 30px 25px;
  transition: 0.2s ease-in-out;
  cursor: pointer;
  &.active,
  &:hover {
    transform: scale(1.08);
    margin: 20px 0 30px;
  }
  .bloc-info-message {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 15px;
    .img-profil {
      height: 55px;
      width: 55px;
      min-width: 55px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #f1f1f1;
      border-radius: 50%;
      color: #607078; 
      font-weight: 500;
      text-transform: uppercase;
      &.en-ligne {
        &::before {
          content: "";
          position: absolute;
          top: 1px;
          right: -5px;
          background-color: #80d796;
          height: 17px;
          width: 17px;
          border: 2px solid #fff;
          border-radius: 50%;
        }
      }
    }
    .date-profil-message {
      margin-left: auto;
      padding-left: 15px;
      color: #636363;
      font-size: 14px;
      line-height: 20px;
      opacity: 0.8;
    }
  }
  .last-profil-message {
    font-size: 13px;
    line-height: 17px;
    color: #5d5d5d;
    opacity: 0.8;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .cout-no-read-message {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 12px;
    line-height: 16px;
    color: #e67c2e;
    font-weight: 500;
    margin-top: 10px;
    span {
      display: inline-block;
      border: 1px solid #d2d2d2;
      border-radius: 20px;
      padding: 3px 10px;
    }
  }
  @media (max-width: 768px) {
    padding: 22px 15px;
    .bloc-info-message {
      .date-profil-message {
        font-size: 12px;
        line-height: 15px;
        padding-left: 10px;
      }
    }
  }
`;

export const ChatSpace = styled.div`
  
  width: 100%;
  height: calc(100% - 42px);
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: flex-start;
  .head-space-chat {
    background-color: #fafafa;
    border-bottom: 1px solid #e9e9e9;
    text-align: center;
    padding: 18px 15px 15px;
    line-height: 20px;
    .name-chat-space {
      font-weight: 600;
      font-size: 16px;
      margin-bottom: 4px;
    }
    span {
      font-size: 15px;
      &.online {
        color: #80d796;
      }
      &.offline {
        color: #636363;
        opacity: 0.5;
      }
    }
  }
  .is-teyping {
    position: sticky;
    bottom: 0;
    z-index: 1;
    .msg_cotainer {
      max-width: 100%;
      .content-msg {
          padding: 0;
        background-color: transparent;
      }
    }
  }
  .content-space-chat {
    flex: 1 1 auto;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 100%;
    position: relative;
    padding: 10px 0;
    .is-top-spinner {
        top: 0;
        bottom: auto;
        z-index: 11;
        background: linear-gradient(rgba(130,179,244,0) 0%,rgba(128,177,244,0.6) 1.48%,rgba(128,177,244,0) 100%);
    }
  }
  .msg_cotainer {
    word-wrap: break-word;
    white-space: pre-wrap;
    max-width: 60%;
    position: relative;
    margin: auto 17px;
    .content-msg {
        border-radius: 13px;
        background-color: #4d69a0;
        padding: 8px 11px;
        position: relative;
        color: #FFF;
        font-family: "ProximaNovaSoftW03-Regular";
        font-weight: normal;
        font-size: 13px;
        line-height: 16px;
        margin-bottom: 3px;
      .name-msg {
        display: block;
        font-size: 12px;
        line-height: 16px;
        font-weight: 600;
        margin-bottom: 3px;
        color: #000;
        opacity: 0.8;
      }
      & > div {
        a {
          display: block;
          margin-top: 8px;
          position: relative;
          padding-left: 20px;
          &:before {
            content: "";
            position: absolute;
            left: 0;
            top: 0px;
          }
        }
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
      }
    }
    .msg_time {
        font-family: "ProximaNovaSoftW03-Regular";
        color: #97c4dd;
        font-size: 12px;
        white-space: nowrap;
        display: flex;
        align-items: center;
        padding: 0 4px;
        svg{
            font-size: 16px;
            margin-right: 6px;
        }
    }
    &.msg-user-enligne {
      .content-msg {
        background-color: #FFF;
        color: #132d44;
        .name-msg {
          text-align: right;
        }
        &:before {
          right: 0;
          bottom: 0;
          left: auto;
        }
      }
      .msg_time {
        justify-content: flex-end;
      }
    }
  }
  
`;
export const BarTimerPli = styled.div`
    width: 185px;
    margin: 0 auto 25px;
    overflow: hidden;
    border-radius: 8px;
    @media(max-width: 767px){
        margin: 0;
    }
    .progressBar-item{
        background-color: #324e7c;
        height: 6px;
        & > span{
            background: linear-gradient(#ed9d5d 0%, #f0c27a 100%);
            border-radius: 0 3px 3px 0;
        }
    }  
        .content-timer-bar{
            width: 100%;
            background: rgba(26, 57, 91, .29);
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            height: 26px;
            padding: 6px 10px;
            font-size: 13px;
            line-height: 1;
            transition: .3s ease;
            &:before{
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                pointer-events: none;
                background: linear-gradient(#1c3331 0%, rgba(28, 51, 49, 0) 92.33%);
                opacity: 0.3;
            }
            &:after{
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                pointer-events: none;
                background: linear-gradient(#1c3331 0%, rgba(28, 51, 49, 0) 92.33%);
                opacity: 0.15;
            }
            & > span{
                color: #c7c7c7;
                display: inline-block;
                position: relative;
            }
            .timer-item{
                display: flex;
                align-items: center;
                color: #FFF;
                font-family: 'ProximaNovaSoftW03-Semibold';
                position: relative;
                svg{
                    font-size: 13px;
                    margin-bottom: 2px;
                    margin-right: 5px;
                    color: #edaf5d;
                }
                span{
                    width: 58px;
                    display: inline-block;
                }
            }
        }
`;