function DriverList({ drivers, onEdit, onDelete }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Team</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {drivers.map(driver => (
                    <tr key={driver._id}>
                        <td>{driver.first_name}</td>
                        <td>{driver.last_name}</td>
                        <td>{driver.teamId.name}</td>
                        <td>
                            <button onClick={() => onEdit(driver._id)}>Edit</button>
                            <button onClick={() => onDelete(driver._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default DriverList