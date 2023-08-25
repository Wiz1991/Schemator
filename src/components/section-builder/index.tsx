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
import { Backdrop, Button, Modal, ModalOwnerState } from '@mui/material';
import { addContentToSection } from '@/store/editor/editor.reducer';
import { LayoutTemplate } from '@/components/layout-template';
import {
    SlotComponentProps,
    ModalRootSlotPropsOverrides,
    ModalBackdropSlotPropsOverrides,
} from '@mui/base';
import { useState } from 'react';
import { CreateContent } from '@/components/forms/create-content';

interface SectionProps {
    sectionIndex: number;
}
export function SectionBuilder({ sectionIndex }: SectionProps) {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const section = useSelector<RootState, LayoutSection>((state) =>
        selectSectionByIndex(state, sectionIndex)
    );

    const modalSlotProps: {
        root?: SlotComponentProps<
            'div',
            ModalRootSlotPropsOverrides,
            ModalOwnerState
        >;
        backdrop?: SlotComponentProps<
            'div',
            ModalBackdropSlotPropsOverrides,
            ModalOwnerState
        >;
    } = {
        backdrop: {
            className: 'modal-backdrop',
        },
        root: {
            className: 'modal',
        },
    };

    return (
        <>
            <section className={styles['section-container']}>
                <Button
                    variant="outlined"
                    className={styles['add-group-btn']}
                    onClick={() => setOpen(true)}
                >
                    Add Group
                </Button>
                <LayoutTemplate section={section}>
                    {section.content.map((content, index) => {
                        console.log(index);
                        return (
                            <ContentBuilder
                                content={content}
                                groupPath={[index]}
                                activeSection={sectionIndex}
                            />
                        );
                    })}
                </LayoutTemplate>
            </section>
            <Modal
                hideBackdrop={false}
                slotProps={modalSlotProps}
                slots={{ backdrop: Backdrop }}
                open={open}
                onClose={() => setOpen(false)}
            >
                <CreateContent
                    activeSection={sectionIndex}
                    close={() => setOpen(false)}
                />
            </Modal>
        </>
    );
}
