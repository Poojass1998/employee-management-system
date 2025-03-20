pipeline {
  agent any
  environment {
    AWS_ACCESS_KEY_ID     = credentials('aws-access-key')
    AWS_SECRET_ACCESS_KEY = credentials('aws-secret-key')
  }
  stages {
    stage('Terraform Apply') {
      steps {
        sh 'terraform init'
        sh 'terraform apply -auto-approve'
      }
    }
    stage('Deploy Backend') {
      steps {
        sh 'cd backend && npm install'
        sh 'cd backend && node server.js &'
      }
    }
  }
}
