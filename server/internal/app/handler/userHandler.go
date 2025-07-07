package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jsndz/pingback/internal/app/service"
	"gorm.io/gorm"
)


type UserHandler struct{
	userService *service.UserService
}


func  NewUserHandler(db *gorm.DB )( *UserHandler){
	return &UserHandler{
		userService: service.NewUserService(db),
	}
}

func (h *UserHandler) GetOrCreateUserHandler(c *gin.Context)  {
    
        auth0ID := c.GetString("user")
        email := c.GetString("email")

        user, err := h.userService.GetOrCreateUser(email, auth0ID)
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "user lookup failed"})
        }

        c.JSON(http.StatusOK, gin.H{"user": user})
    
}
