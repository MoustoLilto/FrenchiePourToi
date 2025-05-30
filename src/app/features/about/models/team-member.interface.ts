import { SocialLink } from '@/core/constants/social-links.constants';

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    description: string;
    imagePublicId: string;
    colorClass: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
    socialLinks?: SocialLink[];
}
