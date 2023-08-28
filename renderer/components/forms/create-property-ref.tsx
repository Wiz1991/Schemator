import {
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField,
} from '@mui/material';
import { useFormContext } from 'react-hook-form';

export function CreatePropertyRef() {
    const { register } = useFormContext();

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--size-4)',
            }}
        >
            <TextField
                size="small"
                autoFocus
                required
                {...register('ref')}
                label="Ref"
            ></TextField>
            <FormControl>
                <TextField
                    {...register('label.text')}
                    size="small"
                    label="Text"
                ></TextField>
            </FormControl>
            <FormControl>
                <InputLabel id="label-position-position">Position</InputLabel>
                <Select
                    {...register('label.options.position')}
                    labelId="label-position-position"
                    label="Position"
                    size="small"
                    defaultValue={'left'}
                >
                    {['bottom', 'left', 'right', 'top'].map((pos) => (
                        <MenuItem value={pos} key={`label-pos-ref-${pos}`}>
                            {pos.charAt(0).toUpperCase() + pos.slice(1)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="label-alignment">Label Alignment</InputLabel>

                <Select
                    {...register('label.options.alignment')}
                    labelId="label-alignment"
                    label="Alignemnt"
                    size="small"
                    defaultValue={'start'}
                >
                    {['center', 'end', 'start'].map((pos) => (
                        <MenuItem value={pos} key={`label-align-ref-${pos}`}>
                            {pos.charAt(0).toUpperCase() + pos.slice(1)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControlLabel
                style={{ marginLeft: 0 }}
                control={
                    <Switch
                        {...register('label.options.display')}
                        size="small"
                    ></Switch>
                }
                label="Display"
            ></FormControlLabel>
        </div>
    );
}
