'use client';

import { useSelector } from 'react-redux';
import styles from './styles.module.css';
import { selectSections } from '@/store/editor/edito.selectors';
import { FaPlusSquare } from 'react-icons/fa';

import { SyntheticEvent, useMemo, useState } from 'react';
import {
    Button,
    Modal,
    ModalBackdropSlotPropsOverrides,
    ModalOwnerState,
    ModalRootSlotPropsOverrides,
    SlotComponentProps,
    Tab,
    TabOwnerState,
    TabPanel,
    TabRootSlotPropsOverrides,
    Tabs,
    TabsList,
} from '@mui/base';
import { SectionBuilder } from '@/components/section-builder';
import classNames from 'classnames';
import { Backdrop } from '@/components/backdrop';
import { CreateSection } from '@/components/forms/create-section';
export function LayoutBuilder() {
    const [activeSection, setActiveSection] = useState(0);
    const [open, setOpen] = useState(false);

    const sections = useSelector(selectSections);

    const handleTabChange = (
        _: SyntheticEvent<Element, Event> | null,
        value: string | number | null
    ) => {
        if (value === null) return;
        setActiveSection(typeof value === 'string' ? Number(value) : value);
    };

    const tabSlotProps: {
        root: SlotComponentProps<
            'button',
            TabRootSlotPropsOverrides,
            TabOwnerState
        >;
    } = {
        root(ownerState) {
            return {
                className: classNames({
                    [styles['tab--selected']]: ownerState.selected,
                    [styles['tab--disabled']]: ownerState.disabled,
                }),
            };
        },
    };

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
            <section className={styles['layout-container']}>
                <Tabs
                    defaultValue={0}
                    value={activeSection}
                    onChange={handleTabChange}
                >
                    <div className={styles['header-container']}>
                        <TabsList className={styles['tab-list']}>
                            {sections.map((section, index) => (
                                <Tab
                                    slotProps={tabSlotProps}
                                    value={index}
                                    className={styles.tab}
                                    key={`section-list-${index}`}
                                >
                                    {section.name}
                                </Tab>
                            ))}
                        </TabsList>
                        <Button onClick={() => setOpen(true)}>
                            <FaPlusSquare size={20} />
                        </Button>
                    </div>
                    {sections.map((_, index) => (
                        <TabPanel
                            value={index}
                            className={styles['tab-panel']}
                            key={`section-panel-${index}`}
                        >
                            <SectionBuilder sectionIndex={index} />
                        </TabPanel>
                    ))}
                </Tabs>
            </section>
            <Modal
                hideBackdrop={false}
                slotProps={modalSlotProps}
                slots={{ backdrop: Backdrop }}
                open={open}
                onClose={() => setOpen(false)}
            >
                <CreateSection cancel={() => setOpen(false)} />
            </Modal>
        </>
    );
}
