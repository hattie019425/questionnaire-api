#sudo mkdir data
docker kill mongo
docker rm mongo
sudo docker run --name mongo -v data:/data/db -p 27017:27017 -d mongo:4
