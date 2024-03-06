function TeamList({ teams }) {
    return (
        <div>
            <h2>Teams</h2>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {teams.map(team => (
                        <tr key={team._id}>
                            <td>{team._id}</td>
                            <td>{team.name}</td>
                            <td>
                                BUTTONS
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TeamList
