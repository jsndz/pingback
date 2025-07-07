package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jsndz/pingback/internal/app/service"
	"gorm.io/datatypes"
	"gorm.io/gorm"
)


type FeedbackHandler struct{
	feedbackService *service.FeedbackService
}


func  NewFeedbackHandler(db *gorm.DB )( *FeedbackHandler){
	return &FeedbackHandler{
		feedbackService: service.NewFeedbackService(db),
	}
}


type CreateFeedbackRequest struct {
	Name string `json:"name" binding:"required"`
	WidgetID    uuid.UUID   `json:"widgetId" binding:"required"`  
	Data        datatypes.JSON `json:"data" binding:"required"`
	Metadata    datatypes.JSON `json:"metadata"`
}


func (h *FeedbackHandler) CreateFeedbackHandler(c *gin.Context) {
	
	var req CreateFeedbackRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	feedback, err := h.feedbackService.CreateFeedback(req.WidgetID,req.Data,req.Metadata)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "feedback creation failed"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"feedback": feedback})
}
