import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { Navbar_Public } from "../components/Navbar";

function StaySuite_Public() {
    return (
        <Fragment>
            <Navbar_Public />
            <main id="staysuite_hotel_services">
                <Outlet />
            </main>
        </Fragment>
    )
}

export default StaySuite_Public;