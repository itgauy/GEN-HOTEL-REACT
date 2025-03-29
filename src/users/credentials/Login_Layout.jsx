import { Fragment } from "react";
import { Outlet } from "react-router-dom";

function StaySuite_Login_Layout() {
    return (
        <Fragment>
            <main id="staysuite-login">
                <Outlet />
            </main>
        </Fragment>
    )
}

export default StaySuite_Login_Layout;