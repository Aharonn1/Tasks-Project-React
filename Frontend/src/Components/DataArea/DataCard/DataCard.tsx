import TaskModel from "../../../Models/TaskModel";
import dataService from "../../../Services/DataService";
import notify from "../../../Utils/Notify";
import "./DataCard.css";

interface TaskCardProps {
    task: TaskModel,
    deleteMe: (taskId: number) => Promise<void>
}

function DataCard(props: TaskCardProps): JSX.Element {

    async function deleteMe() {
        if (!window.confirm("Are you sure?")) return;
        await dataService.deleteTask(props.task.taskId);
        notify.success("Task has been deleted");
    }

    async function updateMe(task: TaskModel) {
        props.task.isFinish = props.task.isFinish ? 0 : 1;
        await dataService.updateTask(props.task)
    }

    async function updateArchived(task: TaskModel) {
        props.task.isArchived = props.task.isArchived ? 0 : 1;
        await dataService.updateTaskArchived(props.task)
    }

    return (
        <div className="DataCard Box">
            <span>  task: {props.task.name} </span>
            <br />
            <span>  kind task: {props.task.kindTaskId} </span>
            <br />
            <span>  description: {props.task.description} </span>
            <br />
            <span>  start date: {props.task.startDate} </span>
            <br />
            <span> end date: {props.task.endDate} </span>
            <br />
            <input type="checkbox" checked={props.task.isFinish === 1} /> The task is finished
            :<button onClick={() => updateMe(props.task)}>Finish</button>
            <br />
             <button onClick={() => updateArchived(props.task)}>Archived</button>
            <br />
            <button onClick={deleteMe}>❌</button>
        </div >
    );
}
export default DataCard;