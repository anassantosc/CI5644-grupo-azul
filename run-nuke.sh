# Creditos a wuasakaka-explosiva por la ayuda <3

docker compose down
docker rm $(docker ps -a | grep azulito | awk '{print $1}')
docker rmi $(docker images | grep 'azulito-front' -a | awk '{print $1}')
docker rmi $(docker images | grep 'azulito-back' -a | awk '{print $1}')
docker compose up