import { Content, ContentType, Group } from '@/lib/models/layout.model';

export function findContent<T extends Content>(
    content: Content[],
    groupPath: number[]
): T | null {
    const [current, ...rest] = groupPath;

    if (rest.length > 0)
        return findContent((content[current] as Group).content, rest);

    return content[current] as T;
}
