pipeline {
    agent {
        docker {
            image 'node'
            args '-u root -p 3000:3000'
            
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh ("npm install")
            }
        }
        stage('Test') {
            steps {

            sh ("npm install --save-dev cross-env")

            sh ("npm test")

            }
        }
        stage('Deliver') {
            steps {

            
            sh ("npm start & sleep 1")
            sh ("echo \$! > .pidfile")


            }
        }
    }
}
