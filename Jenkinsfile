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


    stage('Run image') {
    	sh("docker stop knsakib-blog || true && docker rm knsakib-blog || true")
        sh("docker run -d --name knsakib-blog -p 3001:3001 jenkins-react-blog")
    }
}
