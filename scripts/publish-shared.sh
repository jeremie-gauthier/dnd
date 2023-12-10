#!/bin/bash

PUBLISHED_PACKAGE=$(pwd | rev | cut -d / -f 1 | rev)
PACKAGES=(backend frontend)

# loop through every existing dnd packages
for pkg in ${PACKAGES[@]}
do

	echo "$pkg"
	# update the PUBLISHED_PACKAGE in others packages
	npm install @dnd/"$PUBLISHED_PACKAGE" -w @dnd/"$pkg" &

done

wait
