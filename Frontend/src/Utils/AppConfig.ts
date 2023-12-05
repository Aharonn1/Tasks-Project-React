class AppConfig {
    public tasksUrl = "http://localhost:4004/api/tasks/";
    public kindTasksUrl = "http://localhost:4004/api/kindTask/";
    public taskByTaskUrl = "http://localhost:4004/api/task-per-tasks/";
    public finishUrl = "http://localhost:4004/api/tasks/finish/";     
    public archivedUrl = "http://localhost:4004/api/tasks/archived/";     

}

const appConfig = new AppConfig();

export default appConfig;
