import { useEffect } from "react";
import { Link } from "react-router-dom";
import Cardboard from "../components/Cardboard";

function Room_Management_Page() {
    return (
        <section id="welcome-page" className="p-8">
            <div>
                <h1 className="text-2xl font-semibold mb-4">Data Management</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Cardboard
                        title="Rooms Total"
                        value="0"
                    />
                    <Cardboard
                        title="Room Reservations (Count)"
                        value="0"
                    />
                    <Cardboard
                        title="Active Users"
                        value="0"
                    />
                </div>
            </div>
        </section>
    );
}

export default Room_Management_Page;
