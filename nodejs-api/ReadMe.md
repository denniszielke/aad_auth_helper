# Web API that require AAD auth

https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-devquickstarts-webapi-nodejs


curl -isS -X GET http://127.0.0.1:3000/

curl -isS -X GET http://127.0.0.1:3000/api

curl -isS -X POST http://127.0.0.1:3000/api -H

curl -isS -X POST -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" http://127.0.0.1:3000/api