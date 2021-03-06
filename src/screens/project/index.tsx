import React from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { EpicScreen } from "screens/epic";
import { KanbanScreen } from "screens/kanban";

export const ProjectScreen = () => {
    return <div>
        <h1>ProjectScreen</h1>
        <Link to="/kanban">看板</Link>
        <Link to="/kanban"></Link>
        <Routes>
            <Route path={"/kanban"} element={<KanbanScreen />} />
            <Route path={"/epic"} element={<EpicScreen />} />
            <Navigate to={"window.location.pathname" + "/kanban"}></Navigate>
        </Routes>
    </div>
}