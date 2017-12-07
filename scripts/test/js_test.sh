#!/bin/bash
export TMP_FILE=$(mktemp)

if [[ ! -z "$COVERAGE" ]]
then
    export CMD="node ./node_modules/.bin/nyc --reporter=html ava"
elif [[ ! -z "$CODECOV" ]]
then
    export CMD="node ./node_modules/.bin/nyc --reporter=lcovonly -R spec ava"
elif [[ ! -z "$WATCH" ]]
then
    export CMD="node ./node_modules/.bin/ava --watch"
else
    export CMD="node ./node_modules/.bin/ava"
fi

export FILE_PATTERN=${1:-'"src/**/*_test.js"'}
CMD_ARGS="$FILE_PATTERN"

# Second argument (if specified) should be a string that will match specific test case descriptions
#
# EXAMPLE:
#   (./static/js/SomeComponent_test.js)
#   it('should test basic arithmetic') {
#     assert.equal(1 + 1, 2);
#   }
#
#   (in command line...)
#   > ./js_test.sh static/js/SomeComponent_test.js "should test basic arithmetic"
if [[ ! -z "$2" ]]; then
    CMD_ARGS+=" -g \"$2\""
fi

eval "$CMD $CMD_ARGS" 2> >(tee "$TMP_FILE")

export TEST_RESULT=$?
export TRAVIS_BUILD_DIR=$PWD
if [[ ! -z "$CODECOV" ]]
then
    echo "Uploading coverage..."
    node ./node_modules/codecov/bin/codecov
fi

if [[ $TEST_RESULT -ne 0 ]]
then
    echo "Tests failed, exiting with error $TEST_RESULT..."
    rm -f "$TMP_FILE"
    exit 1
fi


# NOTE: this doesn't work with ava output out of the box, will try to fix it later
# 
# if [[ $(
#     cat "$TMP_FILE" |
#     grep -v -e '^$' | 
#     grep -v 'passed' | 
#     grep -v 'ignored, nothing could be mapped' |
#     grep -v "This browser doesn't support the \`onScroll\` event" |
#     wc -l |
#     awk '{print $1}'
#     ) -ne 0 ]]  # is file empty?
# then
#     echo "Error output found:"
#     cat "$TMP_FILE"
#     echo "End of output"
#     rm -f "$TMP_FILE"
#     exit 1
# fi

rm -f "$TMP_FILE"