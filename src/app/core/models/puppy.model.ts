export interface Puppy {
    id: string;
    name: string;
    description: string;
    birthDate: string;
    gender: string;
    color: string;
    status: string;
    price: number;
    features: string[];
    images: {
        publicId: string;
        alt: string;
        isMain: boolean;
    }[];
    parents: {
        father: string;
        mother: string;
    };
    vaccines: {
        name: string;
        date: string;
    }[];
}

export interface PuppiesResponse {
    puppies: Puppy[];
}
