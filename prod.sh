#!/bin/bash
(docker network inspect screenshot-network >/dev/null 2>&1 || docker network create screenshot-network) &
docker compose --file docker-compose.prod.yml up --build