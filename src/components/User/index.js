import React, { Component } from "react";
import search from '../../commons/images/search.png';
import editIcon from '../../commons/images/edit.png';
import deleteIcon from '../../commons/images/delete.png';
import Pagination from "react-js-pagination";
import EditUserPopup from "./EditUserPopup";
const perPage = 10;
class UserRow extends Component {
  constructor(props) {
      super(props);
      this.renderActionColumn = this.renderActionColumn.bind(this);
  }

  renderActionColumn(userId, user, handleDelete, editUser) {
    return(
      <div className="action-column">
        <div><img className="action-icon" src={editIcon} onClick={() => editUser(user)} alt="Edit" /></div>
        <div><img className="action-icon" src={deleteIcon} onClick={() => handleDelete(userId)} alt="Delete" /></div>
      </div>
    )
  }

  render() {
      const { name, email, role, userId, handleChange, handleDelete, user, editUser } = this.props;
      return (
          <React.Fragment>
              <tr className={""}>
                  <td width="15%">
                    <div class="form-check">
                      <input class="form-check-input" key={userId} onClick={(e) => handleChange(e)} type="checkbox" value={userId} id={userId}  />
                    </div>
                  </td>
                  <td width="20%">{name}</td>
                  <td width="20%">{email}</td>
                  <td width="10%">{role}</td>
                  <td width="10%">
                      {this.renderActionColumn(userId, user, handleDelete, editUser)}
                  </td>
              </tr>
          </React.Fragment>
      )
  }
}

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slectedUsers: [],
      editUser: null
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDeleteSelectedUser = this.handleDeleteSelectedUser.bind(this);
    this.handleUserDelete = this.handleUserDelete.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.editUser = this.editUser.bind(this);
    this.handleEditUserSubmit = this.handleEditUserSubmit.bind(this);
  }
  
  componentDidMount() {
    this.props.loadData()
  }

  handlePageChange(page){
    let users = this.props.users.slice((perPage * (page-1)), perPage * page)
    this.props.setFilterUsers(users, page)
  }

  handleChange(e) {
    let isChecked = e.target.checked;
    let slectedUsers = this.state.slectedUsers;
    if(isChecked){
      slectedUsers.push(e.target.value)
    }else{
      slectedUsers = slectedUsers.filter(userId => userId !== e.target.value)
    }
    this.setState({ slectedUsers: slectedUsers })
  }

  handleUserDelete(userId) {
    this.props.deleteUsers([userId], this.props.users)
  }

  handleDeleteSelectedUser(){
    this.props.deleteUsers(this.state.slectedUsers, this.props.users)
    this.setState({ slectedUsers: [] })
  }

  editUser(user){
    this.setState({ editUser: user })
  }

  handleEditUserSubmit(users){
    this.props.setFilterUsers(users, this.props.currentPage)
    this.setState({ editUser: null })
  }

  _renderUsers() {
    return this.props.filterUsers.length > 0 ? (
        this.props.filterUsers.map((user, index) => (
            <UserRow
                key={index}
                name={user.name}
                role={user.role}
                email={user.email}
                userId={user.id}
                user={user}
                handleChange={this.handleChange}
                handleDelete={this.handleUserDelete}
                editUser={this.editUser}
            />
        ))
    ) : <p className="result-not-found">Oops!! No Users to display</p>
}

onSearch(e){
  if(e.keyCode === 13 && this.props.searchText == ""){
    this.props.loadData()
  }else if(e.keyCode === 13 && this.props.searchText !== ""){
    let searchText = this.props.searchText.toLowerCase()
    let users = this.props.users.filter(user => ( user.name.toLowerCase().includes(searchText) || user.email.toLowerCase().includes(searchText) || user.role.toLowerCase().includes(searchText)))
    this.props.handleData(users)
  }
}

  render() {
    return (
      <>
        <React.Fragment>
          {
            this.state.editUser ?
            <EditUserPopup
              editUser={this.state.editUser}
              users={this.props.filterUsers}
              handleEditUserSubmit={this.handleEditUserSubmit}
            /> : null
          }

          <div className="search-container">
              <input name="search" onKeyDown={this.onSearch}  onChange={e => { this.props.setSearch(e.target.value) }} value={this.props.searchText} placeholder="Search by name, email or role" className="search-input" />
              <img src={search} onClick={this.handleSearch} alt="Search Icon" />
          </div>
          <div className="">
            <table className="table">
                <thead className="">
                    <tr>
                      <th scope="col" width="15%"></th>
                      <th scope="col" width="20%">Name</th>
                      <th scope="col" width="20%">Email</th>
                      <th scope="col" width="10%">Role</th>
                      <th scope="col" width="10%">Actions</th>
                    </tr>
                </thead>
                <tbody className="">
                    {
                        this._renderUsers()
                    }
                </tbody>
            </table>
            
            {
              this.props.paginationNode
            }
          </div>

          
          
          <div className="bottom-pagination">
            {this.state.slectedUsers.length ? 
              <button type="button" onClick={this.handleDeleteSelectedUser} class="delete-btn btn btn-danger">Delete Selected</button>
              : null}
            <Pagination
              activePage={this.props.currentPage}
              itemsCountPerPage={perPage}
              totalItemsCount={this.props.pageCount}
              pageRangeDisplayed={50}
              onChange={this.handlePageChange}
            />
          </div>
        </React.Fragment>
      </>
    );
  }
}
export default User;
