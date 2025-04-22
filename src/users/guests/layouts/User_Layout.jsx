import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { Navbar_User } from "../components/Navbar";

function StaySuite_User() {
    return (
        <Fragment>
            <Navbar_User />
            <main id="staysuite_hotel_services">
                <Outlet />
            </main>
        </Fragment>
    )
}

export default StaySuite_User;