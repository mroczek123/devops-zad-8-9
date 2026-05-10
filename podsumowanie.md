# Komendy:

Sieć:
- docker network create -d bridge front-net
- docker network create -d bridge back-net

Wolumen:
- docker volume create items-data

Rejestr:
- docker run -d -p 5000:5000 --name registry registry:3

Backend:
- cd backend
- docker build --build-arg IMAGE_VERSION=v1 -t localhost:5000/backend:latest .
- docker push localhost:5000/backend:latest
- docker run --volume=items-data:/data --network=back-net --name backend1 -e INSTANCE_ID=1 -d localhost:5000/backend:latest
- docker run --volume=items-data:/data --network=back-net --name backend2 -e INSTANCE_ID=2 -d localhost:5000/backend:latest
- docker run --volume=items-data:/data --network=back-net --name backend3 -e INSTANCE_ID=3 -d localhost:5000/backend:latest

Test izolacji front-net
- docker run --network=front-net alpine:latest ping -c 2 backend1:3000

Nginx:
- cd nginx
- docker build --build-arg NGINX_VERSION="1.29" -t localhost:5000/proxy:latest .
- docker push localhost:5000/proxy:latest
- docker run --network=front-net --network=back-net -p "80:80" --name proxy -d localhost:5000/proxy:latest
