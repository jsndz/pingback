package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jsndz/pingback/internal/app/service"
	"gorm.io/gorm"
)


type ProjectHandler struct{
	projectService *service.ProjectService
	userService *service.UserService
}


func  NewProjectHandler(db *gorm.DB )( *ProjectHandler){
	return &ProjectHandler{
		projectService: service.NewProjectService(db),
		userService:service.NewUserService(db),
	}
}


type CreateProjectRequest struct {
	Name string `json:"name" binding:"required"`
}


func (h *ProjectHandler) CreateProjectHandler(c *gin.Context) {
	auth0ID := c.GetString("user")
	email := c.GetString("email")

	user, err := h.userService.GetOrCreateUser(email, auth0ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "user lookup failed"})
		return
	}

	var req CreateProjectRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	project, err := h.projectService.CreateProject(user.ID, req.Name)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "project creation failed"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"project": project})
}
