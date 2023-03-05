# Project 1: Shared shopping list

# Note before run the project:

I have been working with the project on MacOS so expect some error when running
this project on other os. When that happen you can try modified the first line
of the Dockerfile (FROM lukechannings/deno:v1.26.2 -> FROM
denoland/deno:alpine-1.26.2) or try to study the code without launching it.

# 1. How to run the project

Currently, I cannot deploy my web using fly.io due to some error with the credit
card requirement so there is no online location to check this project. Reviewer
have to check the project by running it in locally.

Way to run the project: launching the terminal in this project and using the
command `docker compose up`

# 2. How to access the database

The database can be accessed by the command below

`docker exec -it database-p1-c21fc485-2c79-4e3e-82ae-1340aed5ab81 psql -U username database`

this opens up psql console, where you can use the SQL command/

# 3. How to run the Playwright test

I have writed 5 meaning full test in the `tests` folder inside e2e-playwright
folder. You can launch the test with the command below

`docker-compose run --entrypoint=npx e2e-playwright playwright test && docker-compose rm -sf`

Please take note that you must **delete all the data** in database before
running the test to ensure the test work perfectly.

# 4. Expaination of my design.

The project just like other version of the example Application so I will just
explain some differences in my build.

I have summary all the web meaningful address path inside the file called
"enumeration.js". You can start with this for easier overview. The web has 3
pages which includes:

- Main Page ( for statistic and title of the web )
- Shoppping lists ( mainly used for managing lists )
- Individual shopping list ( mainly used for managing items in specific list )

Each page has a link to the one other page. I also add a title "name" when
listing the lists and items for easier locate with my playwright test.

I also summary all the service involve with managing lists in one file name
"listsController.js" and managing items with "itemController.js". You can also
look at the services for lists and items to see the sql command.

# That is all. Hope you have a nice day coding!
