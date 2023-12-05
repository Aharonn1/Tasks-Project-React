import { useState, useEffect } from "react";
import TaskModel from "../../../Models/TaskModel";
import dataService from "../../../Services/DataService";
import DataCard from "../DataCard/DataCard";
import { tasksStore } from "../../../Redux/taskState";
import Pagination from "../Pagination/Pagination";
import "./DataList.css";

function DataList(): JSX.Element {

    const [tasks, setTask] = useState<TaskModel[]>([]);
    const [text, setText] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(3);

    useEffect(() => {
        dataService.getAllTasksAreNotArchived()
            .then(task => setTask(task))
            .catch(err => console.log(err))
        tasksStore.subscribe(() => {
            const dup = [...tasksStore.getState().tasks.filter((task: TaskModel) => (!task.isArchived && !dataService.isMoreThanWeekFromNow(task)))];
            setTask(dup);
        })
    }, [])

    async function deleteClickedTask(taskId: number) {
        await dataService.deleteTask(taskId);
        const duplicatedMovies = [...tasks];
        const index = duplicatedMovies.findIndex(t => t.taskId === taskId);
        duplicatedMovies.splice(index, 1);
        setTask(duplicatedMovies);
    }

    const search = () => {
        const findTasks =
            tasks && tasks?.length > 0 ? tasks?.filter((s) => s?.name === text) : undefined
        setTask(findTasks)
    }

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPost = tasks.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <div className="DataList box">
            <div className="row row-cols-1 row-cols-md-6 g-4 wrapper">
                <div className="input_wrapper">
                    <input type="text" placeholder="search task" value={text}
                        onChange={(e) => {setText(e.target.value);}} />
                    <button disabled={!text} onClick={search}>search</button>
                    {tasks && tasks?.length === 0 && (
                        <div className="notFound">The task is not found</div>
                    )}
                </div>
                <br />
                {currentPost.map((item) => <DataCard key={item.taskId} task={item} deleteMe={deleteClickedTask} />)}
                <br />
                {<Pagination totalPost={tasks.length} postPerPage={postPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
            </div>
        </div>
    );
}
export default DataList