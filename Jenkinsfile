pipeline {
    agent any

    stages {

        stage('Clone') {
            steps {
                git 'https://github.com/Gurraiah123/registration-app.git'
            }
        }

        stage('Build Docker') {
            steps {
                sh 'docker build -t reg-app .'
            }
        }

        stage('Run Container') {
            steps {
                sh 'docker stop app || true'
                sh 'docker rm app || true'
                sh 'docker run -d -p 3000:3000 --name app reg-app'
            }
        }

        stage('Deploy to AWS S3') {
            steps {
                sh 'aws s3 cp frontend/index.html s3://registration-app-1/'
            }
        }
    }
}
