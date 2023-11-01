import React, { useEffect, useState } from 'react';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';

type Player = {
    id: number;
    name: string;
};

type Props = {
    onSelect?: (playerId: {id: number, name: string}) => void;
};

const PlayerDropdown: React.FC<Props> = ({ onSelect }) => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [selectedPlayer, setSelectedPlayer] = useState<number | undefined>(undefined);

    useEffect(() => {
        fetch('/api/players')
            .then((res) => res.json())
            .then(setPlayers);
    }, []);

    const handleChange = (e: SelectChangeEvent<number | "">) => {
        const playerId = e.target.value;
        const player = players.find(p => p.id === playerId);

        if (player) {
            setSelectedPlayer(player.id); // Ensure this is always a number
            if (onSelect) {
                onSelect(player);
            }
        } else {
            setSelectedPlayer(undefined);
        }
    };


    return (
        <FormControl fullWidth variant="outlined">
            <InputLabel id="player-dropdown-label">Player</InputLabel>
            <Select
                labelId="player-dropdown-label"
                value={selectedPlayer}
                onChange={handleChange}
                label="Player"
            >
                {players.map((player) => (
                    <MenuItem key={player.id} value={player.id}>
                        {player.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default PlayerDropdown;
