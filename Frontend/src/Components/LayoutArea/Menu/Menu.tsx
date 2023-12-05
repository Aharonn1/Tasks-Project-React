import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">			
            <NavLink to="/list">List</NavLink>
            <NavLink to="/tasks/new">Add</NavLink>
            <NavLink to="/archived">Archived</NavLink>
            <NavLink to="/kindTasks">Kind Tasks</NavLink>

        </div>
    );
}

export default Menu;
