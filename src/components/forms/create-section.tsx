import {
    Button,
    ButtonGroup,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import styles from './styles.module.css';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { LayoutSection, LayoutType } from '@/lib/models/layout.model';

interface CreateSectionForm extends LayoutSection {
    columns: number;
}

export function CreateSection({
    cancel,
    save,
}: {
    cancel: () => void;
    save: (form: LayoutSection) => void;
}) {
    const dispatch = useDispatch<AppDispatch>();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<CreateSectionForm>({
        defaultValues: {
            name: '',
            type: LayoutType.Columns,
            columns: 2,
            columnRatio: [1, 1],
            gap: 1,
        },
    });

    const onSubmit = ({ columns, ...rest }: CreateSectionForm) => {
        save({
            ...rest,
            columnRatio: Array.from({ length: columns }).map((_) => 1),
        });
    };

    return (
        <form
            className={styles['form-container']}
            onSubmit={handleSubmit(onSubmit)}
        >
            <h1 className={styles['form-title']}>Create Section</h1>
            <div className={styles.form}>
                <FormControl fullWidth>
                    <TextField
                        placeholder="Name"
                        required
                        size="small"
                        {...register('name', { required: true })}
                    />
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="type-select">Layout Type</InputLabel>
                    <Select
                        {...register('type')}
                        labelId="type-select"
                        label="Layout Type"
                        size="small"
                        defaultValue={LayoutType.Columns}
                    >
                        <MenuItem value={LayoutType.Columns}>Columns</MenuItem>
                        <MenuItem value={LayoutType.DataAcq}>
                            Data Aquisition
                        </MenuItem>
                        <MenuItem value={LayoutType.ReportConfigurator}>
                            Report Configurator
                        </MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        size="small"
                        {...register('columns')}
                        label="No. Columns"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    />
                </FormControl>
            </div>
            <div className={styles['form-action']}>
                <Button size="small" variant="text" onClick={() => cancel()}>
                    Cancel
                </Button>
                <Button size="small" variant="contained" type="submit">
                    Save
                </Button>
            </div>
        </form>
    );
}
