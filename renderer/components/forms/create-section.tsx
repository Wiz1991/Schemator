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
import { useFieldArray, useForm } from 'react-hook-form';
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
        control,
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

    const onSubmit = (section: CreateSectionForm) => {
        save(section);
    };

    const {
        fields: ratios,
        append,
        remove,
        insert,
    } = useFieldArray<any>({ name: 'columnRatio', control });

    return (
        <form
            className={styles['form-container']}
            onSubmit={handleSubmit(onSubmit)}
        >
            <h1 className={styles['form-title']}>Create Section</h1>
            <div className={styles.form}>
                <div
                    style={{
                        display: 'flex',
                        gap: '1rem',
                    }}
                >
                    <FormControl fullWidth>
                        <TextField
                            autoFocus
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
                            <MenuItem value={LayoutType.Columns}>
                                Columns
                            </MenuItem>
                            <MenuItem value={LayoutType.DataAcq}>
                                Data Aquisition
                            </MenuItem>
                            <MenuItem value={LayoutType.ReportConfigurator}>
                                Property Sheet
                            </MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <FormControl fullWidth>
                    <div className={styles['grouped-inputs']}>
                        <h2>Column Ratio</h2>
                        <div className={styles.splits}>
                            {ratios.map((_, i) => {
                                return (
                                    <TextField
                                        key={`column-s-ratio-${i}`}
                                        size="small"
                                        type="number"
                                        required
                                        {...register(`columnRatio.${i}`)}
                                        label={`#${i}`}
                                    />
                                );
                            })}
                        </div>
                        <div style={{ display: 'flex' }}>
                            <Button
                                fullWidth
                                style={{ marginTop: 'var(--size-1)' }}
                                onClick={() => append(1)}
                            >
                                Add Ratio
                            </Button>
                            <Button
                                fullWidth
                                style={{ marginTop: 'var(--size-1)' }}
                                onClick={() => remove(ratios.length - 1)}
                            >
                                Remove Ratio
                            </Button>
                        </div>
                    </div>
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
