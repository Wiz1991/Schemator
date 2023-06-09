interface SectionProps {
    sectionIndex: number;
}
export function SectionBuilder({ sectionIndex }: SectionProps) {
    return <section>IM A SECTION {sectionIndex}</section>;
}
