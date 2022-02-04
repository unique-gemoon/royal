import { Button } from "@mui/material";
import { Modal } from "react-bootstrap";
import styled from "styled-components";
import { OrangeColor } from "./globalStyle";


export const BlocActionButton = styled.div`
    .content-button-action{
        position: fixed;
        color: #FFF;
    }
    &.messages-bloc-action{
        .content-button-action{
            bottom: 90px;
            left: calc(50% - 690px + 15px);
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
            left: calc(50% - 690px + 15px);
            & > div{
                max-height: calc(50vh - 296px + 25px + 90px);
            }
        }
    }
    &.abonnee-bloc-action{
        .content-button-action{
            top: 25px;
            right: calc(50% - 690px + 15px);
            & > div{
                background: linear-gradient(#2d7fc3 0%, #579be9 100%);
                max-height: calc(50vh - 184px + 25px + 90px);
                border-radius: 13px;
                overflow: hidden;
                box-shadow: 0px 3px 10px rgba(26, 57, 91, 0.9);
            }
        }
    }
    &.notification-bloc-action{
        .content-button-action{
            bottom: 90px;
            right: calc(50% - 690px + 15px);
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
    .count-notif{
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
    }
    &.btn-white{
        color: #EDAF5D;
        background-color: #FFF;
        margin-bottom: 12px;
        margin-left: 15px;
        svg{
            width: 20px;
        }
    }
    
`;
export const BlocAddPli = styled.div`
    text-align: center;
    .bloc-new-pli {
        position: fixed;
        bottom: 70px;
        left: 0;
        right: 0;
        z-index: 111;
        height: calc(100vh - 70px);
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: left;
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
        .content-new-pli{
            position: relative;
            z-index: 1;
            width: 753px;
            max-width: 100%;
            height: 680px;
            max-height: 100%;
            border-radius: 12.81px;
            background: linear-gradient(#2d7fc3 0%, #579be9 100%);

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
        cursor: pointer;
        & > svg{
            font-size: 30px;
            transform-origin: center;
            transition: .1s linear;
        }
        &.open-pli{
            background: linear-gradient(#125c99 0.29%, #2d7fc3 100%);
            & > svg{
                color: #FFF;
                transform: rotateX(-180deg);
            }
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
                height: calc(100% - 33px);
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
        & > svg{
            font-size: 18px;
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
        height: calc(50vh - 288px + 25px + 90px);
        background: linear-gradient(#2f6fba 0%, #3375b5 99.88%);
        box-shadow: 0px 3px 10px rgba(26, 57, 91, .90);
        border-radius: 12px;
        overflow: hidden;
        .list-result-search {
            height: calc(100% - 33px);
            background: linear-gradient(#2f6fba 0%, #3375b5 99.88%);
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
            svg{
                font-size: 18px;
                margin-right: 3px;
            }
        }
    }
`;

