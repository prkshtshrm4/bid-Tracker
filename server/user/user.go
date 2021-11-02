package user

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

type User struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

var users []User

func AddMockUsers() {
	//adding mock data for test usage
	users = append(users, User{ID: "u1", Name: "Parikshit"})
	users = append(users, User{ID: "u2", Name: "Ben"})
}

func GetUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(users)
}

func GetUserByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	user := FindUser(params["id"])
	json.NewEncoder(w).Encode(user)
}

func FindUser(id string) User {
	var u User
	for _, user := range users {
		if user.ID == id {
			return user
		}
	}
	return u
}

func AddUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var user User
	_ = json.NewDecoder(r.Body).Decode(user)
	user.ID = strconv.Itoa(rand.Intn(1000000))
	users = append(users, user)
	json.NewEncoder(w).Encode(&user)
}

func AddUserWithName(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	fmt.Println(params)
	var user User
	_ = json.NewDecoder(r.Body).Decode(user)
	user.ID = strconv.Itoa(rand.Intn(1000000))
	user.Name = params["name"]
	users = append(users, user)
	json.NewEncoder(w).Encode(&user)
}

func DeleteUserByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for index, user := range users {
		if user.ID == params["id"] {
			users = append(users[:index], users[index+1:]...)
			break
		}
	}
	json.NewEncoder(w).Encode(users)
}
