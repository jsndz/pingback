package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/jsndz/pingback/internal/app/handler"
	"gorm.io/gorm"
)

func UserRoutes(rg *gin.RouterGroup, db *gorm.DB, authMiddleware gin.HandlerFunc) {
	userHandler := handler.NewUserHandler(db) 
	rg.GET("/me", authMiddleware, userHandler.GetOrCreateUserHandler)
}

func ProjectRoutes(rg *gin.RouterGroup, db *gorm.DB, authMiddleware gin.HandlerFunc) {
	projectHandler := handler.NewProjectHandler(db)
	rg.POST("", authMiddleware, projectHandler.CreateProjectHandler)
	rg.GET("", authMiddleware, projectHandler.ListProjectsHandler)
	rg.DELETE("/:id", authMiddleware, projectHandler.DeleteProjectHandler)
}

func FeedbackRoutes(rg *gin.RouterGroup, db *gorm.DB, authMiddleware gin.HandlerFunc) {
	feedbackHandler := handler.NewFeedbackHandler(db)
	rg.POST("", feedbackHandler.CreateFeedbackHandler)
	rg.GET("", authMiddleware, feedbackHandler.ListFeedbackHandler)
	rg.GET("/:id", authMiddleware, feedbackHandler.GetFeedbackDetailHandler)
}

func WidgetRoutes(rg *gin.RouterGroup, db *gorm.DB, authMiddleware gin.HandlerFunc) {
	widgetHandler := handler.NewWidgetHandler(db)
	rg.POST("", authMiddleware, widgetHandler.CreateWidgetHandler)
	rg.GET("/:id", widgetHandler.GetWidgetConfigHandler)
	rg.PUT("/:id", authMiddleware, widgetHandler.UpdateWidgetHandler)
	rg.DELETE("/:id", authMiddleware, widgetHandler.DeleteWidgetHandler)
}