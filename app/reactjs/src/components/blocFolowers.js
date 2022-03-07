import React, { useState } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { FolowersModal } from '../assets/styles/componentStyle';
import ItemListFolower from './itemListFolower';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
export default function BlocFolowers() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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

    const abonnements = dataFolower.filter((folower) => folower.statut === 0);
    return (
        <FolowersModal>
            
                <TabContext value={value}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label={<>Abonnés</>} value="1" />
                        <Tab label={<>Abonnements <span className='count-tab'>2</span> </>} value="2" />
                    </TabList>
                    <div className='content-tab-modal'>
                        <TabPanel value="1">
                            <div className='list-tab-modal'>
                                {dataFolower.map((item) => (
                                    <ItemListFolower key={item.id} item={item} /> 
                                ))}
                            </div>
                        </TabPanel>
                        <TabPanel value="2">
                            <div className='list-tab-modal'>
                                {abonnements.map((item) => (
                                    <ItemListFolower key={item.id} item={item} /> 
                                ))}
                            </div>
                        </TabPanel>
                    </div>
                </TabContext>
            
        </FolowersModal>
    );
}
