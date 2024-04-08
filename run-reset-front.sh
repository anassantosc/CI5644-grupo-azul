docker compose down
docker rmi $(docker images | grep 'azulito-front' -a | awk '{print $1}')
docker compose up
