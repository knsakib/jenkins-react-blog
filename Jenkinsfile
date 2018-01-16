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

            sh ("npm run build")



            sh ("npm start & sleep 1")
            sh ("echo \$! > .pidfile")


            }
        }
    }
}
