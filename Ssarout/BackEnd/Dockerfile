FROM openjdk:8-jdk
ENV JAVA_OPTS "-XX:+UnlockExperimentalVMOptions -XX:+UseCGroupMemoryLimitForHeap -XX:MaxRAMFraction=1 -XshowSettings:vm"
EXPOSE 8080
ARG JAR_FILE=build/libs/ssaout-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} ssaout.jar
ENTRYPOINT ["java","-jar","/ssaout.jar","&"]