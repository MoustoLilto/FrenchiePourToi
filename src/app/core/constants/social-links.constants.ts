export const socialLinks = {
    facebook: {
        url: 'https://www.facebook.com/FrenchiePourToi',
        icon: 'carbon--logo-facebook',
        label: $localize`:@@social.facebook:Facebook`,
    },
    instagram: {
        url: 'https://www.instagram.com/frenchiepourtoiofficial',
        icon: 'carbon--logo-instagram',
        label: $localize`:@@social.instagram:Instagram`,
    },
    tiktok: {
        url: 'https://www.tiktok.com/@frenchiepourtoiofficial',
        icon: 'ic--round-tiktok',
        label: $localize`:@@social.tiktok:TikTok`,
    },
    youtube: {
        url: 'https://www.youtube.com/channel/FrenchiePourToi',
        icon: 'carbon--logo-youtube',
        label: $localize`:@@social.youtube:YouTube`,
    },
};

export interface SocialLink {
    url: string;
    icon: string;
    label?: string;
}
