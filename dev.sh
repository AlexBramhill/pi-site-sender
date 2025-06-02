#!/bin/bash
(docker network inspect screenshot-network >/dev/null 2>&1 || docker network create screenshot-network) &
(cd screenshot && bash dev.sh) &
cd "$(dirname "$0")" &&
(cd site && bash dev.sh) &
wait