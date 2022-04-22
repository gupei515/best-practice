import { BrowserRouter, Routes, Route, Link, Outlet, useRoutes } from "react-router-dom";
import { Home } from "./Home";
import { UsersIndex } from "./UsersIndex";
import { UserProfile } from "./UserProfile";
import { OwnUserProfile } from "./OwnUserProfile";
import { input } from "bootstrap";
import "../index.scss";

// https://medium.com/age-of-awareness/amazing-new-stuff-in-react-router-v6-895ba3fab6af
// read through this  https://reactrouter.com/docs/en/v6/getting-started/installation
export const App = () => {
    // useRoutes to create the routes element by supplying the array. TODO
    const elements = useRoutes([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "users",
            element: <Users />,
            children: [
                {
                    path: "/",
                    element: <UsersIndex />,
                },
                { path: ":id", element: <UserProfile /> },
                { path: "me", element: <OwnUserProfile /> },
            ],
        },
    ]);
    // return (
    //     <BrowserRouter>
    //         <Routes>
    //             <Route path=":id" element={<Home />} />
    //             <Route path="users" element={<Users />}>
    //                 <Route path="/" element={<UsersIndex />}></Route>
    //                 <Route path=":id" element={<UserProfile />}></Route>
    //                 <Route path="me" element={<OwnUserProfile />}></Route>
    //             </Route>
    //             {elements}
    //         </Routes>
    //     </BrowserRouter>
    // );
    return elements;
};

// parent is the one with the outlet
// outlet enables the users to render its child routes
const Users = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">
                    Navbar
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">
                                Home <span className="sr-only">(current)</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Link
                            </a>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                Dropdown
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="#">
                                    Action
                                </a>
                                <a className="dropdown-item" href="#">
                                    Another action
                                </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">
                                    Something else here
                                </a>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="#">
                                Disabled
                            </a>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                            Search
                        </button>
                    </form>
                </div>
            </nav>
            <div>
                <Outlet />
            </div>
        </div>
    );
};

// why the outlet element is best to use it in layouts

// useRoutes to create the routes element by supplying the array.
