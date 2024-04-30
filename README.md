# Renewable power forecasts (for school of maths and stats)

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
11. Once this is done, run start.bat by double clicking on it (THIS WILL REQUIRE A LOT OF TIME TO EXECUTE THE FIRST TIME IT IS RUN, AS IT PULLS 2 YEARS WORTH OF DATA FROM THE APIs).
12. A new webpage will automatically open up. Please note that if this is the first time running the web app, it will take some time for the necessary data to be pulled from the APIs and the database to be populated, at which point you will need to refresh the page.
13. To shut down the server, simply close the two command prompt terminal windows. To run the server again, simply run start.bat.
14. (OPTIONAL) To be able to view this data, you must be a superuser in order to access the admin panel. Run create_super_user.bat. Enter a username, an email(this can be left blank), and a password of your choice. Make note of these details.
15. (OPTIONAL) Navigate to http://127.0.0.1:8000/admin and enter the username and password created above to view the admin page and data stored in the database.
16. (Optional) To update the data in the dataset, repeat steps 4 and 6. In the anaconda prompt enter 'cd server/' and 'python Population_script.py'
