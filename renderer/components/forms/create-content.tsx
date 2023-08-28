import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.css';
import { AppDispatch, RootState } from '@/store/store';
import {
    useFieldArray,
    useForm,
    FormProvider,
    useWatch,
} from 'react-hook-form';
import { Content, ContentType } from '@/lib/models/layout.model';
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { CreateGroup } from '@/components/forms/create-group';
import { CreatePropertyRef } from '@/components/forms/create-property-ref';
import { addContent, updateContent } from '@/store/editor/editor.reducer';
import { selectContentByGroupPath } from '@/store/editor/edito.selectors';

interface CreateContentProps {
    activeSection: number;
    groupPath?: number[];
    close: () => void;
}

export function CreateContent({
    activeSection,
    groupPath,
    close,
}: CreateContentProps) {
    const dispatch = useDispatch<AppDispatch>();

    const methods = useForm<Content>({
        shouldUnregister: true,
        defaultValues: {
            splitRatio: [1, 1],
        },
    });

    const type = useWatch({
        control: methods.control,
        name: 'type',
        defaultValue: ContentType.Property,
    });

    const {
        fields: splits,
        append,
        insert,
        remove,
    } = useFieldArray<any>({ name: 'splitRatio', control: methods.control });

    const onSubmit = (content: any) => {
        const payload = {
            ...content,
            ...(content.type === ContentType.Group
                ? { content: [] }
                : undefined),
        };

        dispatch(
            addContent({
                sectionIndex: activeSection,
                groupPath,
                content: payload,
            })
        );

        close();
    };

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
                                            key={`split-ratio-${i}`}
                                            size="small"
                                            type="number"
                                            required
                                            {...methods.register(
                                                `splitRatio.${i}`
                                            )}
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
                                    onClick={() => remove(splits.length - 1)}
                                >
                                    Remove Ratio
                                </Button>
                            </div>
                        </div>
                        <div>
                            <h2>Basic</h2>
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
                                        defaultValue={ContentType.Property}
                                        size="small"
                                    >
                                        <MenuItem value={ContentType.Group}>
                                            Group
                                        </MenuItem>
                                        <MenuItem value={ContentType.Property}>
                                            Property Ref
                                        </MenuItem>
                                        <MenuItem value={ContentType.ArrayRef}>
                                            Array Property Ref
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </div>

                    {type === ContentType.Group ? <CreateGroup /> : null}
                    {type === ContentType.Property ? (
                        <CreatePropertyRef />
                    ) : null}
                </div>
                <Button type="submit" fullWidth variant="contained">
                    Add
                </Button>
            </form>
        </FormProvider>
    );
}
