function UserList({ users, onDelete }) {
    return (
        <div>
            <h2>User</h2>
            <table>
                <thead>
                    <tr>
                        <th>firstname</th>
                        <th>lastname</th>
                        <th>email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => onDelete(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserList
