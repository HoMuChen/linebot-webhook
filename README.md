# linebot-webhook
A webhook used as Line bot(@zpe1163t), deployed on google cloud functions 

## Configuration
``` bash 
$ cp ./envs/sample.env.yml ./envs/prod.env.yml
```
add enviroment variables here in ./envs/prod.env.yml

## Deployment
```bash 
$ sh ./deploy.sh
```
in `deploy.sh`, we run 
```bash
$ gcloud beta functions deploy lineBotWebhook --env-vars-file ./envs/prod.env.yml --trigger-http
```
- You have to setup [gcloud CLI](https://cloud.google.com/sdk/docs) in advanced
- linebotwebhook is the function name export by `index.js`
- `./envs/prod.env.yml` is the yaml file mentioned above
