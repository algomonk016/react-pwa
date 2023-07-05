import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import Users from "pages/users";
import Posts from "pages/posts";

const AppRoutes: FC = () => {
    return (
        <Routes>
            <Route path="/react-pwa">
                <Route index element={<Users />} />
                <Route path="posts" element={<Posts />} />
            </Route>

            {/* Using path="*"" means "match anything", so this route
            acts like a catch-all for URLs that we don't have explicit
            routes for. */}
            {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
    )
}

export default AppRoutes;