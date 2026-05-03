FROM node:latest AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM busybox as runner

# Create a non-root user to own the files and run our server
RUN adduser -D static
USER static
COPY --from=builder /app/dist /home/static
WORKDIR /home/static

# Run BusyBox httpd
CMD ["busybox", "httpd", "-f", "-v", "-p", "3000"]
