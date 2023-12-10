#!/bin/bash

PUBLISHED_PACKAGE=$(pwd | rev | cut -d / -f 1 | rev)
PACKAGES=$(ls ..)

# loop through every existing dnd packages
for pkg in $PACKAGES
do

	# ignore action on PUBLISHED_PACKAGE
	if [ "$pkg" = "$PUBLISHED_PACKAGE" ]
	then
		continue
	fi

	# update the PUBLISHED_PACKAGE in others packages
	npm install -D @dnd/"$PUBLISHED_PACKAGE" -w @dnd/"$pkg" &

done

wait

# we do it in 2 steps
# we must first ensure that the update is well installed on every other pkgs
for pkg in $PACKAGES
do

	# ignore action on PUBLISHED_PACKAGE
	if [ "$pkg" = "$PUBLISHED_PACKAGE" ]
	then
		continue
	fi

	# update the PUBLISHED_PACKAGE in others packages
	npm run format -w @dnd/"$pkg" &

done

wait
