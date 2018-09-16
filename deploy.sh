#! /bin/sh

gcloud beta functions deploy lineBotWebhook --env-vars-file ./envs/prod.env.yml --trigger-http
