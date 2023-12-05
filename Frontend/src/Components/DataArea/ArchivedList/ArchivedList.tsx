import { useEffect, useState } from "react";
import TaskModel from "../../../Models/TaskModel";
import dataService from "../../../Services/DataService";
import { tasksStore } from "../../../Redux/taskState";
import DataCard from "../DataCard/DataCard";
import "./ArchivedList.css";

function ArchivedList(): JSX.Element {

    const [tasks, setTasks] = useState<TaskModel[]>([]);

    useEffect(() => {
        dataService.getAllArchivedTasks()
            .then(task => setTasks(task))
            .catch(err => console.log(err))
        tasksStore.subscribe(() => {
            const dup = [...tasksStore.getState().tasks.filter((task: TaskModel) => (task.isArchived || dataService.isMoreThanWeekFromNow(task)))];
            setTasks(dup);
        });
    }, [])

    async function deleteClickedTask(taskId: number) {
        await dataService.deleteTask(taskId);
        const duplicatedMovies = [...tasks];
        const index = duplicatedMovies.findIndex(t => t.taskId === taskId);
        duplicatedMovies.splice(index, 1);
        setTasks(duplicatedMovies);
    }

    return (
        <div className="ArchivedList box">
            <div className="row row-cols-1 row-cols-md-6 g-4 wrapper">
                {tasks.map((item) => <DataCard key={item.taskId} task={item} deleteMe={deleteClickedTask} />)}
            </div>
        </div>
    );
}
export default ArchivedList;