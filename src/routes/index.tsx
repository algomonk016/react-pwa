import { FC } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Layout from "../layout";
import Users from "../pages/users";
import Posts from "../pages/posts";
import NotFound from "../pages/NotFound";

const AppRoutes: FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Users />} />
            <Route path="posts" element={<Posts />} />

            {/* Using path="*"" means "match anything", so this route
            acts like a catch-all for URLs that we don't have explicit
            routes for. */}
            {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
    )
}

export default AppRoutes;