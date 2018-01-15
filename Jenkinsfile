node {


    stage('Clone repository') {
        /* Let's make sure we have the repository cloned to our workspace */

        checkout scm
    }

    stage('Build image') {
        /* This builds the actual image; synonymous to
         * docker build on the command line */

        sh("docker build -t jenkins-react-blog .")
    }

    stage('Test image') {
        /* Ideally, we would run a test framework against our image.
         * For this example, we're using a Volkswagen-type approach ;-) */

            sh("npm test")
            sh 'echo "Tests passed"'

    }

    stage('Run image') {
        sh("docker run --name knsakib-blog -p 3000:3000 jenkins-react-blog")
    }
}
