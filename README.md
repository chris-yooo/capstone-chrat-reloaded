# chRat-Reloaded

```
chRat is an simplified chat-app created with an fully java backend and react frontend.

You can send messages and maybe in future images and files.
Chat with others, send private messages etc...
```

# `features:`

### chRat main-chat

Main Chat where you can chat with other users

### chRat private-chat: [Future-Feature]

send private messages to other users

### chRat profile:

`Profile picture` `username` `password` `firstname` `lastname` `email`

# `usefully links:`

chRat deploy:
http://ec2-54-175-44-48.compute-1.amazonaws.com `or` http://54.175.44.48

chRat project:
https://github.com/users/chris-yooo/projects/5

chRat issues:
https://github.com/chris-yooo/capstone-chrat-reloaded/issues

chRat pull requests:
https://github.com/chris-yooo/capstone-chrat-reloaded/pulls

# `chRat CI:`

The `builded frontend` moved `into backend` than the `build backend/frontend`
will be put uploaded to tomcat 9.0.70 as an .war file to http://54.175.44.48

# `chRat tech-stack:`

`IntelliJ` `Java v19` `Spring` `Basic-Auth` `React` `Create-React-App` `React-Router` `AWS-EC2` `Tomcat v9.0.70` 
`MongoDB` `Maven` `Git` `Github` `Github-Actions` `Github-Projects` `Github-Issues` `Github-Pull-Requests` `War-file`

# `clone - installing - start:`

### FE:

`clone repo` => `cd frontend` => `npm i` => `npm start`

### BE:

`clone repo` => start the `BackendApplication.java`

### MISC:

You need a `mongoDB` database running on `localhost:27017` for local purposes.
For deploy you have to set the MONGODB_URI as environment var within the linux shell
with following command `export MONGODB_URI="mongodb://[USER]:[PW]@[SERVER]:[PORT]/[DBNAME]"`
