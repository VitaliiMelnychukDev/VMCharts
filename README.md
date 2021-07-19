

## Commands

```bash
# make start
$ start application in development mode

# make build-prod
$ build application for production

# make start-prod
$ start application in production mode

# make stop
$ stop application

# make logs
$ open application logs

# make ssh
$ go inside application container

# make info
$ get container info

# make info
$ get container ip

# make list
$ get containers list
```

###Creating Admin User
```
# exmaple of command. It has to be launch inside of vm-charts-api container
npx nestjs-command create:admin --username Admin --email admin@gmail.com --password test1234
```