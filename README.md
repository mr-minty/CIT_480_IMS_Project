
# Web Based Inventory Management System (IMS)

### Project Description
- We are buiding a responsive, dynamic, web-based application to be used as an inventory management system by single location food/produce retailers.  
- Project duration is 32 weeks.  

# Setting Up the Project

>[!CAUTION]
>Do not clone this repository into networked or cloud-synced folders (e.g., Google Drive, OneDrive). Pushing commits from such locations can corrupt the repository. Use a local folder instead.
## Required tools

- Git: https://git-scm.com/downloads/win  
- Node.js: https://nodejs.org/en/download/
- MariaDB/MySQL: https://mariadb.org/download/?t=mariadb&p=mariadb&r=12.0.2&os=windows&cpu=x86_64&pkg=msi&mirror=xtom_fre

## Set Up MySQL Database
1. Install MariaDB/MySQL server (You will create the password for the default "root" account here)
2. Download 'IMS_Database_Schema.sql"
3. Run the command `mysql -u root -p < [PATH_TO_"IMS_Database_Schema.sql"]`
4. Enter your password
5. This should have created the empty database 'ims_test'
6. You can interact with 'ims_test' by running `mysql -u root -p ims_test` and your OS password OR `mysql -u ims_user -p ims_test` with the password: 'ims_pass'

## Clone this repo to a local folder on your device
1. Install git, make sure it works by running `git -v`
2. Navigate to the directory you want to clone the repo inside
3. Run `git clone https://github.com/mr-minty/CIT_480_IMS_Project`
4. You should now see a directory called 'CIT_480_IMS_Project' in your current directory
5. Navigate to the CIT_480_IMS_Project directory, all instructions moving forward will be run from inside this directory

## Configure the .env file
1. In your project folder do `copy .env.example .env` or create a blank text file titled '.env'
2. The default environment variables in .env.example will work. You do not need to change the password.

## Run the Node.js app locally
1. Install Node.js, make sure it works by running `node -v`
2. Run the command `npm install`, this will install all necessary dependencies
3. Run the command `node .`
4. In a web browser, navigate to localhost:3000 and you should see "IMS Project is running 🚀"

# Contributing to the project:

### Helpful commands
>[!IMPORTANT]
>You must run `git pull` ***before*** running `git push` to avoid conflicts

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
2. Make any changes to files, Add files, assets, etc.
3. `git add .`: Add all the files you changed to the next commit
4. `git commit -m "my changes"`: Local commit, updating your Project folder with the changes, optionally comment what you changed/added
5. `git pull`: Sync your local repo with the latest changes
6. `git push`: This pushes the changes you've made 

### Web app file structure and folder descriptions

Being specific, we're using the following tools:  
- Node.js with Express framework as our backend.
- Embedded Javascript (EJS) for dynamic html pages
- Bootstrap + CSS for styling components

**File Structure and Folder Descriptions**
```
CIT_480_IMS_Project/
  src/                - Additional application source code, helpers, utilities
  routes/             - Express route handlers
  controllers/        - Business logic between routes and models
  middleware/         - Custom Express middleware
  db/                 - Database connection and models
  services/           - External services or API integrations
  views/              - EJS templates for server-side rendering
  public/             - Static files (images, CSS, client-side JS)
  server.js           - Application entry point, handles site routing
  package.json        - Project metadata and dependencies
  package-lock.json   - Locked dependency versions
  README.md           - Documentation

```
