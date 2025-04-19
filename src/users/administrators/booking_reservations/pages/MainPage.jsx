import { useEffect } from "react";
import { Link } from "react-router-dom";
import Cardboard from "../components/Cardboard";

function Booking_Reservation_Page() {
    return (
        <section id="welcome-page" className="p-8">
            <div>
                <h1 className="text-2xl font-semibold mb-4">Reservations Board</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Cardboard
                        title="Payment Process (Paid)"
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

export default Booking_Reservation_Page;
