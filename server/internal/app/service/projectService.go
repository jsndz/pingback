package service

import (
	"github.com/google/uuid"
	"github.com/jsndz/pingback/internal/app/model"
	"github.com/jsndz/pingback/internal/app/repository"
	"gorm.io/gorm"
)

type ProjectService struct{
	projectRepo *repository.ProjectRepository
}

func NewProjectService(db *gorm.DB) *ProjectService{
	return &ProjectService{
		projectRepo : repository.NewProjectRepository(db),
	}
}


func (s *ProjectService) CreateProject(userID uuid.UUID, name string) (*model.Project, error) {
	project := &model.Project{
		UserID: userID,
		Name:   name,
	}

	return s.projectRepo.Create(project)
}

