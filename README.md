
# Note Taker

The Note-Taker app is a web application designed for creating, organizing, and managing notes. It supports categorization, search, and a clean user interface for an intuitive user experience.

The application uses:

- React with Vite for the frontend

- Spring Boot for the backend

- MySQL as the database

This README provides a guide to setting up and running the application.


## Features

- Create, edit, and delete notes.

- Assign categories to notes for better organization.

- View and search notes efficiently.
## Tech Stack

**Frontend:**

- React 18.3.1

- Vite 6.0.1

- npm 10.9.0 (for package management) 

- shadcn (for style components)

**Backend:**

- Spring Boot 3.4.0

- Java 17 or later

- Maven 3.9.9(for build and dependency management)

**Database:**

- MySQL 8.0


## Requisites

Ensure the following are installed:

    1. React.js 18.3.1

    2. Java 17 or later

    3. MySQL 8.0 

    4. Maven 3.9.9
## Run Locally

You can run the webapp locally by running the bash file included in the project, this will ensure that you have the necessary dependecies, such as, MySQL, React.js and Java.

    1. Firstly you will need to download the project
    2. Then with the console go to the project folder and run the bash file

**If you are running in MacOS:**
    You should run the runMacOS.sh

    **Make sure you have everything needed installed**
    - MySQL

    brew install mysql

    - NPM

    brew install node@18
    
    - Java

    brew install openjdk@17

    - Maven

    brew install maven



**If you are running in Linux:**
    You should run the runLinux.sh

    **Make sure you have everything needed installed**
    - MySQL

    sudo apt install -y mysql-server

    - NPM

    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt install -y nodejs

    - Java

    sudo apt install -y openjdk-17-jdk

    - Maven

    sudo apt install -y maven


The bash file will create a local instance for a MySQL DB and run the SpringBoot Application for the BackEnd in the :8080 port, and then will run the vite project in the port :5173 for the FrontEnd
## Screenshots

![App Screenshot](https://i.imgur.com/SBhdzOq.jpeg)


## Troubleshooting

***Common Issues:***

Port in use:

    Ensure no other application is using ports 8080 or 5173.

Database connection error:

    Verify the MySQL server is running and credentials are correct.

Frontend not starting:

    Ensure all dependencies are installed with npm install.
## Development Process Overview 




**Backend Development**

I began by creating the REST API using Spring Boot. My first step was to establish the project structure by creating the necessary folders, classes, and interfaces. Then, I implemented the Note entity and developed methods in the service to handle data communication with a MySQL database. I proceeded to create endpoints for CRUD operations, including creating, updating, and deleting notes.

**Frontend Development**

After completing the backend, I started on the frontend by setting up the project with Vite and React.js. I created the project skeleton and installed Axios for API communication. This involved creating an API client and implementing the methods required to interact with the backend.

I also integrated ShadCN and Tailwind CSS for the design process and utilize shadcn components. Using these tools, I designed the notes page, which includes a search bar and a filtering feature for categories.

**Testing and Optimization**

Once the frontend was complete, I did a lot of testing to ensure that there is a smooth communication between the frontend and backend, addressing any errors that arose. After confirming that everything worked correctly, I moved on to creating a bash file. Although it was challenging, it was a valuable learning experience.


I hope you enjoyed the web app and found that it met your standards. Completing this project in less than three days was a fun challenge. Thank you for the opportunity!