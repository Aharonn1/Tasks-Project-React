class TaskModel {

    taskId: number;
    kindTaskId: number;
    taskCount:number;
    name: string;
    description: string;
    isFinish: number;
    isArchived: number;
    startDate: string;
    endDate: string;

     constructor(task: TaskModel) {
        this.taskId = task.taskId;
        this.name = task.name;
        this.description = task.description;
        this.kindTaskId = task.kindTaskId;
        this.taskCount = task.taskCount
        this.isFinish = task.isFinish;
        this.isArchived = task.isArchived;
        this.startDate = task.startDate;
        this.endDate = task.endDate;
    }
}

export default TaskModel