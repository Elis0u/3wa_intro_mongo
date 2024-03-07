import React, { useEffect, useState } from 'react';
import './App.css';
import { getDatas, addData, editData, deleteData } from './services/api.js';
import DriverForm from './components/DriverForm';
import DriverList from './components/DriverList';
import TeamList from './components/TeamList';
import UserList from './components/UserList';

function App() {
    const [drivers, setDrivers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [users, setUsers] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedDriver, setSelectedDriver] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getDatas('http://localhost:8080/drivers');
                setDrivers(response.data);
            } catch (err) {
                console.error("Erreur lors de la récupération des données des pilotes", err);
            }
        };
        fetchData();
    }, []);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getDatas('http://localhost:8080/teams');
                setTeams(response.data);
            } catch (err) {
                console.error("Erreur lors de la récupération des données des équipes", err);
            }
        };
        fetchData();
    }, []);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getDatas('http://localhost:8080/users');
                setUsers(response.data);
            } catch (err) {
                console.error("Erreur lors de la récupération des données users", err);
            }
        };
        fetchData();
    }, []);

    const toggleAddForm = () => {
        setShowAddForm(!showAddForm);
        // Réinitialiser le pilote sélectionné lorsque le formulaire est fermé ou un nouveau pilote est ajouté
        if (showAddForm || !selectedDriver) {
            setSelectedDriver(null);
        }
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
                response = await editData(`http://localhost:8080/drivers/${selectedDriver._id}`, driverData);
                setDrivers(drivers.map(driver => driver._id === selectedDriver._id ? response.data : driver));
            } else {
                response = await addData('http://localhost:8080/drivers', driverData);
                setDrivers([...drivers, response.data]);
            }
            toggleAddForm();
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

    const handleDeleteDriver = async (driverId) => {
        try {
            await deleteData(`http://localhost:8080/drivers/${driverId}`);
            const newDrivers = drivers.filter(driver => driver._id !== driverId);
            setDrivers(newDrivers);
        } catch (err) {
            console.error("Erreur lors de la suppression du pilote", err);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await deleteData(`http://localhost:8080/users/${userId}`);
            const delUser = users.filter(user => user._id !== userId);
            setUsers(delUser);
        } catch (err) {
            console.error("Erreur lors de la suppression du user", err);
        }
    };

    return (
        <>
            <h2>Pilotes</h2>
            <button onClick={toggleAddForm}>Ajouter un pilote</button>
            {showAddForm && <DriverForm selectedDriver={selectedDriver} onSubmit={handleAddDriver} onCancel={toggleAddForm} />}

            <DriverList drivers={drivers} onEdit={handleEdit} onDelete={handleDeleteDriver} />

            <TeamList teams={teams} />

            <UserList users={users} onDelete={handleDeleteUser}/>
        </>
    );
}

export default App;
