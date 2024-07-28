#!/bin/bash

# Function to run a command and display its error if it fails
run_command() {
  "$@" > /dev/null 2>&1
  if [ $? -ne 0 ]; then
    echo "Error executing: $@" >&2
    "$@"
  fi
}

# Login to Docker ECR Registry
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 008757489742.dkr.ecr.us-east-1.amazonaws.com

# Build Latest Images
docker build -t fitnessflowai-backend:latest ./server
docker build -t fitnessflowai-frontend:latest ./client
docker bui

# Tag and push your images
docker tag fitnessflowai-backend:latest 008757489742.dkr.ecr.us-east-1.amazonaws.com/fitnessflowai-backend:latest
docker tag fitnessflowai-frontend:latest 008757489742.dkr.ecr.us-east-1.amazonaws.com/fitnessflowai-frontend:latest

docker push 008757489742.dkr.ecr.us-east-1.amazonaws.com/fitnessflowai-backend:latest
docker push 008757489742.dkr.ecr.us-east-1.amazonaws.com/fitnessflowai-frontend:latest

# Register Task Definition
run_command aws ecs register-task-definition --cli-input-json file://aws_related/backend-task-def.json
run_command aws ecs register-task-definition --cli-input-json file://aws_related/frontend-task-def.json
run_command aws ecs register-task-definition --cli-input-json file://aws_related/mongo-task-def.json

# Create Service for Mongo
#aws ecs create-service --cluster fitnessflowai-ecs --cli-input-json file://aws_related/service-connect-mongo.json

# Update Task Definition
run_command aws ecs update-service --cluster fitnessflowai-ecs --service fitnessflowai-backendservice --task-definition backend
run_command aws ecs update-service --cluster fitnessflowai-ecs --service fitnessflowai-frontendservice --task-definition frontend
run_command aws ecs update-service --cluster fitnessflowai-ecs --service mongo-service --task-definition mongo

