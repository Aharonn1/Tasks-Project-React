class AppConfig {

    public port = 4004;
    public mysqlHost = "localhost";
    public mysqlUser = "root";
    public mysqlPassword = "";
    public mysqlDatabase = "taskdatabase";
    public vacationImagesAddress = `http://localhost:${this.port}/api/vacations/images/`;

}

const appConfig = new AppConfig()

export default appConfig;