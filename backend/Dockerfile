FROM php:latest


WORKDIR /


ADD . /


EXPOSE 8000

ENTRYPOINT php bin/console server:run http://localhost:8000
