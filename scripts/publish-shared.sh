#!/bin/bash

echo "📦 Publishing shared package..."

PUBLISHED_PACKAGE=$(pwd | rev | cut -d / -f 1 | rev)
PACKAGES=(backend frontend)

# loop through every existing dnd packages
for pkg in ${PACKAGES[@]}
do

	echo "⏳ Updating dependencies in $pkg..."

	# update the PUBLISHED_PACKAGE in others packages
	npm install --silent --prefer-offline --no-audit --progress=false @dnd/"$PUBLISHED_PACKAGE" -w @dnd/"$pkg" &

	echo "⌛ Dependencies updated in $pkg"

done

wait

echo "✅ shared package published"
