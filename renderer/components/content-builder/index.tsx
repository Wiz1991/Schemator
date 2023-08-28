import {
    Content,
    ContentType,
    Group,
    PropertyRef,
} from '@/lib/models/layout.model';
import styles from './styles.module.css';
import classNames from 'classnames';
import { Backdrop, Button, Modal, ModalOwnerState } from '@mui/material';
import { CreateContent } from '@/components/forms/create-content';
import {
    SlotComponentProps,
    ModalRootSlotPropsOverrides,
    ModalBackdropSlotPropsOverrides,
} from '@mui/base';
import { useState } from 'react';

interface ContentBuilderProps {
    content: Content;
    activeSection: number;
    groupPath: number[];
}

export function ContentBuilder({
    content,
    activeSection,
    groupPath,
}: ContentBuilderProps) {
    return (
        <section>
            {content.type === ContentType.Property && (
                <PropertyRenderer
                    property={content}
                    activeSection={activeSection}
                />
            )}
            {content.type === ContentType.Group && (
                <GroupRenderer
                    group={content}
                    activeSection={activeSection}
                    groupPath={groupPath}
                />
            )}
        </section>
    );
}

function PropertyRenderer({
    property,
}: {
    property: PropertyRef;
    activeSection: number;
}) {
    return <div className={styles['property-box']}>{property.ref}</div>;
}

function GroupRenderer({
    group,
    activeSection,
    groupPath,
}: {
    group: Group;
    activeSection: number;
    groupPath: number[];
}) {
    const [open, setOpen] = useState(false);

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
        <div className={styles['group-renderer']}>
            <div className={styles['group-renderer__header']}>
                <span>{group.name}</span>
                <Button onClick={() => setOpen(true)}>Add</Button>
            </div>
            <div className={styles['group-box']}>
                <div
                    className={classNames(styles.group, {
                        [styles['group--row']]: group.direction === 'row',
                        [styles['group--column']]: group.direction === 'column',
                    })}
                    style={{
                        display: 'grid',
                        gap: `${group.gap}rem`,
                        gridTemplateColumns: group.splitRatio
                            ?.map((ratio) => ratio + 'fr')
                            .join(' '),
                        marginBottom: `${group.spacer}rem`,
                    }}
                >
                    {group.content.map((content, index) => (
                        <ContentBuilder
                            groupPath={[...groupPath, index]}
                            content={content}
                            activeSection={activeSection}
                        />
                    ))}
                </div>
                <Modal
                    hideBackdrop={false}
                    slotProps={modalSlotProps}
                    slots={{ backdrop: Backdrop }}
                    open={open}
                    onClose={() => setOpen(false)}
                >
                    <CreateContent
                        activeSection={activeSection}
                        groupPath={groupPath}
                        close={() => setOpen(false)}
                    />
                </Modal>
            </div>
        </div>
    );
}
