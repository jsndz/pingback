package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jsndz/pingback/internal/app/service"
	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type WidgetHandler struct {
	widgetService *service.WidgetService
	userService   *service.UserService
}

func NewWidgetHandler(db *gorm.DB) *WidgetHandler {
	return &WidgetHandler{
		widgetService: service.NewWidgetService(db),
		userService:   service.NewUserService(db),
	}
}

type CreateWidgetRequest struct {
	ProjectID      uuid.UUID      `json:"projectId" binding:"required"`
	Name           string         `json:"name" binding:"required"`
	Template       string         `json:"template"`
	Theme          string         `json:"theme"`
	PrimaryColor   string         `json:"primaryColor"`
	AllowedOrigins []string       `json:"allowedOrigins"`
	Fields         datatypes.JSON `json:"fields"`
}

type UpdateWidgetRequest struct {
	Name           *string         `json:"name"`
	Template       *string         `json:"template"`
	Theme          *string         `json:"theme"`
	PrimaryColor   *string         `json:"primaryColor"`
	AllowedOrigins *[]string       `json:"allowedOrigins"`
	Fields         *datatypes.JSON `json:"fields"`
}

func (h *WidgetHandler) CreateWidgetHandler(c *gin.Context) {
	auth0ID := c.GetString("user")
	email := c.GetString("email")

	user, err := h.userService.GetOrCreateUser(email, auth0ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "user lookup failed"})
		return
	}

	var req CreateWidgetRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	widget, err := h.widgetService.CreateWidget(user.ID, req.ProjectID, req.Name, req.Template, req.Theme, req.PrimaryColor, req.AllowedOrigins, req.Fields)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, widget)
}

func (h *WidgetHandler) GetWidgetConfigHandler(c *gin.Context) {
	idStr := c.Param("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid widget ID format"})
		return
	}

	widget, err := h.widgetService.GetWidgetByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "widget not found"})
		return
	}

	// Output config as expected by api.yaml
	c.JSON(http.StatusOK, gin.H{
		"widgetId": widget.ID.String(),
		"fields":   widget.Fields,
		"theme":    widget.Theme,
	})
}

func (h *WidgetHandler) UpdateWidgetHandler(c *gin.Context) {
	auth0ID := c.GetString("user")
	email := c.GetString("email")

	user, err := h.userService.GetOrCreateUser(email, auth0ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "user lookup failed"})
		return
	}

	idStr := c.Param("id")
	widgetID, err := uuid.Parse(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid widget ID format"})
		return
	}

	var req UpdateWidgetRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	updates := make(map[string]any)
	if req.Name != nil {
		updates["name"] = *req.Name
	}
	if req.Template != nil {
		updates["template"] = *req.Template
	}
	if req.Theme != nil {
		updates["theme"] = *req.Theme
	}
	if req.PrimaryColor != nil {
		updates["primary_color"] = *req.PrimaryColor
	}
	if req.AllowedOrigins != nil {
		updates["allowed_origins"] = *req.AllowedOrigins
	}
	if req.Fields != nil {
		updates["fields"] = *req.Fields
	}

	widget, err := h.widgetService.UpdateWidget(user.ID, widgetID, updates)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, widget)
}

func (h *WidgetHandler) DeleteWidgetHandler(c *gin.Context) {
	auth0ID := c.GetString("user")
	email := c.GetString("email")

	user, err := h.userService.GetOrCreateUser(email, auth0ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "user lookup failed"})
		return
	}

	idStr := c.Param("id")
	widgetID, err := uuid.Parse(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid widget ID format"})
		return
	}

	err = h.widgetService.DeleteWidget(user.ID, widgetID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "widget deleted successfully"})
}
