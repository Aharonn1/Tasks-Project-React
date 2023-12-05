import { ChangeEvent, useEffect, useState } from "react";
import dataService from "../../../Services/DataService";
import kindTask from "../../../Models/KindTaskModel";
import TaskModel from "../../../Models/TaskModel";
import DataCard from "../DataCard/DataCard";
import "./KindTaskList.css";

function KindTaskList(): JSX.Element {

    const [kindTasks, setKindTask] = useState<kindTask[]>([]);
    const [tasks, setTask] = useState<TaskModel[]>([]);

    useEffect(() => {
        dataService.getAllTasksByKindTask()
            .then(task => setKindTask(task))
            .catch(err => console.log(err))
    }, [])

    async function name(args: ChangeEvent<HTMLSelectElement>) {
            const kindTaskId = +args.target.value;
            const dbTheater = await dataService.getTaskByKindTask(kindTaskId)
            setTask(dbTheater)
    }

    async function deleteClickedTask(taskId: number) {
        await dataService.deleteTask(taskId);
        const duplicatedMovies = [...tasks];
        const index = duplicatedMovies.findIndex(t => t.taskId === taskId);
        duplicatedMovies.splice(index, 1);
        setTask(duplicatedMovies);
    }

    return (
        <div className="KindTaskList box">
            <div className="row row-cols-1 row-cols-md-6 g-4 wrapper">
                <h1>Choose your task </h1>
                <select defaultValue="" onChange={name}>
                    {<option disabled value="">select kind task</option>}
                    {kindTasks.map(t => <option key={t.kindTaskId} value={t.kindTaskId}>{t.taskName}</option>)}
                </select>
                <br />
                <h3> Amount Tasks =  {(tasks.filter(item => item.taskCount)).length} </h3>
                <h3> Finished Tasks =  {(tasks.filter(item => item.isFinish === 1)).length } </h3>
                {tasks.map((item) => <DataCard key={item.taskId} task={item} deleteMe={deleteClickedTask} />)}
            </div>
        </div>
    );
}
export default KindTaskList;