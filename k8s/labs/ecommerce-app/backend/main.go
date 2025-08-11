package main

import (
    "database/sql"
    "encoding/json"
    "fmt"
    "log"
    "net/http"

    _ "github.com/lib/pq"
)

var db *sql.DB

// CORS middleware to allow all origins (adjust for production)
func enableCors(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        log.Printf("CORS middleware hit: %s %s", r.Method, r.URL.Path)
        w.Header().Set("Access-Control-Allow-Origin", "*")
        w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

        // Handle preflight OPTIONS request
        if r.Method == "OPTIONS" {
            w.WriteHeader(http.StatusOK)
            return
        }

        next.ServeHTTP(w, r)
    })
}

func main() {
    var err error
    connStr := fmt.Sprintf(
        "host=postgres user=admin password=adminpass dbname=ecommerce sslmode=disable",
    )
    db, err = sql.Open("postgres", connStr)
    if err != nil {
        log.Fatal(err)
    }

    mux := http.NewServeMux()

    mux.HandleFunc("/api/products", productsHandler)
    mux.HandleFunc("/api/orders", ordersHandler)

    handler := enableCors(mux)

    log.Println("Backend running on port 8080")
    log.Fatal(http.ListenAndServe(":8080", handler))
}

func productsHandler(w http.ResponseWriter, r *http.Request) {
    rows, err := db.Query("SELECT id, name, price FROM products")
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    defer rows.Close()

    type Product struct {
        ID    int     `json:"id"`
        Name  string  `json:"name"`
        Price float64 `json:"price"`
    }

    var products []Product
    for rows.Next() {
        var p Product
        if err := rows.Scan(&p.ID, &p.Name, &p.Price); err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }
        products = append(products, p)
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(products)
}

func ordersHandler(w http.ResponseWriter, r *http.Request) {
    rows, err := db.Query("SELECT id, product_id, quantity, total FROM orders")
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    defer rows.Close()

    type Order struct {
        ID        int     `json:"id"`
        ProductID int     `json:"product_id"`
        Quantity  int     `json:"quantity"`
        Total     float64 `json:"total"`
    }

    var orders []Order
    for rows.Next() {
        var o Order
        if err := rows.Scan(&o.ID, &o.ProductID, &o.Quantity, &o.Total); err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }
        orders = append(orders, o)
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(orders)
}

