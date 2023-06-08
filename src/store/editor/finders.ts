import { Content, ContentType } from '@/lib/models/layout.model';

export function findContent<T extends Content>(
    content: Content[],
    name: string
): T | null {
    content.forEach((c) => {
        if (c.type == ContentType.Group) {
            if (c.name == name) return c;
            return findContent(c.content, name);
        }
    });

    return null;
}
