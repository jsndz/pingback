package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/jsndz/pingback/internal/app/handler"
	"gorm.io/gorm"
)

func UserRoutes(rg *gin.RouterGroup,db *gorm.DB){
	userHandler := handler.NewUserHandler(db) 
	rg.GET("/me", userHandler.GetOrCreateUserHandler)
}

func ProjectRoutes(rg *gin.RouterGroup){

}

func FeedbackRoutes(rg *gin.RouterGroup){

}

func WidgetRoutes(rg *gin.RouterGroup){

}