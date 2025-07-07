package service

import (
	"errors"

	"github.com/jsndz/pingback/internal/app/model"
	"github.com/jsndz/pingback/internal/app/repository"
	"gorm.io/gorm"
)

type UserService struct{
	userRepo *repository.UserRepository
}

func NewUserService(db *gorm.DB) *UserService{
	return &UserService{
		userRepo : repository.NewUserRepository(db),
	}
}


func (s *UserService) GetOrCreateUser(Email,Auth0ID string) (*model.User,error){
	user,err := s.userRepo.Get(Auth0ID);
	if errors.Is(err,gorm.ErrRecordNotFound)  {
		return s.userRepo.Create(Email,Auth0ID)
	}
	return user,err
}