FROM postgres:15.1-alpine

ENV POSTGRES_PASSWORD postgresql 
ENV POSTGRES_USERNAME postgresql

EXPOSE 5432