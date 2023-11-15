#!/bin/sh

cd "$(dirname "$0")" || exit 1

APP_NAME="satoshispay-web"
PIDFILE="/var/run/$APP_NAME.pid"

info() {
    printf '%s\n' "${BOLD}${GREY}>${NO_COLOR} $*"
}

warn() {
    printf '%s\n' "${YELLOW}! $*${NO_COLOR}"
}

error() {
    printf '%s\n' "${RED}x $*${NO_COLOR}" >&2
}

completed() {
    printf '%s\n' "${GREEN}✓${NO_COLOR} $*"
}

start() {
  yarn && yarn build
  info "starting $APP_NAME"
  screen -S $APP_NAME -d -m yarn start
  sleep 1
  PID=$(ps aux | grep "SCREEN -S $APP_NAME" | head -n 1 | awk '{print $2}')
  echo "$PID" > $PIDFILE
  info "$APP_NAME started with PID $PID"

  return 0
}

stop() {
  info "stopping $APP_NAME"
  PID=$(cat $PIDFILE)
  if [ -z "$PID" ]; then
    error "Could not find any PID for $APP_NAME"
    return 1
  fi
  info "killing PID $PID"
  kill $PID

  return 0
}

NODE=$(which node)
if [ -z "$NODE" ]; then
  export NVM_DIR="/root/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
  nvm use 18
fi

case "$1" in

  "start")
    start
    ;;
  
  "stop")
    stop
    ;;

  "restart")
    stop
    start
    ;;
  
  *)
    "unknown operation $OP"
    exit 1
    ;;

esac
