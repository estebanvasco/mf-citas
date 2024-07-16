FROM node:18.12.1-slim as builder


WORKDIR /usr/src/app
COPY /nginx.conf.template .

WORKDIR /usr/src/app/modulo-citas
COPY . .
RUN npm install
RUN npm run build
WORKDIR /usr/src/app/modulo-citas/build/static/js
RUN mv main.*.js  widget.js
WORKDIR /usr/src/app/modulo-citas/build/static/css
RUN mv main.*.css  widget.css

FROM nginx:stable-alpine as execution

COPY --from=builder /usr/src/app/nginx.conf.template /etc/nginx/conf.d/default.conf.template

WORKDIR /app/fronts/modulo-citas
COPY --from=builder /usr/src/app/modulo-citas/build/static/js /usr/share/nginx/html/modulo-citas/js
COPY --from=builder /usr/src/app/modulo-citas/build/static/css /usr/share/nginx/html/modulo-citas/css

WORKDIR /usr/share/nginx/html/static/media
COPY --from=builder /usr/src/app/modulo-citas/build/static/media .

RUN chgrp -R root /var/cache/nginx /var/run /var/log/nginx /etc/nginx/conf.d  && \
    chmod -R 770 /var/cache/nginx /var/run /var/log/nginx /etc/nginx/conf.d 

RUN envsubst '${MIDDLEWARE_API}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf