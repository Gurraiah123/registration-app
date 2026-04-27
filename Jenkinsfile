pipeline {
    agent { label 'agent-node' }

    environment {
        BACKEND_DIR = 'backend'
        FRONTEND_DIR = 'frontend'
        EC2_IP = '18.195.183.15'
    }

    stages {

        stage('Clone Code') {
            steps {
                git 'https://github.com/your-repo.git'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir(BACKEND_DIR) {
                    sh 'npm install'
                }
            }
        }

        stage('Test Backend') {
            steps {
                dir(BACKEND_DIR) {
                    sh 'echo "No tests yet"'
                }
            }
        }

        stage('Deploy Backend') {
            steps {
                dir(BACKEND_DIR) {
                    sh """
                    ssh ec2-user@${EC2_IP} '
                        pkill node || true
                        cd /home/ec2-user/backend
                        git pull
                        npm install
                        nohup node app.js > app.log 2>&1 &
                    '
                    """
                }
            }
        }

        stage('Deploy Frontend to S3') {
            steps {
                dir(FRONTEND_DIR) {
                    sh """
                    aws s3 sync . s3://your-bucket-name --delete
                    """
                }
            }
        }
    }
}
