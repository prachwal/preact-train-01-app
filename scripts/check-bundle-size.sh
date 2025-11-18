#!/bin/bash

echo "Checking gzipped bundle sizes..."
echo "================================="

# Calculate gzipped sizes (what browsers actually download)
CSS_GZ_SIZE=$(gzip -c dist/assets/*.css | wc -c)
JS_GZ_SIZE=$(gzip -c dist/assets/*.js | wc -c)

CSS_KB=$((CSS_GZ_SIZE / 1024))
JS_KB=$((JS_GZ_SIZE / 1024))

echo "CSS Size: ${CSS_KB} KB (gzipped)"
echo "JS Size: ${JS_KB} KB (gzipped)"

# Check against reasonable gzipped limits
if [ $CSS_GZ_SIZE -gt 20480 ]; then  # 20 KB gzipped CSS limit
  echo "❌ CSS bundle too large (gzipped)!"
  exit 1
fi

if [ $JS_GZ_SIZE -gt 51200 ]; then   # 50 KB gzipped JS limit  
  echo "❌ JS bundle too large (gzipped)!"
  exit 1
fi

echo "✅ Bundle sizes are within limits (gzipped)"
