pipeline {
    agent any

    stages {
        stage('Health Check') {
            steps {
                echo "Hello WTF!!!!!"
            }
        }
        stage('Build') {
            steps {
                echo "Build project"
                sh "cd /var/lib/jenkins/jobs/wtf-fe/workspace/"
                sh "npm install --save --legacy-peer-deps"
                sh "npm run build"
            }
        }
        // stage('Move Build Folder to Project dir') {
        //     steps {
        //         echo "Move Build Folder to Project dir"
        //         sh "cd /home/sol/project/wtf-fe/"
        //         sh "rm -rf build"
        //         sh "mv /var/lib/jenkins/jobs/wtf-fe/workspace/build /home/sol/project/wtf-fe/"
        //     }
        // }
        // stage('Restart Nginx') {
        //     steps {
        //         echo "Restart Nginx"
        //         sh "sudo systemctl restart nginx"
        //     }
        // }
    }
}