# School of Maths & Stats - Renewable power forecasts

## Full Title

Renewable power forecasts for public information and research - supporting decarbonisation reduction by connecting
open data sources

## Project Outline

This software should retrieve historic and live data from weather forecast providers, the Great Britain electricity transmission system operator (National Grid ESO) and potentially others. This data should be processed, combined, and visualised to produce regional forecasts of wind and solar power production to enable electricity consumers to plan their usage to minimise carbon emissions and potentially save money. Visualisation should be accessible, e.g. via web browser or mobile app. The data gathered should be stored to allow past event to be analysed and for development of additional capabilities in the future.

### Plans to sustain project

If successful, Dr. Browell would hope to continue to operate and develop the system with the support of students and staff in my group

## Setup and Run Guide

1. Download and Install Anaconda from https://www.anaconda.com/products/distribution , making sure that python is installed with it.
2. Download and Install Node.js from https://nodejs.org/en/download/ .
3. Create a folder for the project on your Desktop.
4. Open an Anaconda terminal(you can do this by searching in Windows) and run 'cd Desktop/projectfolder' to navigate to the project folder, replacing projectfolder with the name of the folder you created.
5. Create a virtual environment with the command 'conda create --name Power'.
6. Run 'conda activate Power' to activate your new virtual environment.
7. Run 'conda install -c anaconda git' to install git, entering 'y' to Proceed when prompted.
8. Navigate to the Gitlab page for the main project on your browser.
9. Click on the clone button at the top right, and copy the link under 'Clone with HTTPS'.
10. Run 'git clone "link" ' in the terminal, replacing link with the link you copied from the project page.
<<<<<<< HEAD
11. Once that is done, run 'pip install -r requirements.txt' to install the required python packages.
12. Open a Windows Powershell terminal(you can once again do this by searching on Windows) and navigate to the project folder using 'cd Desktop/projectfolder/sh33-main' once again replacing projectfolder with the name of the folder you created.
13. Run 'npm install --legacy-peer-deps' to install the required front-end packages.
14. Return to the Anaconda terminal, and run 'cd server'.
15. Run 'python manage.py makemigrations backend_db' and 'python manage.py migrate' to setup the database.
16. The next command is a script to populate the database with various data. Run 'python Population_script.py'.This will take a while as a lot of data must be inserted into the database.
17. To be able to view this data, you must be a superuser in order to access the admin panel. Run 'python manage.py createsuperuser'. Enter a username of your choice, an email(this can be left blank), and a password. Make note of these details.
18. You can now run the website. First, run 'python manage.py runserver'
19. Return to the powershell terminal and run 'npm start'. This should redirect you to a new tab in your browser that loads the website.
20. Only steps 18 and 19 need to be repeated to run the website every time you wish to run it, although make sure you are in the right directories in the terminals(/server for anaconda terminal and /sh33-main for powershell).
21. To access the admin panel and view the data, paste the following link into your browser 'http://127.0.0.1:8000/admin/' and login with the superuser account you made earlier.
=======
11. Once this is done, run start.bat by double clicking on it (THIS WILL REQUIRE A LOT OF TIME TO EXECUTE THE FIRST TIME IT IS RUN, AS IT PULLS 2 YEARS WORTH OF DATA FROM THE APIs).
12. A new webpage will automatically open up. Please note that if this is the first time running the web app, it will take some time for the necessary data to be pulled from the APIs and the database to be populated, at which point you will need to refresh the page.
13. To shut down the server, simply close the two command prompt terminal windows. To run the server again, simply run start.bat.
14. (OPTIONAL) To be able to view this data, you must be a superuser in order to access the admin panel. Run create_super_user.bat. Enter a username, an email(this can be left blank), and a password of your choice. Make note of these details.
15. (OPTIONAL) Navigate to http://127.0.0.1:8000/admin and enter the username and password created above to view the admin page and data stored in the database.
16. (Optional) To update the data in the dataset, repeat steps 4 and 6. In the anaconda prompt enter 'cd server/' and 'python Population_script.py'
>>>>>>> dev-branch
