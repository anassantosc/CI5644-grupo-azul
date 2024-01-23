docker rm $(docker ps -a | grep azulito | awk '{print $1}')
docker rmi $(docker images | grep 'azulito-back' -a | awk '{print $1}')
docker compose up