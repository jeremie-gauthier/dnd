#!/bin/bash

docker exec -i postgres /bin/bash -c "PGPASSWORD=postgres psql --username postgres -c 'DROP DATABASE dnd'"
docker exec -i postgres /bin/bash -c "PGPASSWORD=postgres psql --username postgres -c 'CREATE DATABASE dnd'"
npm run migration:run -w=@dnd/backend