export const BlocNotification = styled.div`
    width: 250px;
    .header-notif{
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
            height: calc(100% - 33px);
            overflow-y: auto;
        }
        .item-notif{
            position: relative;
            display: flex;
            align-items: center;
            font-size: 13px;
            line-height: 18px;
            color: #c0f6ff;
            padding: 13px 14px;
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
                position: relative;
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
export const BlocMessagerie = styled.div`
    width: 233px;
    .bloc-lists-messagerie{
        height: 100%;
        position: relative;
        .start-new-message{
            position: absolute;
            bottom: 42px;
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
            height: calc(100% - 33px);
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
        .header-messagerie{
            justify-content: space-between;
            padding: 6px 14px;
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
    overflow: hidden;
    .bloc-miniature{
        padding: 0 23px;
        font-size: 15px;
        line-height: 22px;
    }
    .descripton-miniature{
        margin-bottom: 15px;
    }
    .Bloc-NV2{
        max-height: ${({ height }) => (height ? `calc(700px - ${height}px)`: 0)};
        overflow-y: scroll;
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
        svg{
            font-size: 16px;
            margin-left: 4px;
        }
        span{
            display: flex;
            align-items: center;
            margin: 0 8px;
            &.toggle-zoom{
                cursor: pointer;
            }
        }
    }
`;
export const ModalItem = styled(Modal)`
    background-color: rgba(6, 20, 30, .94);
    .modal-dialog{
        width: 900px;
        max-width: 90%;
        .modal-content{
            border-radius: 0px;
            background-color: transparent;
            border: 0;
        }
        .modal-body{
            padding: 0;
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
            min-width: 50px;
            color: #FEB92B;
        }
        .content-timer-bar{
            width: 100%;
            background-color: #F1F1F1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            height: 26px;
            padding: 6px;
            font-size: 13px;
            line-height: 1;
            cursor: pointer;
            transition: .3s ease;
            &:hover{
                background-color: #e6e6e6;
            }
            & > span{
                color: #798993;
            }
            &::before{
                content: "";
                position: absolute;
                top: 0;
                bottom: 0;
                left: -4px;
                width: 26px;
                width: 4px;
                background: #DCDFDE;
            }
            &::after{
                content: "";
                position: absolute;
                top: 0;
                bottom: 0;
                right: -4px;
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
            }
        }
    }
`;

export const ItemResultSoundage = styled.div`
    display: flex;
    align-items: center;
    font-family: 'ProximaNovaSoftW03-Semibold';
    font-size: 14px;
    line-height: 18px;
    .content-result-soundage{
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
            width: ${({ purcentage }) => (purcentage ? purcentage : 0)};
            border-radius: 6px;
            background: linear-gradient(rgba(65, 185, 214, 0.39) 0%, rgba(53, 131, 214, 0.39) 100%);
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
export const SoundageBloc = styled.div`
    .bloc-choix-soundage{
        .titre-saoundage{
            margin-bottom: 12px;
        }
        .radio-button-form{
            input{
                display: none;
                &:checked ~ label{
                    background: linear-gradient(rgba(65, 185, 214, 0.39) 0%, rgba(53, 131, 214, 0.39) 100%);
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
                transition: .8s all;
                &:hover{
                    background: linear-gradient(rgba(65, 185, 214, 0.39) 0%, rgba(53, 131, 214, 0.39) 100%);
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
        height: 220px;
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
    &.tow-item{
        .item-gallery{
            width: 50%;
        }
    }
    &.four-item{
        .item-gallery{
            width: 50%;
            height: 110px;
        }
    }
    &.three-item{
        flex-flow: column wrap;
        width: 100%;
        height: 260px;
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
export const VideoPlayer = styled.div`
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 15px;
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
export const BlocEmojis = styled.div`
    .btn-toggle-emoji{
        padding: 0;
        position: absolute;
        right: 0;
        top: -4px;
        min-width: auto;
        color: #a0a4b5;
        transition: .3s ease-in-out;
        svg{
            font-size: 18px;
        }
        &:hover, &.active-emoji{
            color: #EEAA67;
        }
        span{
            display: none;
        }
    }
    .bloc-list-emoji{
        position: absolute;
        right: 0;
        .emoji-picker-react {
            height: 200px;
            .content-wrapper, .emoji-group{
                &:before{
                    content: none;
                }
            }
        }
        
    }
`;
export const FormComment = styled.div`
    background-color: #d9dce1;
    padding: 14px 12px 14px 18px;
    display: flex;
    align-items: center;
    .form-control{
        font-family: 'ProximaNovaSoftW03-Semibold';
        background-color: transparent;
        border: 0;
        border-bottom: 1px solid #8a9bac;
        font-size: 13px;
        border-radius: 0;
        padding: 0;
        padding-right: 20px;
        color: #6a7b89;
        transition: .3s ease-in-out;
        &:focus{
            border-color: #EEAA67;
            box-shadow: none;
            outline: none;
        }
    }
    .content-form-comment{
        position: relative;
        width: 100%;
        margin-right: 8px;
    }
    .btn-send-comment {
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
        ${FormComment}{
            background-color: transparent;
            padding: 0;
            margin-bottom: 12px;
        }
    }
`;
export const CommentsBloc = styled.div`
    &.emoji-open{
        min-height: 250px;
    }
`;