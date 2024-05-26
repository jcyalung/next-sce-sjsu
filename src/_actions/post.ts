export interface Post {
    _id: string;
    msg: string;
}

export interface PostResult {
    data?: Post[];
    errMsg?: string;
}