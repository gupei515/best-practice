import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import { Home } from "./Home";
import { UsersIndex } from "./UsersIndex";
import { UserProfile } from "./UserProfile";
import { OwnUserProfile } from "./OwnUserProfile";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="users" element={<Users />}>
                    <Route path="/" element={<UsersIndex />}></Route>
                    <Route path=":id" element={<UserProfile />}></Route>
                    <Route path="me" element={<OwnUserProfile />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

// parent is the one with the outlet
const Users = () => {
    return (
        <div>
            <nav>
                <Link to="me">My Profile</Link>
            </nav>
            <Outlet />
        </div>
    );
};
