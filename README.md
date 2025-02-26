# Tech Blog

  ## Table of Contents
  * [Description](#description)
  * [Demonstration Video](#demonstration-video)
  * [Installation Instructions](#installation)
  * [Usage Instructions](#usage)
  * [Screenshots of deployed App](#screenshots)
  * [Contribution Information](#contributions)
  * [Questions](#questions)
  
  ## Description: 
  This app was originally submitted as the MVC code Challenge for the Rutgers Web Development Bootcamp. https://github.com/zmuda44/Tech-blog-site
  
  Viewers can view all posts made by everyone on the homescreen and logged in users can comment on individual posts. Users can also create an account and login to make posts of their own and edit or delete posts.

  Improvements since class submission: Added error handling to login and signup form. Specific alerts given if no Username is found, or if Username is found but Password is incorrect on login. Alerts will also be given is Username is already taken upon Signup, or if Password doesn't meet character length requirement.

  ## Demonstration-video:
  need new deployed link (link to vid)

  ## Installation: 
  First, clone this repository to your computer using 'git@github.com:zmuda44/CMS-blog-site.git'. cd into the folder containing the server.js. Run 'npm i' from the command line to create your node modules. A package.json will be cloned with all proper dependencies and npm i will install all modules from these dependencies. You will also need to create a .env file with your database name, database user name and database passwords in the main directory. Search dotenv in your web browser of choice for more information. cd into the folder containing the schema.sql and log into your Postgres account. You will first need to download Postgres and get a database server up and running. Run '\i schema' from the postgres command line to create your database on the server. Exit out of the Postgres command by typing '\q'. You will once again cd into the folder containing server.js and start your server using 'npm run start'. This will populate the columns in the database you created from Sequelize. Stop your server, and run 'npm run seed' from the command line. The package.json file will come with the scripts and dependencies to run these commands, and the 'npm i' at the beginning will download the modules. Once you have seeded the database, you are ready to start using the app.

  ## Usage: 
  Once you have installed the modules, created the database and tables and seeded the data, you are ready to start using. Run 'npm run start' from the folder that contains the server.js file to start your server. If you seeded the db, you should posts on the homepage already and you are free to comment on a post. If you have not created an account, your comment will be anonymous. Sign up to make your posts and show your username on comments. You will need to log back in after a specified amount of time.

  ## Screenshots:
  ![alt text](<tech blog 1.png>)
  ![alt text](<tech blog 2.png>)

  ## Contributions: 
  Contributions to this app are welcome. Simply fork the repository to your github account by pressing the fork button above.  This will create a repository on your own github which you can clone and push to like any other repository. If you wish for your changes or additions to be part of this app, click on the 'Pull requests' button towards the top of the forked repository in your github account. Follow the prompts for a pull request and if approved, your code will be accepted into this app's repository.

  ## Questions: 
  Github: [github.com/zmuda44](https://github.com/zmuda44) Email: gregbailey617@gmail.com


 