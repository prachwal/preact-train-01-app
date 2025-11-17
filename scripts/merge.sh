#!/bin/bash

# Script to merge all files from a given folder into a single txt file in ./tmp/
# Usage: ./merge.sh <folder>

if [ $# -ne 1 ]; then
  echo "Usage: $0 <folder>"
  exit 1
fi

FOLDER=$1
OUTPUT_DIR="./tmp"
OUTPUT_FILE="$OUTPUT_DIR/merged-$(basename $FOLDER)-$(date +%Y%m%d-%H%M%S).txt"

mkdir -p $OUTPUT_DIR

echo "Created on: $(date)" > $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

git ls-files $FOLDER | sort | while read -r file; do
  echo "================ $file ================" >> $OUTPUT_FILE
  cat "$file" >> $OUTPUT_FILE
  echo "" >> $OUTPUT_FILE
  echo "" >> $OUTPUT_FILE
done

FILE_COUNT=$(git ls-files $FOLDER | wc -l)
echo "Merged $FILE_COUNT files into $OUTPUT_FILE" >> $OUTPUT_FILE
echo "Merged $FILE_COUNT files into $OUTPUT_FILE"