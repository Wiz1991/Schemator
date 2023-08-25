import { LayoutBuilder } from '@/components/layout-builder';
import { Providers } from '@/components/providers/providers';

export default function Home() {
    return (
        <Providers>
            <main>
                <LayoutBuilder></LayoutBuilder>
            </main>
        </Providers>
    );
}
