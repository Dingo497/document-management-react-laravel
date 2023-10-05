import {InitialStateAuthType, TagsType, Documents} from "./appStateTypes";

export const AuthInitialState: InitialStateAuthType = {
    user: null,
    token: null,
};

export const TagsInitialState: TagsType = {
    tags: [
        {
            id: null,
            name: null,
        }
    ]
};

export const DocumentsInitialState: Documents = {
    documents: [
        {
            id: null,
            name: null,
            image: null,
            tags: []
        }
    ]
}

// export const initialState: InitialStateAuthType = {
//     user: {
//         id: 2,
//         name: 'asd',
//         email: 'asd@asd.asd',
//     },
//     token: '24|skfMT4CEuKpw9hCGXcTVyZ9wEl09sHdA7NTqIqUY7253e471',
// };
