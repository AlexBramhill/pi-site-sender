#!/bin/bash
(docker network inspect screenshot-network >/dev/null 2>&1 || docker network create screenshot-network) &
(cd screenshot && bash prod.sh) &
cd "$(dirname "$0")" &&
(cd site && bash prod.sh) &
wait