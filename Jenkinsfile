pipeline {
    agent {
        docker {
            image 'node'
            args '-u root'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
            set -x
            npm install --save-dev cross-env
            set +x

            set -x
            npm test
            
            }
        }
        stage('Deliver') {
            steps {
            set -x
            npm run build
            set +x

            set -x
            npm start &
            sleep 1
            echo $! > .pidfile
            set +x

            }
        }
    }
}
