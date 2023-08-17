import {
    Content,
    ContentType,
    Group,
    PropertyRef,
} from '@/lib/models/layout.model';
import styles from './styles.module.css';
import classNames from 'classnames';
import { Button } from '@mui/material';

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
    return (
        <div className={styles['group-box']}>
            <span>{group.name}</span>
            <Button variant="contained">Add</Button>
            <div
                className={classNames(styles.group, {
                    [styles['group--row']]: group.direction === 'row',
                    [styles['group--column']]: group.direction === 'column',
                })}
                style={{
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
        </div>
    );
}
