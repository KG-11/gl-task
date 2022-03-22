import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Posts, Todos, Post, CreatePost } from "./pages";
import "./App.css";
import Home from "./pages/Home";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Navigate to="dashboard"></Navigate>}></Route>
                <Route path="dashboard" element={<Dashboard />}>
                    <Route index element={<Home />} />
                    <Route path="posts" element={<Posts />}></Route>
                    <Route path="posts/create" element={<CreatePost />}></Route>
                    <Route path="posts/:post_id" element={<Post />}></Route>
                    <Route path="todos" element={<Todos />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
