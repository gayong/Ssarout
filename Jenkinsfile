// Jenkinsfile (Declarative pipeline)
pipeline {
    agent any
    stages {
        stage('Giblab') {
            steps {
                git branch: 'backend', url: 'https://lab.ssafy.com/s09-webmobile2-sub2/S09P12E203.git'
            }
        }
        stage('GradleBuild') {
            steps {
                dir('/Ssarout/BackEnd') {
                    sh "./gradlew clean build"
                }
            }
        }
        stage('Build'){
            steps {
                dir('/Ssarout/BackEnd') {
                    sh "docker build --build-arg DEPENDENCY=build/dependency -t ssarout/backend ."
                }
            }
        }
        stage('Deploy') {
            steps {
                sh "docker ps -q --filter name=backend | grep -q . && docker stop backend && docker rm backend"
                sh "docker run -d --name backend -p 8080:8080 "
            }
        }
        stage('Finish') {
            steps {
                sh "docker images -qf dangling=true | xargs -I{} docker rmi {}"
            }
        }
    }
}
