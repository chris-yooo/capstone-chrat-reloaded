# chRat-Reloaded

```
chRat is an simplified Chat-App created with an fully java backend and react frontend.

You can send messages, images and maybe in future files.
Chat with others, send private messages etc...
```

# `features:`

### chRat main-chat

Main Chat where you can chat with other users

### chRat private-chat:

send private messages to other users

### chRat profile:

`Profile picture` `email` `username` `password`

# `usefully links:`

chRat deploy:
https://chrat.fly.dev

chRat project:
https://github.com/users/chris-yooo/projects/5

chRat issues:
https://github.com/chris-yooo/capstone-chrat-reloaded/issues

chRat pull requests:
https://github.com/chris-yooo/capstone-chrat-reloaded/pulls

# `chRat CI:`

The `builded frontend` moved `into backend` than the `build backend with frontend inside`
will be put into a `docker container` and `deployed` to `fly.io`

(Dockerfile included)

# `chRat tech-stack:`

`IntelliJ v2022.2.3` `Java v19` `Spring` `Basic-Auth` `Create-React-App` `React` `React-Router` `Fly.io` `Docker` `MongoDB`
`Maven` `Git` `Github` `Github-Actions` `Github-Projects` `Github-Issues` `Github-Pull-Requests`

# `clone - installing - start:`

### FE:

`clone repo` => `cd frontend` => `npm i` => `npm start`

### BE:

`clone repo` => start the `BackendApplication.java`

### MISC:

You need a `mongoDB` database running on `localhost:27017` for local purposes.
For deploy you have to set the MONGO_DB_URI with command `flyctl secrets set MONGO_DB_URI= your_uri`
and the little file `fly.toml` that's already included.
