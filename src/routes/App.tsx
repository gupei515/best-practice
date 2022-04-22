import { BrowserRouter, Routes, Route, Link, Outlet, useRoutes } from "react-router-dom";
import { Home } from "./Home";
import { UsersIndex } from "./UsersIndex";
import { UserProfile } from "./UserProfile";
import { OwnUserProfile } from "./OwnUserProfile";

// https://medium.com/age-of-awareness/amazing-new-stuff-in-react-router-v6-895ba3fab6af
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
    //             <Route path="/" element={<Home />} />
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
            <nav>
                <Link to="me">My Profile</Link>
            </nav>
            <Outlet />
        </div>
    );
};

// why the outlet element is best to use it in layouts

// useRoutes to create the routes element by supplying the array.
