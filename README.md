# chRat-Reloaded

chRat is an simplified Chat-App created with an fully java backend and react frontend.

You can send messages, images and maybe in future files.
Chat with others, send private messages etc...

# Features:

### chRat main-chat

Main Chat where you can chat with other users

### chRat private-chat:

send private messages to other users

### chRat profile:

`Profile picture` `email` `username` `password`

# Usefully links:

chRat deploy:
https://chrat.fly.dev

chRat project:
https://github.com/users/chris-yooo/projects/5

chRat issues:
https://github.com/chris-yooo/capstone-chrat-reloaded/issues

chRat pull requests:
https://github.com/chris-yooo/capstone-chrat-reloaded/pulls

# chRat CI:
The `builded frontend` moved `into backend` than the `build backend with frontend inside`
will be put into a `docker container` and `deployed` to `fly.io`

(Dockerfile included)

# chRat tech-stack:
`Java 19` `Spring` `Basic-Auth` `React` `React-Router` `Fly.io` `Docker` `MongoDB`
`Maven` `Git` `Github` `Github-Actions` `Github-Projects` `Github-Issues` `Github-Pull-Requests`

# Clone - Start - Installing:

### FRONTEND: (the proxy for local env. is already included)
`clone repo` -> `cd frontend` -> `npm i` -> `npm start`

### BACKEND:
`clone repo` -> start `BackendApplication.java`

### MISC:
You need to have a `mongoDB` database running on `localhost:27017` and
to deploy the app to fly.io you need to have a `fly.toml` that already included.
Therefore, you have to set the MONGO_DB_URI with command `flyctl secrets set MONGO_DB_URI= your_uri`