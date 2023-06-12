import { ReactElement, ReactNode } from 'react';
import styles from './styles.module.css';
import { LayoutSection, LayoutType } from '@/lib/models/layout.model';

interface LayoutTemplateProps {
    section: LayoutSection;
    children: ReactNode;
}

interface LayoutProps {
    children: ReactNode;
    columnRatio?: number[];
    gap?: number;
}

const LayoutMappings: Record<LayoutType, (props: LayoutProps) => JSX.Element> =
    {
        columns: ColumnsLayot,
        'clc-log': () => <></>,
        'data-acquisition': () => <></>,
        'default-log': () => <></>,
        'report-configurator': () => <></>,
    };

export function LayoutTemplate({ children, section }: LayoutTemplateProps) {
    const Layout = LayoutMappings[section.type ?? 'columns'];

    return (
        <Layout columnRatio={section.columnRatio} gap={section.gap}>
            {children}
        </Layout>
    );
}

function ColumnsLayot({ children, columnRatio, gap }: LayoutProps) {
    return (
        <div
            className={styles['layout-columns']}
            style={{
                gridTemplateColumns: columnRatio
                    ?.map((ratio) => ratio + 'fr')
                    .join(' '),
                gap: `${gap}rem`,
            }}
        >
            {children}
        </div>
    );
}
