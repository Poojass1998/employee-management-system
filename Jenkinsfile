pipeline {
    agent any

    environment {
        AWS_ACCESS_KEY_ID     = credentials('Access-key-ID')
        AWS_SECRET_ACCESS_KEY = credentials('Secret-access-key')
    }

    stages {
        stage('Terraform Init & Apply') {
            steps {
                sh '''
                    cd terraform
                    terraform fmt
                    terraform validate
                    terraform init -input=false
                    terraform plan
                    terraform apply -auto-approve
                '''
            }
        }

        stage('Deploy Backend') {
            steps {
                sh '''
                    cd backend
                    npm install
                    nohup node server.js > server.log 2>&1 &
                '''
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution completed.'
        }
        failure {
            echo 'Pipeline failed. Check logs.'
        }
    }
}
