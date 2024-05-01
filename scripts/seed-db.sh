#!/bin/bash

FILES="./packages/backend/src/database/seeds/*"

for file in $FILES
do
  docker exec -i postgres /bin/bash -c "PGPASSWORD=postgres psql --username postgres dnd" < $file
done
