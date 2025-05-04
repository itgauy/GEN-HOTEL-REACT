import { useEffect } from "react";
import { Link } from "react-router-dom";
import Cardboard from "../components/Cardboard";
import useTallyDateStore from "../stores/tally_data.store";

function Room_Management_Page() {
    const { registrationData, roomData, fetchGuestUsers, fetchRoomData } = useTallyDateStore();

    useEffect(() => {
        fetchGuestUsers();
        fetchRoomData();
    }, [fetchGuestUsers, fetchRoomData]);

    // Count lengths for display
    const activeUsersCount = Array.isArray(registrationData) ? registrationData.length : 0;
    const roomsTotalCount = Array.isArray(roomData) ? roomData.length : 0;

    return (
        <section id="welcome-page" className="p-8">
            <div>
                <h1 className="text-2xl font-semibold mb-4">Data Management</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Cardboard
                        title="Rooms Total"
                        value={roomsTotalCount}
                    />
                    <Cardboard
                        title="Active Users"
                        value={activeUsersCount}
                    />
                </div>
            </div>
        </section>
    );
}

export default Room_Management_Page;