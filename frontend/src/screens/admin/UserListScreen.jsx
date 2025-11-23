import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button} from 'react-bootstrap'
import {FaTrash, FaTimes, FaEdit, FaCheck} from 'react-icons/fa'
import {useGetUsersQuery, useDeleteUserMutation} from '../../slices/usersApiSlice'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import {toast} from 'react-toastify';

const UserListScreen = () => {
    const {data: users, isLoading, error, refetch} = useGetUsersQuery();
    const [deleteUser, {isLoading: loadingDelete}] = useDeleteUserMutation();

    const deleteHandler = async (id) => {
      if(window.confirm('Are you sure you want to delete this user?')) {
        try{
            await deleteUser(id);
            toast.success('User deleted successfully');
            refetch();
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
      }
    }
  return (
    <>
        <h1>Users</h1>
        {loadingDelete && <Loader />}
        {isLoading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
        <Table striped hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{color: 'green'}} />
                  ) : (
                    <FaTimes style={{color: 'red'}} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                        <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button onClick={()=> deleteHandler(user._id)} variant='danger' className='btn-sm'>
                      <FaTrash style={{color: 'white'}} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen;
