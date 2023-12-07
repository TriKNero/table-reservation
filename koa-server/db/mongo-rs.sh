#!/usr/bin/env bash

[ -f rs-key ] || openssl rand -base64 756 > rs-key

chmod 0400 rs-key


docker compose up -d

sleep 5

docker exec -i mongodb mongosh -u root -p example --authenticationDatabase admin --eval 'rs.initiate()'

