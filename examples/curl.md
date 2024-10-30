### List all Containers

```curl
curl --request GET \
  --url http://localhost:3000/api/containers \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyYzIyMzAyLWM3YzYtNDkyMi04YzYzLTM1YmJhODAxMDU1MSIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MzAyNzQwOTUsImV4cCI6MTczMDM2MDQ5NX0.k76TOiYPOfBNM7B4lpCQJI7IQ2obsJ10jQ16JUh3EP0' \
  --header 'User-Agent: insomnia/10.1.1'
```

### Get Specific Container

```curl
curl --request GET \
  --url http://localhost:3000/api/containers/c031545c-c522-4dac-b127-8b21fca1b377 \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyYzIyMzAyLWM3YzYtNDkyMi04YzYzLTM1YmJhODAxMDU1MSIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MzAyNzQwOTUsImV4cCI6MTczMDM2MDQ5NX0.k76TOiYPOfBNM7B4lpCQJI7IQ2obsJ10jQ16JUh3EP0' \
  --header 'User-Agent: insomnia/10.1.1'
```

### Get Container Logs

```curl
curl --request GET \
  --url http://localhost:3000/api/containers/c031545c-c522-4dac-b127-8b21fca1b377/logs \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyYzIyMzAyLWM3YzYtNDkyMi04YzYzLTM1YmJhODAxMDU1MSIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MzAyNzQwOTUsImV4cCI6MTczMDM2MDQ5NX0.k76TOiYPOfBNM7B4lpCQJI7IQ2obsJ10jQ16JUh3EP0' \
  --header 'User-Agent: insomnia/10.1.1'
```

### Start Container

```curl
curl --request POST \
  --url http://localhost:3000/api/containers/c031545c-c522-4dac-b127-8b21fca1b377/start \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyYzIyMzAyLWM3YzYtNDkyMi04YzYzLTM1YmJhODAxMDU1MSIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MzAyNzQwOTUsImV4cCI6MTczMDM2MDQ5NX0.k76TOiYPOfBNM7B4lpCQJI7IQ2obsJ10jQ16JUh3EP0' \
  --header 'User-Agent: insomnia/10.1.1'
```

### Stop Container

```curl
curl --request POST \
  --url http://localhost:3000/api/containers/c031545c-c522-4dac-b127-8b21fca1b377/stop \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyYzIyMzAyLWM3YzYtNDkyMi04YzYzLTM1YmJhODAxMDU1MSIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MzAyNzQwOTUsImV4cCI6MTczMDM2MDQ5NX0.k76TOiYPOfBNM7B4lpCQJI7IQ2obsJ10jQ16JUh3EP0' \
  --header 'User-Agent: insomnia/10.1.1'
```

### Delete Container

```curl
curl --request DELETE \
  --url http://localhost:3000/api/containers/c031545c-c522-4dac-b127-8b21fca1b377 \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyYzIyMzAyLWM3YzYtNDkyMi04YzYzLTM1YmJhODAxMDU1MSIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MzAyNzQwOTUsImV4cCI6MTczMDM2MDQ5NX0.k76TOiYPOfBNM7B4lpCQJI7IQ2obsJ10jQ16JUh3EP0' \
  --header 'User-Agent: insomnia/10.1.1'
```

### Create Container

```curl
curl --request DELETE \
  --url http://localhost:3000/api/containers/c031545c-c522-4dac-b127-8b21fca1b377 \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyYzIyMzAyLWM3YzYtNDkyMi04YzYzLTM1YmJhODAxMDU1MSIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MzAyNzQwOTUsImV4cCI6MTczMDM2MDQ5NX0.k76TOiYPOfBNM7B4lpCQJI7IQ2obsJ10jQ16JUh3EP0' \
  --header 'User-Agent: insomnia/10.1.1'
```

### Register Admin

```curl
curl --request POST \
  --url http://localhost:3000/api/auth/register \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/10.1.1' \
  --data '{
	"email": "admin@example.com",
	"password": "password123",
	"role": "ADMIN"
}'
```

### Login Admin

```curl
curl --request POST \
  --url http://localhost:3000/api/auth/login \
  --header 'Content-Type: application/json' \
  --data '{"email": "admin@example.com", "password": "password123"}'
```