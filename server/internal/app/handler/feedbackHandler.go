package handler

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jsndz/pingback/internal/app/service"
	"gorm.io/datatypes"
	"gorm.io/gorm"
)


type FeedbackHandler struct{
	feedbackService *service.FeedbackService
	userService     *service.UserService
}


func  NewFeedbackHandler(db *gorm.DB )( *FeedbackHandler){
	return &FeedbackHandler{
		feedbackService: service.NewFeedbackService(db),
		userService:     service.NewUserService(db),
	}
}


type SubmitFeedbackRequest struct {
	WidgetID    uuid.UUID   `json:"widgetId" binding:"required"`  
	Content     string      `json:"content" binding:"required"`
	Metadata    datatypes.JSON `json:"metadata"`
}


func (h *FeedbackHandler) CreateFeedbackHandler(c *gin.Context) {
	var req SubmitFeedbackRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	widget, err := h.feedbackService.GetWidgetByID(req.WidgetID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "widget not found"})
		return
	}

	// Verify origin if AllowedOrigins is configured
	origin := c.Request.Header.Get("Origin")
	if origin == "" {
		origin = c.Request.Header.Get("Referer")
	}
	if len(widget.AllowedOrigins) > 0 && origin != "" {
		allowed := false
		for _, o := range widget.AllowedOrigins {
			if strings.Contains(origin, o) {
				allowed = true
				break
			}
		}
		if !allowed {
			c.JSON(http.StatusForbidden, gin.H{"error": "origin not allowed"})
			return
		}
	}

	// Format data as JSON
	dataMap := map[string]string{"content": req.Content}
	dataJSON, err := json.Marshal(dataMap)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "data serialization failed"})
		return
	}

	feedback, err := h.feedbackService.CreateFeedback(req.WidgetID, datatypes.JSON(dataJSON), req.Metadata)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "feedback creation failed"})
		return
	}
	c.JSON(http.StatusOK, feedback)
}

func (h *FeedbackHandler) ListFeedbackHandler(c *gin.Context) {
	auth0ID := c.GetString("user")
	email := c.GetString("email")

	user, err := h.userService.GetOrCreateUser(email, auth0ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "user lookup failed"})
		return
	}

	feedbacks, err := h.feedbackService.ListFeedbackForUser(user.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to retrieve feedback"})
		return
	}
	c.JSON(http.StatusOK, feedbacks)
}

func (h *FeedbackHandler) GetFeedbackDetailHandler(c *gin.Context) {
	c.JSON(http.StatusNotImplemented, gin.H{"error": "not implemented"})
}
