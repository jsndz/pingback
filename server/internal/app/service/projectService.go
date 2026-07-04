package service

import (
	"github.com/google/uuid"
	"github.com/jsndz/pingback/internal/app/model"
	"github.com/jsndz/pingback/internal/app/repository"
	"gorm.io/datatypes"
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
		Widgets: []model.Widget{
			{
				Name:         "Default Widget",
				Theme:        "dark",
				IsActive:     true,
				PrimaryColor: "#B8FF00",
				Fields:       datatypes.JSON([]byte(`["content"]`)),
			},
		},
	}

	return s.projectRepo.Create(project)
}

func (s *ProjectService) ListProjects(userID uuid.UUID) ([]model.Project, error) {
	return s.projectRepo.ListByUserID(userID)
}

func (s *ProjectService) DeleteProject(userID uuid.UUID, projectID uuid.UUID) error {
	proj, err := s.projectRepo.GetByID(projectID)
	if err != nil {
		return err
	}
	if proj.UserID != userID {
		return gorm.ErrRecordNotFound // Unauthorized to delete or doesn't exist for this user
	}
	return s.projectRepo.Delete(projectID.String())
}

