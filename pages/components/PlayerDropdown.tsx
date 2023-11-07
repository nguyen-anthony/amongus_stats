import React, { useState } from 'react';
import {
    TextField,
    Typography,
    Autocomplete,
} from '@mui/material';

interface Player {
    id: number;
    name: string;
}

interface Props {
    players: Player[];
    onSelect?: (player: Player | null) => void;
}

const PlayerDropdown: React.FC<Props> = ({ players, onSelect }) => {
    const [value, setValue] = useState<Player | null>(null);

    const handleOnChange = (event: any, newValue: Player | null) => {
        setValue(newValue);
        if (onSelect) {
            onSelect(newValue);
        }
    };

    return (
        <>
            <Typography variant="h6" align="center" gutterBottom>
                Search for a player
            </Typography>
            <Autocomplete
                value={value}
                onChange={handleOnChange}
                options={players}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Select a player"
                        variant="outlined"
                    />
                )}
                fullWidth
            />
        </>
    );
};

export default PlayerDropdown;
