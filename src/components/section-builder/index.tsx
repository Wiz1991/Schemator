import {
    ContentType,
    LayoutSection,
    LayoutType,
} from '@/lib/models/layout.model';
import { selectSectionByIndex } from '@/store/editor/edito.selectors';
import { RootState } from '@/store/store';
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { ContentBuilder } from '@/components/content-builder';
import { Button } from '@mui/material';
import { addContentToSection } from '@/store/editor/editor.reducer';
import { LayoutTemplate } from '@/components/layout-template';

interface SectionProps {
    sectionIndex: number;
}
export function SectionBuilder({ sectionIndex }: SectionProps) {
    const dispatch = useDispatch();
    const section = useSelector<RootState, LayoutSection>((state) =>
        selectSectionByIndex(state, sectionIndex)
    );

    return (
        <section className={styles['section-container']}>
            <Button
                variant="outlined"
                className={styles['add-group-btn']}
                onClick={() => {
                    dispatch(
                        addContentToSection({
                            content: {
                                type: ContentType.Group,
                                content: [],
                                direction: 'column',
                                name: 'TEST',
                            },
                            sectionIndex,
                        })
                    );
                }}
            >
                Add Group
            </Button>
            <LayoutTemplate section={section}>
                {section.content.map((content, index) => (
                    <ContentBuilder
                        groupPath={[index]}
                        content={content}
                        activeSection={sectionIndex}
                    />
                ))}
            </LayoutTemplate>
        </section>
    );
}
