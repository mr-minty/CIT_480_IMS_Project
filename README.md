
# Project Information

>[!CAUTION]
>Do not clone this repository into networked or cloud-synced folders (e.g., Google Drive, OneDrive). Pushing commits from such locations can corrupt the repository. Use a local folder instead.
## Requred tools

-Git: https://git-scm.com/downloads/win  
-Node.js: https://nodejs.org/en/download/

## Clone this repo to a local folder on your device

1. Install git, make sure it works by running `git -v`
2. Navigate to the directory you want to clone the repo inside
3. Run `git clone https://github.com/mr-minty/CIT_480_IMS_Project`
4. You should now see a dir called 'CIT_480_IMS_Project' in your current dir

## Run the Node.js app locally
1. Install Node.js, make sure it works by running `node -v`
2. Navigate to the CIT_480_IMS_Project directory
3. Run the command 'node .'
4. In a web browser, navigate to localhost:3000 and you should see "IMS Project is running 🚀"

## Contributing to the project:

### Helpful commands
>[!IMPORTANT]
>You must run `git pull` *before* making any changes to the project.

`git pull` or `git pull origin main`
- Ensures your local repo is up-to-date with the remote repo (this repo)

`git add .`
- Add all files youu've made changes to to the next commit

`git commit -m "my changes"`
- Make a local commit which adds your changed files to your local repo

`git push`
- Copy your local repo to the remote repo (this repo)

### Typical workflow

1. `cd "Project_Folder"`: Enter your local project folder/repo
2. `git pull`: Sync your local repo with the latest changes
3. Make any changes to files, Add files, assets, etc.
4. `git add .`: Add all the files I changed to the next commit
5. `git commit -m "my changes"`: Local commit, updating your Project folder with the changes, optionally comment what you changed/added
6. `git push`: This pushes the changes you've made 

