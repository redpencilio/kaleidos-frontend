#!/bin/sh

# Effectively the prefix used in all classes, don't change this unless you plan a refactor!
FONT_PREFIX=ki

# The name of the font files [woff, eot, ...]
FONT_NAME=kaleidos-icons

# The location of the overview page for the icons in Ember
OVERVIEW_PAGE_PATH=app/templates/icons.hbs

# The folder containing all the SVG icons you intend to convert to the font
PATH_TO_SVG_FILES=./icon-font-svg-files

# Generate the font using the npm package
npx icon-font-generator $PATH_TO_SVG_FILES"/*.svg" \
  --out "./public/fonts" \
  --csspath "./app/styles/_icon-font.css" \
  --cssfontsurl "/fonts/" \
  --name $FONT_NAME \
  --htmlpath "./tmp/icons-temp.html" \
  --prefix $FONT_PREFIX \
  --height=1000

# The two following fixes are performed so that xmllint doesn't argue about broken tags...
# Fix all broken <br> tags that were generated
sed -i '' -e 's/\<br\>/\<br \/\>/g' "tmp/icons-temp.html"
# Fix the broken meta tag that was generated
sed -i '' -e 's/\<meta charset="UTF-8"\>/\<meta charset="UTF-8"\/\>/g' "tmp/icons-temp.html"

# Make the new overview page - disable linting, add an icons-page class wrapper, and copy the generated contents into this template
echo "{{!-- template-lint-disable  --}}" > $OVERVIEW_PAGE_PATH \
		&& echo "<div class=\"icons-page\">" >> $OVERVIEW_PAGE_PATH \
		&& xmllint --xpath "//body/child::*" "tmp/icons-temp.html" >> $OVERVIEW_PAGE_PATH \
		&& printf "\n</div>" >> $OVERVIEW_PAGE_PATH

# Modify the overview page so that the prefix is included, that allows us to just copy paste icons from the overview
sed -i '' -e "s/\"label\"\>/\"label\"\>$FONT_PREFIX-/g" $OVERVIEW_PAGE_PATH