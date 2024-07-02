export type Post {
    id: string;
    content: string;
    image?: string; // image can be string or can be missing
    likes: number
    profile: User;
}

export type User {
    id: string;
    name: string;
    position: string;
    image?: string;
    backimage?: string;
    about?: string;
    experience?: Experience;
}

export type Experience {
    id: string;
    title: string;
    companyname: string;
    companyimage?: string;
}

export type Comment {
    id: string;
    postid: string;
    userid: string;
    comment: string; // image can be string or can be missing
    post: Post;
    profile: User;
}

export type variableCheck{
    activeLang: string;
}