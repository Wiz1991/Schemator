import { LayoutBuilder } from '@/components/layout-builder';
import styles from './page.module.css';

export default function Home() {
    return (
        <main className={styles.main}>
            <LayoutBuilder></LayoutBuilder>
        </main>
    );
}
