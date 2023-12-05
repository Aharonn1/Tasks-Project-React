import { useForm } from "react-hook-form";
import kindTask from "../../../Models/KindTaskModel";
import TaskModel from "../../../Models/TaskModel";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dataService from "../../../Services/DataService";
import notify from "../../../Utils/Notify";
import "./Insert.css";

function Insert(): JSX.Element {

    const [kindTask, setKindTask] = useState<kindTask[]>([]);
    const { register, handleSubmit } = useForm<TaskModel>();
    const navigate = useNavigate();

    useEffect(() => {
        dataService.getAllTasksByKindTask()
            .then(dbKindTask => setKindTask(dbKindTask))
            .catch(err => notify.error(err.message));
    }, []);

    async function send(task: TaskModel) {
        await dataService.addTask(task);
        notify.success("Task has been added");
        navigate("/list");
    }

    return (
        <div className="Insert">
            <h2>Add Task</h2>
            <form onSubmit={handleSubmit(send)}>
                <label>Kind Task: </label>
                <select defaultValue="" {...register("kindTaskId")} required>
                    <option disabled value="">Select Kind Task</option>
                    {kindTask.map(t => <option key={t.kindTaskId} value={t.kindTaskId}>{t.taskName}</option>)}
                </select>

                <label>Task Name: </label>
                <input type="text" {...register("name")} required minLength={2} maxLength={50} />

                <label>Description: </label>
                <input type="text" {...register("description")} required minLength={2} maxLength={200} />

                <label>Start Date: </label>
                <input type="date" {...register("startDate")} required />

                <label>End Date: </label>
                <input type="date" {...register("endDate")} />

                <button>Add</button>
            </form>
        </div>
    );
}
export default Insert;