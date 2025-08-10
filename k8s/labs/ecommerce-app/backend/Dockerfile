FROM golang:1.21 AS builder
WORKDIR /app
COPY . .
RUN go mod init backend && go mod tidy && go build -o backend

FROM gcr.io/distroless/base-debian12
WORKDIR /
COPY --from=builder /app/backend /backend
CMD ["/backend"]
