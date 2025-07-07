package repository

import (
	"github.com/jsndz/pingback/internal/app/model"
	"gorm.io/gorm"
)

type UserRepository struct{
	db *gorm.DB
}


func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{db: db}
}

func (r *UserRepository) Create(email,auth0ID string) (*model.User ,error) {
	 user := &model.User{
		Auth0ID: auth0ID,
		Email: email,
	}
	if err := r.db.Create(user).Error; err != nil {
		return  nil,err
	}
	return  user,nil
}

func (r *UserRepository) Get(Auth0ID string) (*model.User, error) {
    var user model.User

	err := r.db.First(&user, "Auth0ID = ?", Auth0ID).First(&user).Error
    if err != nil {
        return nil, err 
    }
    return &user, nil
}

