import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
    const [drivers, setDrivers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedDriver, setSelectedDriver] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:8080/drivers');
                setDrivers(response.data);
            } catch (err) {
                console.error("Erreur lors de la récupération des données des pilotes", err);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:8080/teams');
                setTeams(response.data);
            } catch (err) {
                console.error("Erreur lors de la récupération des données des pilotes", err);
            }
        }
        fetchData();
    }, []);

    const toggleAddForm = (driver = null) => {
        setShowAddForm(!showAddForm);
        setSelectedDriver(driver);
    };

    const handleAddDriver = async (event) => {
        event.preventDefault();
        const driverData = {
            first_name: event.target.first_name.value,
            last_name: event.target.last_name.value,
            teamId: event.target.teamId.value,
        };

        try {
            let response;
            if (selectedDriver) {
                response = await axios.put(`http://localhost:8080/drivers/${selectedDriver._id}`, driverData);
                setDrivers(drivers.map(driver => driver._id === selectedDriver._id ? response.data : driver));
                console.log(selectedDriver._id)
            } else {
                response = await axios.post('http://localhost:8080/drivers', driverData);
                setDrivers([...drivers, response.data]);
            }
            toggleAddForm(null);
        } catch (err) {
            console.error("Erreur lors de la manipulation d'un pilote", err);
        }
    };

    const handleEdit = (driverId) => {
        const driverToEdit = drivers.find(driver => driver._id === driverId);
        if (driverToEdit) {
            setSelectedDriver(driverToEdit);
            setShowAddForm(true);
        } else {
            console.error("Pilote non trouvé avec l'ID:", driverId);
        }
    };

    const handleDelete = async (driverId) => {
        try {
            await axios.delete(`http://localhost:8080/drivers/${driverId}`);
            const newDrivers = drivers.filter(driver => driver._id !== driverId);
            setDrivers(newDrivers);
        } catch (err) {
            console.error("Erreur lors de la suppression du pilote", err);
        }
    };

    return (
        <>
            <h2>Pilotes</h2>
            <button onClick={() => toggleAddForm()}>Ajouter un pilote</button>
            {
                showAddForm && (
                    <div>
                        <h2>{selectedDriver ? 'Éditer le pilote' : 'Ajouter un nouveau pilote'}</h2>
                        <form onSubmit={handleAddDriver}>
                            <input
                                type="text"
                                placeholder="First Name"
                                name="first_name"
                                required
                                defaultValue={selectedDriver ? selectedDriver.first_name : ''}
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                name="last_name"
                                required
                                defaultValue={selectedDriver ? selectedDriver.last_name : ''}
                            />
                            <input
                                type="text"
                                placeholder="Team ID"
                                name="teamId"
                                required
                                defaultValue={selectedDriver && selectedDriver.teamId ? selectedDriver.teamId._id : ''}
                            />
                            <button type="submit">{selectedDriver ? 'Mettre à jour' : 'Ajouter'}</button>
                        </form>
                    </div>
                )
            }

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
                    {drivers.map((driver) => (
                        <tr key={driver._id}>
                            <td>{driver.first_name}</td>
                            <td>{driver.last_name}</td>
                            <td>{driver.teamId.name}</td>
                            <td>
                                <button onClick={() => handleEdit(driver._id)}>Edit</button>
                                <button onClick={() => handleDelete(driver._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

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
                    {teams.map((team) => (
                        <tr key={team._id}>
                            <td>{team._id}</td>
                            <td>{team.name}</td>
                            <td>
                                buttons edit et delete
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default App;
