import User from '../../components/User';
import { connect } from 'react-redux'; 
import { getUsers } from '../../api/users';
import { withRouter } from "react-router-dom";
import { createNamespacer } from '../../commons/utils/reducer';
import { toast } from 'react-toastify';
const perPage = 10;

const namespacer = createNamespacer('USERS')

const mapStateToProps = (state) => {
    return {
        users: state.users.userDetails,
        currentPage: state.users.currentPage,
        pageCount: state.users.pageCount,
        filterUsers: state.users.filterUsers,
        searchText:  state.users.searchText,
        editUser: state.users.editUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadData: () => {
            (async () => {
                let response;
                try {
                    response = await getUsers()
                    dispatch({
                        type: namespacer("SET_USERS"),
                        payload: {
                            value: response.data
                        }
                    })
                    dispatch({
                        type: namespacer("SET_CURRENT_PAGE"),
                        payload: {
                            value: 1
                        }
                    })
                    dispatch({
                        type: namespacer("SET_FILTER_USERS"),
                        payload: {
                            value: response.data.slice(0, perPage)
                        }
                    })
                    dispatch({
                        type: namespacer("SET_PAGE_COUNT"),
                        payload: {
                            value: response.data.length
                        }
                    })
                } catch (e) {
                    toast.error("Oops! Something went wrong. Please try again.", {
                        position: toast.POSITION.BOTTOM_CENTER
                    })
                    return;
                }

            })()
        },
        handleData: (data) => {
            dispatch({
                type: namespacer("SET_FILTER_USERS"),
                payload: {
                    value: data
                }
            })
            dispatch({
                type: namespacer("SET_CURRENT_PAGE"),
                payload: {
                    value: 1
                }
            })
            dispatch({
                type: namespacer("SET_PAGE_COUNT"),
                payload: {
                    value: data.length
                }
            })
           
        },
        deleteUsers: (toBeDeleteUsers, users) => {
            let filterUsers = users.filter(user => !toBeDeleteUsers.includes(user.id) )
            dispatch({
                type: namespacer("SET_USERS"),
                payload: {
                    value: filterUsers
                }
            })
            dispatch({
                type: namespacer("SET_FILTER_USERS"),
                payload: {
                    value: filterUsers.slice(0, perPage)
                }
            })
            dispatch({
                type: namespacer("SET_PAGE_COUNT"),
                payload: {
                    value: filterUsers.length
                }
            })
            dispatch({
                type: namespacer("SET_CURRENT_PAGE"),
                payload: {
                    value: 1
                }
            })

        },
        setFilterUsers: (data, page) => {
            dispatch({
                type: namespacer("SET_FILTER_USERS"),
                payload: {
                    value: data
                }
            })
            dispatch({
                type: namespacer("SET_CURRENT_PAGE"),
                payload: {
                    value: page
                }
            })
        },
        setSearch: (search) =>{
            dispatch({
                type: namespacer("SET_SEARCH_TEXT"),
                payload: {
                    value: search
                }
            })
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(User))