import React, {useState } from 'react';
import { FolowerSearch } from '../assets/styles/componentStyle';
import ItemListFolower from './itemListFolower';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Input from './ui-elements/input';


export default function SearchFolowers() {
    const [showResult, setShowResult]= useState(false);
    const [state, setState] = useState({
      search:{
        type: "text",
        id: "search-folowers",
        value: "",
        placeholder: "Qui recherchez-vous ?",
        className: 'search-input'
      },
      searching: false,
    });
    const [dataFolower, setDataFolower] = useState([
        {
            id: 1,
            name: "Elly",
            idMessanger: 12,
            statut: 1,
        },
        {
            id: 2,
            name: "Fossum",
            idMessanger: 12,
            statut: 1,
        },
        {
            id: 3,
            name: "Lou",
            idMessanger: 12,
            statut: 1,
        },
        {
            id: 4,
            name: "LangNickname",
            idMessanger: 12,
            statut: 0
        },
        {
            id: 5,
            name: "Elly",
            idMessanger: 12,
            statut: 0
        },
        {
            id: 6,
            name: "LangNickname",
            idMessanger: 12,
            statut: 0
        },
        {
            id: 7,
            name: "Elly",
            idMessanger: 12,
            statut: 0
        },
        {
            id: 8,
            name: "LangNickname",
            idMessanger: 12,
            statut: 0
        },
        {
            id: 9,
            name: "Elly",
            idMessanger: 12,
            statut: 0
        },
    ]);
    return (
        <FolowerSearch>
            
            <div className='form-search-folower'>
                <button>
                    <SearchRoundedIcon />
                </button> 
                <Input
                    {...state.search} 
                    onChange={(e) => {
                        const cpState = { ...state };
                        cpState.search.value = e.target.value;
                        setState(cpState);
                        if(cpState.search.value.length >= 3){
                            setShowResult(true);
                            setState({...state, searching: true})
                        }else{
                            setShowResult(false);
                            setState({ ...state, searching: false })
                        }
                    }}
                />
                {state.searching && 
                    <span className='reset-search' onClick={() => {
                        const cpState = { ...state };
                        cpState.search.value = '';
                        setState(cpState);
                        setShowResult(false);
                        setState({ ...state, searching: false })
                    }}>
                        <CloseOutlinedIcon />
                    </span>
                }
                
            </div>
            {showResult ? 
                <div className='content-search-results'>
                    <div className='list-result-search'>
                        {dataFolower.map((item) => (
                            <ItemListFolower key={item.id} item={item} /> 
                        ))}
                    </div>
                </div> 
            : null}
            
        </FolowerSearch>
    );
}
