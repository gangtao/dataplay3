#!/bin/bash

# Prepare log files and start outputting logs to stdout
mkdir -p /home/logs
touch /home/logs/gunicorn.log
touch /home/logs/gunicorn-access.log
tail -n 0 -f /home/logs/gunicorn*.log &

exec gunicorn dataplay.server:app \
    --name dataplay \
    --bind 0.0.0.0:8000 \
    --workers 5 \
    --worker-class=sanic.worker.GunicornWorker \
    --log-level=info \
    --log-file=/home/logs/gunicorn.log \
    --access-logfile=/home/logs/gunicorn-access.log \
"$@"