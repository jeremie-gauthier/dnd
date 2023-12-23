#!/bin/bash

TIMESTAMP=$(date +%s)
SNAPSHOT_NAME=$TIMESTAMP-snapshot.sql

docker exec -i postgres /bin/bash -c "PGPASSWORD=postgres pg_dump --data-only --exclude-table=migrations --username postgres dnd" > $SNAPSHOT_NAME && echo "✅ Snapshot file created\n📸 $SNAPSHOT_NAME"
