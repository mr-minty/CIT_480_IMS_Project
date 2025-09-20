
# Web Based Inventory Management System (IMS)

### Project Description
We are buiding a responsive, dynamic, web-based application to be used as an inventory management system by single location food/produce retailers.  
Project duration is 32 weeks.  

# Setting Up the Project

>[!CAUTION]
>Do not clone this repository into networked or cloud-synced folders (e.g., Google Drive, OneDrive). Pushing commits from such locations can corrupt the repository. Use a local folder instead.
## Required tools

- Git: https://git-scm.com/downloads/win  
- Node.js: https://nodejs.org/en/download/

## Clone this repo to a local folder on your device
1. Install git, make sure it works by running `git -v`
2. Navigate to the directory you want to clone the repo inside
3. Run `git clone https://github.com/mr-minty/CIT_480_IMS_Project`
4. You should now see a directory called 'CIT_480_IMS_Project' in your current directory

## Run the Node.js app locally
1. Install Node.js, make sure it works by running `node -v`
2. Navigate to the CIT_480_IMS_Project directory
3. Run the command `npm install`, this will install all necessary dependencies
4. Run the command `node .`
5. In a web browser, navigate to localhost:3000 and you should see "IMS Project is running 🚀"

## Configure the .env file
1. In your project folder do `copy .env.example .env` or create a blank text file titled '.env'
2. Fill out environment vars from the following sources:  
      -DB=[path of 'test.db' in your filesystem] (see next section)  
      -PORT=3000  
      -SESSION_SECRET=For testing you can put anything here, usually a long randomly generated string that you store somewhere

## Download the sqlite3 database file (temporary)
1. Download "test.db" from our Google Drive project folder
2. Choose a path for test.db and copy that path into your .env file


# Contributing to the project:

### Helpful commands
>[!IMPORTANT]
>You must run `git pull` *before* making any changes to the project.

`git pull` or `git pull origin main`:  
Ensures your local repo is up-to-date with the remote repo (this repo)

`git add .`:  
Add all files you've made changes to to the next commit

`git commit -m "my changes"`:  
Create a local commit that records your changes. Optionally, replace "my changes" with a short description of what you updated

`git push`:  
Copy your local repo to the remote repo (this repo)

### Typical workflow

1. `cd "Project_Folder"`: Enter your local project folder/repo
2. `git pull`: Sync your local repo with the latest changes
3. Make any changes to files, Add files, assets, etc.
4. `git add .`: Add all the files you changed to the next commit
5. `git commit -m "my changes"`: Local commit, updating your Project folder with the changes, optionally comment what you changed/added
6. `git push`: This pushes the changes you've made 

### Web app file structure and folder descriptions

Being specific, we're using the following tools:  
- Node.js with Express framework as our backend.
- Embedded Javascript (EJS) for dynamic html pages
- Bootstrap + CSS for styling components

**File Structure and Folder Descriptions**
```
ims-app/
  src/                - Main application source code
    routes/           - Express route handlers
    models/           - Database models (e.g., Users, Items, Orders)
    controllers/      - Business logic between routes and models
    middleware/       - Custom Express middleware
    utils/            - Helper functions and utilities
  views/              - EJS templates for server-side rendering
  public/             - Static files (images, CSS, client-side JS)
  tests/              - Automated tests
  server.js           - Application entry point, handles site routing
  package.json        - Project metadata and dependencies
  README.md           - Documentation
```
