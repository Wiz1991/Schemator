import { useDispatch } from 'react-redux';
import styles from './styles.module.css';
import { AppDispatch } from '@/store/store';
import {
    useFieldArray,
    useForm,
    FormProvider,
    useWatch,
} from 'react-hook-form';
import { Content } from '@/lib/models/layout.model';
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { CreateGroup } from '@/components/forms/create-group';

interface CreateContentProps {
    activeSection: number;
    groupPath?: number[];
}

export function CreateContent({
    activeSection,
    groupPath,
}: CreateContentProps) {
    const dispatch = useDispatch<AppDispatch>();
    const methods = useForm();

    const type = useWatch({ control: methods.control, name: 'type' });
    const {
        fields: splits,
        append,
        insert,
    } = useFieldArray({ name: 'splitRatio', control: methods.control });

    const onSubmit = (content: any) => {};

    return (
        <FormProvider {...methods}>
            <form
                className={styles['form-container']}
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <h1 className={styles['form-title']}>Create Content</h1>
                <div className={styles.form}>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2,1fr)',
                            gap: 'var(--size-1',
                        }}
                    >
                        <div className={styles['grouped-inputs']}>
                            <h2>Ratio</h2>
                            <div className={styles.splits}>
                                {splits.map((_, i) => {
                                    return (
                                        <TextField
                                            size="small"
                                            type="number"
                                            {...methods.register('spacer')}
                                            label={`#${i}`}
                                        />
                                    );
                                })}
                            </div>
                            <Button
                                fullWidth
                                style={{ marginTop: 'var(--size-1)' }}
                                onClick={() => append(1)}
                            >
                                Add Ratio
                            </Button>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 'var(--size-4)',
                            }}
                        >
                            <FormControl fullWidth>
                                <TextField
                                    size="small"
                                    {...methods.register('spacer')}
                                    label="Spacing"
                                    type="number"
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id="type-select">
                                    Content Type
                                </InputLabel>
                                <Select
                                    {...methods.register('type')}
                                    labelId="type-select"
                                    label="Content Type"
                                    defaultValue={'ref'}
                                    size="small"
                                >
                                    <MenuItem value="group">Group</MenuItem>
                                    <MenuItem value="ref">
                                        Property Ref
                                    </MenuItem>
                                    <MenuItem value="arrayRef">
                                        Array Property Ref
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    {type == 'group' ? <CreateGroup /> : null}
                </div>
            </form>
        </FormProvider>
    );
}
