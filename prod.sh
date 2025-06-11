#!/bin/bash
(docker network inspect site-sender-network >/dev/null 2>&1 || docker network create site-sender-network) &&
(cd screenshot && bash prod.sh) &&
cd "$(dirname "$0")" &&
(cd site && bash prod.sh) &&
wait