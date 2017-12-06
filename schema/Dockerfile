FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD 'root'

COPY 1schema.sql /docker-entrypoint-initdb.d/

EXPOSE 1100

CMD mysql < "schema.sql"
