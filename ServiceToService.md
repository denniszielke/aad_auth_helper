# Service to Service Auth

https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-protocols-oauth-service-to-service

set default parameters
```
TENANT_ID=
TENANT_NAME=*.onmicrosoft.com
SVC_APP_NAME=node-aad-svc
SVC_APP_ID=
SVC_APP_SECRET=
SVC_APP_SECRET_ENCODED=
SVC_APP_URI_ID=https://$TENANT_NAME/node-aad-svc

API_APP_NAME=name-aad-api
API_APP_ID=
API_APP_URI_ID=https://$TENANT_NAME/node-aad-api
```

Create service that we will use to authenticate to our api
```
az ad app create --display-name node-aad-api --homepage http://localhost --identifier-uris https://$TENANT_NAME/node-aad-api
```

Create api app
```
az ad app create --display-name node-aad-svc --homepage http://localhost --identifier-uris https://$TENANT_NAME/node-aad-svc
```

Call azure AD to get bearer token
```
curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -d "client_id=$SVC_APP_ID&resource=$API_APP_URI_ID&client_secret=$SVC_APP_SECRET_ENCODED&grant_type=client_credentials" "https://login.microsoftonline.com/$TENANT_ID/oauth2/token"

Set bearer token to env variable
```
TOKEN=
```

Call our api with the bearer token
```
curl -isS -X POST -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" http://127.0.0.1:3000/api
```