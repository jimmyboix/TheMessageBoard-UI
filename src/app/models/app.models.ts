export interface Post {
    _id: string;
    createdAt: Date;
    isDeleted: boolean;
    link: string;
    title: string;
    isAnon: boolean;
    _comments: Comment[];
    _creator: Creator;
    isLocked: boolean;
}

export interface Comment {
    text: string;
    createdAt: Date;
    id: string;
    creator: Creator;
}

export interface Creator {
    username: string;
    id: string;
}