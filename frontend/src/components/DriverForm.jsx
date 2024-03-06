function DriverForm({ selectedDriver, onSubmit, onCancel }) {
    return (
        <div>
            <h2>{selectedDriver ? 'Éditer le pilote' : 'Ajouter un nouveau pilote'}</h2>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="First Name" name="first_name" required defaultValue={selectedDriver ? selectedDriver.first_name : ''} />
                <input type="text" placeholder="Last Name" name="last_name" required defaultValue={selectedDriver ? selectedDriver.last_name : ''} />
                <input type="text" placeholder="Team ID" name="teamId" required defaultValue={selectedDriver && selectedDriver.teamId ? selectedDriver.teamId._id : ''} />
                <button type="submit">{selectedDriver ? 'Mettre à jour' : 'Ajouter'}</button>
                <button type="button" onClick={onCancel}>Annuler</button>
            </form>
        </div>
    );
}

export default DriverForm
