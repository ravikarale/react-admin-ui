import { createReducer, createNamespacer } from '../commons/utils/reducer';

const namespacers = {
    users: createNamespacer("USERS"),
}

const initialState = {
    isLoading: false,
    userDetails: [],
    currentPage: 1,
    pageCount: 0,
    search: '',
    filterUsers: [],
    searchText: ''
}

const userReducer = createReducer(initialState, {
    [namespacers.users("SET_LOADING")]: (state, action) => {
        return {
            ...state,
            isLoading: action.payload.value,
        }
    },
    [namespacers.users("SET_CURRENT_PAGE")]: (state, action) => {
        return {
            ...state,
            currentPage: action.payload.value,
        }
    },
    [namespacers.users("SET_PAGE_COUNT")]: (state, action) => {
        return {
            ...state,
            pageCount: action.payload.value,
        }
    },
    [namespacers.users("SET_FILTER_USERS")]: (state, action) => {
        return {
            ...state,
            filterUsers: action.payload.value,
        }
    },
    [namespacers.users("SET_USERS")]: (state, action) => {
        return {
            ...state,
            userDetails: action.payload.value,
        }
    },
    [namespacers.users("SET_SEARCH_TEXT")]: (state, action) => {
        return {
            ...state,
            searchText: action.payload.value,
        }
    },
    
});

export default userReducer;