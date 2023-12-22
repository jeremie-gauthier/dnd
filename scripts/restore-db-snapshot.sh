#!/bin/bash

docker exec -i postgres /bin/bash -c "PGPASSWORD=postgres psql --username postgres dnd" < $1
