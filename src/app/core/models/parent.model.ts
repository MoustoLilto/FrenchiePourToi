export interface Parent {
    id: string;
    name: string;
    description: string;
    gender: 'male' | 'female';
    birthDate: string;
    color: string;
    weight: number;
    height: number;
    pedigree: {
        registration: string;
        lineage: string[];
    };
    healthTests: {
        name: string;
        result: string;
        date: string;
        certificate?: string;
    }[];
    achievements: {
        title: string;
        date: string;
        organization: string;
    }[];
    images: {
        publicId: string;
        alt: string;
        isMain: boolean;
    }[];
    offspring: string[]; // IDs des chiots
    status: 'active' | 'retired';
}

export interface ParentsResponse {
    parents: Parent[];
}
