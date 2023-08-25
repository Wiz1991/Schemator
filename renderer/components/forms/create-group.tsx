import { BaseContent, ContentType, Group } from '@/lib/models/layout.model';
import { useFieldArray, useForm, useFormContext } from 'react-hook-form';
import styles from './styles.module.css';
import {
    Button,
    FormControl,
    FormControlLabel,
    FormGroup,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField,
} from '@mui/material';

export function CreateGroup() {
    const { register } = useFormContext<Group>();

    const {
        fields: splits,
        append,
        insert,
    } = useFieldArray({ name: 'splitRatio' });

    return (
        <div className={styles['create-group']}>
            <div>
                <h2>Basic</h2>
                <div className={styles['create-group__basic']}>
                    <TextField
                        size="small"
                        {...register('name')}
                        label="Group Name"
                    ></TextField>
                    <FormControl>
                        <InputLabel id="direction-select">
                            Render Direction
                        </InputLabel>

                        <Select
                            {...register('direction')}
                            labelId="direction-select"
                            label="Direction"
                            size="small"
                            defaultValue={'column'}
                        >
                            <MenuItem value={'column'}>Column</MenuItem>
                            <MenuItem value={'row'}>Row</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        type="number"
                        {...register('gap')}
                        label="Gap"
                    ></TextField>
                    <FormControl>
                        <InputLabel id="label-position-select">
                            Default Label Alignemnt
                        </InputLabel>

                        <Select
                            {...register('labelAlignment')}
                            labelId="label-alignment-select"
                            label="Label Alignment"
                            size="small"
                            defaultValue={'start'}
                        >
                            <MenuItem value={'start'}>Start</MenuItem>
                            <MenuItem value={'end'}>End</MenuItem>
                            <MenuItem value={'center'}>Center</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>

            <div className={styles['labels-container']}>
                <h2> Label Options</h2>
                <div className={styles['create-group__label']}>
                    <FormControl>
                        <TextField
                            {...register('label.text')}
                            size="small"
                            label="Text"
                        ></TextField>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="label-position-position">
                            Position
                        </InputLabel>
                        <Select
                            {...register('label.options.position')}
                            labelId="label-position-position"
                            label="Position"
                            size="small"
                            defaultValue={'left'}
                        >
                            {['bottom', 'left', 'right', 'top'].map((pos) => (
                                <MenuItem value={pos} key={`label-pos-${pos}`}>
                                    {pos.charAt(0).toUpperCase() + pos.slice(1)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="label-alignment">
                            Label Alignment
                        </InputLabel>

                        <Select
                            {...register('label.options.alignment')}
                            labelId="label-alignment"
                            label="Alignemnt"
                            size="small"
                            defaultValue={'start'}
                        >
                            {['center', 'end', 'start'].map((pos) => (
                                <MenuItem value={pos} key={`align - ${pos}`}>
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
            </div>
        </div>
    );
}
