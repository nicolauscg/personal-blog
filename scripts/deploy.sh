set -o allexport; source ./.env; set +o allexport

npm run clean && npm run build && \
  ssh $DEPLOY_BASH_SCRIPT_USERNAME@$DEPLOY_BASH_SCRIPT_HOST rm -rf $DEPLOY_BASH_SCRIPT_PATH/* && \
  scp -r public/* $DEPLOY_BASH_SCRIPT_USERNAME@$DEPLOY_BASH_SCRIPT_HOST:$DEPLOY_BASH_SCRIPT_PATH