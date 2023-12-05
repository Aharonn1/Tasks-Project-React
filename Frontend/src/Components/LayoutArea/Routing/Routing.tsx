import { Navigate, Route, Routes } from "react-router-dom";
import Insert from "../../DataArea/Insert/Insert";
import DataList from "../../DataArea/DataList/DataList";
import PageNotFound from "../PageNotFound/PageNotFound";
import ArchivedList from "../../DataArea/ArchivedList/ArchivedList";
import KindTaskList from "../../DataArea/KindTaskList/KindTaskList";

function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/list" element={<DataList />} />
            <Route path="/archived" element={<ArchivedList />} />
            <Route path="/kindTasks" element={<KindTaskList />} />
            <Route path="/tasks/new" element={<Insert />} />
            <Route path="/" element={<Navigate to="/list" />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default Routing;
