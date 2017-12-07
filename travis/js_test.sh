
#!/bin/bash

status=0

function run_test {
    "$@"
    local test_status=$?
    if [ $test_status -ne 0 ]; then
        status=$test_status
    fi
    return $status
}

run_test yarn run codecov
run_test yarn lint
run_test yarn fmt:check
run_test yarn flow

exit $status