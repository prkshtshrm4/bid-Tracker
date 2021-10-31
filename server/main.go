package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/prkshtshrm4/bid-tracker/bid"
	"github.com/prkshtshrm4/bid-tracker/item"
	"github.com/prkshtshrm4/bid-tracker/user"
)

func homepage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Home Page")

}
func wsEndpoint(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Web socket end point")

}

func setupRoutes() {
	http.HandleFunc("/", homepage)
	http.HandleFunc("/ws", wsEndpoint)
}

func main() {
	router := mux.NewRouter()
	//adding mock data for test usage
	fmt.Println("Go Wen socket")
	setupRoutes()
	user.AddMockUsers()
	item.AddMockItems()
	bid.AddMockBids()
	credentials := handlers.AllowCredentials()
	methods := handlers.AllowedMethods([]string{"POST", "GET", "PUT", "DELETE"})
	origins := handlers.AllowedOrigins([]string{"http://localhost:3000"})

	router.HandleFunc("/users", user.GetUsers).Methods("GET")
	router.HandleFunc("/users/id/{id}", user.GetUserByID).Methods("GET")
	router.HandleFunc("/users", user.AddUser).Methods("POST")
	router.HandleFunc("/users/{name}", user.AddUserWithName).Methods("POST")
	router.HandleFunc("/users/id/{id}", user.DeleteUserByID).Methods("DELETE")

	router.HandleFunc("/items", item.GetItems).Methods("GET")
	router.HandleFunc("/items/id/{id}", item.GetItemByID).Methods("GET")
	router.HandleFunc("/items", item.AddItem).Methods("POST")
	router.HandleFunc("/items/{name}", item.AddItemWithName).Methods("POST")
	router.HandleFunc("/items/id/{id}", item.DeleteItemByID).Methods("DELETE")

	router.HandleFunc("/bids", bid.GetBids).Methods("GET")
	router.HandleFunc("/bids/{userid}/{itemid}", bid.GetBid).Methods("GET")
	router.HandleFunc("/bids/{userid}/{itemid}/{amount}", bid.AddBid).Methods("POST")
	router.HandleFunc("/bids/{userid}/{itemid}/{amount}", bid.UpdateBid).Methods("PUT")
	router.HandleFunc("/bids/{userid}/{itemid}", bid.DeleteBid).Methods("DELETE")

	router.HandleFunc("/winner/{itemid}", bid.WinnerBidByItemID).Methods("GET")
	router.HandleFunc("/bids/{itemid}", bid.BidsByItemID).Methods("GET")
	router.HandleFunc("/items/user/{userid}", bid.ItemByUserID).Methods("GET")

	http.ListenAndServe(":8000", handlers.CORS(credentials, methods, origins)(router))

}
