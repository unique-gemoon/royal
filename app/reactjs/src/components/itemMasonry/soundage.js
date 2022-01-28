import React, { useState } from 'react';
import { SoundageBloc, ItemResultSoundage } from '../../assets/styles/componentStyle';
import RadioButton from '../ui-elements/radioButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function Soundage({ item, setItem }) {

    const [check , setCheck] = useState('');
    const [showResult , setShowResult] = useState(false);

    return (
        <SoundageBloc>
            <p className='titre-saoundage'>{item.titleSoundage}</p>
                {!showResult && item && item.soundage &&
                    (<>
                        <RadioButton 
                            className="bloc-choix-soundage" 
                            options={item.soundage} 
                            value={check} 
                            name={item.id} 
                            onChange={(val) => {
                                for (let i = 0; i < item.soundage.length; i++) {
                                    if (parseInt(item.soundage[i].id) === parseInt(val.id)) {
                                        item.soundage[i].choix = true;
                                        setCheck(val.id);
                                    } else {
                                        item.soundage[i].choix = false;
                                    }
                                }
                                setItem(item);
                            }}
                        />
                        <p className='btn-show-result' onClick={() => { if (check){ setShowResult(true) }
                            }}>Voir les résultats</p>
                    </>
                )}

                {showResult ? (
                    <div className='bloc-result-soundage'>
                        {item.soundage && item.soundage.map((val, index) => (

                            <ItemResultSoundage key={index} purcentage={val.countQte}>
                            <div className='content-result-soundage' > 
                                <span>{val.label}</span> {val.choix ? <CheckCircleOutlineIcon /> : null}
                            </div>
                            <span className='purcentage-item'>{val.countQte}</span>
                        </ItemResultSoundage>

                        ))}
                        
                    </div>
                ) : null}
        </SoundageBloc>
    );
}
