# Docker usage

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Build Process](#build-process)
  - [Prepare build](#prepare-build)
  - [Build](#build)
  - [Push](#push)
- [Setup on server](#setup-on-server)
- [Run with Docker Containers](#run-with-docker-containers)
- [Deploy](#deploy)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Build Process

### Prepare build

Bump project version

- [CHANGELOG](../CHANGELOG.md)
- [package.json](../package.json)
- [docker-compose.yml](docker-compose.yml)

### Build

1. Set current version:
   ```powershell
   # explicit set
   ($env:VERSION="x.x.x")
   # or read from package.json (looks like `3.1.0`)
   ($env:VERSION = (Get-Content package.json) -join "`n" | ConvertFrom-Json | Select -ExpandProperty "version")
   # or read from gitversion (looks like `3.1.0-533-impl-change-edi1-567c446`)
   ($env:VERSION = gitversion | ConvertFrom-Json | % {$_.LegacySemVer, $_.ShortSha} | & {$ofs='-';"$input"})
   ```
2. Build
   ```powershell
   docker compose -f docker-compose.build.yml build
   ```

### Push

1. Push image by running
    ```
    docker compose -f docker-compose.build.yml push
    ```
2. Commit updated files.
3. Push commit.
4. Add tag with version.

## Setup on server

1. Setup reverse proxy according to [sample docker-compose](docker-compose.yml)

## Run with Docker Containers

In the [`docker`](./docker) folder:

```
docker-compose up -d
```

After successful launch, you can access the admin SPA through a web browser using the URL: http://localhost:8052/

## Deploy

Update docker-compose on the server and re-run

```
sudo docker-compose up -d
```
