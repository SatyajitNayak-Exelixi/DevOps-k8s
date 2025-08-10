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

func main() {
    var err error
    connStr := fmt.Sprintf(
        "host=postgres user=%s password=%s dbname=%s sslmode=disable",
        "postgres", "postgres123", "ecommerce",
    )
    db, err = sql.Open("postgres", connStr)
    if err != nil {
        log.Fatal(err)
    }

    http.HandleFunc("/products", func(w http.ResponseWriter, r *http.Request) {
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
            rows.Scan(&p.ID, &p.Name, &p.Price)
            products = append(products, p)
        }
        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(products)
    })

    http.HandleFunc("/orders", func(w http.ResponseWriter, r *http.Request) {
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
            rows.Scan(&o.ID, &o.ProductID, &o.Quantity, &o.Total)
            orders = append(orders, o)
        }
        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(orders)
    })

    log.Println("Backend running on port 8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
