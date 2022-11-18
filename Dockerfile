FROM openjdk:19

EXPOSE 8080

ADD backend/target/chrat-reloaded.jar chrat-reloaded.jar

CMD ["sh", "-c", "java -jar chrat-reloaded.jar --spring.data.mongodb.uri=$MONGO_DB_URI"]
