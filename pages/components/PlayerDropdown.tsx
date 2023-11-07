import React, { useEffect, useState } from 'react';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography} from '@mui/material';

type Player = {
    id: number;
    name: string;
};

type Props = {
    players: Player[];
    onSelect?: (playerId: {id: number, name: string} | null) => void;
};

const PlayerDropdown: React.FC<Props> = ({ players, onSelect }) => {
    const [selectedPlayer, setSelectedPlayer] = useState<number | undefined>(-1); // Default to '-1' for 'All'

    const handleChange = (e: SelectChangeEvent<number | "">) => {
        const playerId = e.target.value;
        const player = players.find(p => p.id === playerId);

        if (player) {
            setSelectedPlayer(player.id);
            if (onSelect) {
                onSelect(player);
            }
        } else {
            setSelectedPlayer(-1); // Set to '-1' for 'All'
            if (onSelect) {
                onSelect(null);  // Send null when 'All' is selected
            }
        }
    };




    return (
        <>
            <Typography variant="h4" align="center">Search for a player</Typography>
            <FormControl fullWidth variant="outlined">
            <InputLabel id="player-dropdown-label">Select a name</InputLabel>
            <Select
                labelId="player-dropdown-label"
                value={selectedPlayer}
                onChange={handleChange}
                label="Select a name"
            >
                <MenuItem key={0} value={-1}>All</MenuItem>
                {players.map((player) => (
                    <MenuItem key={player.id} value={player.id}>
                        {player.name}
                    </MenuItem>
                ))}
            </Select>
            </FormControl>
        </>
    );
};

export default PlayerDropdown;
