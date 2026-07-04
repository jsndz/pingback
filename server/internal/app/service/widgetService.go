package service

import (
	"errors"

	"github.com/google/uuid"
	"github.com/jsndz/pingback/internal/app/model"
	"github.com/jsndz/pingback/internal/app/repository"
	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type WidgetService struct {
	widgetRepo  *repository.WidgetRepository
	projectRepo *repository.ProjectRepository
}

func NewWidgetService(db *gorm.DB) *WidgetService {
	return &WidgetService{
		widgetRepo:  repository.NewWidgetRepository(db),
		projectRepo: repository.NewProjectRepository(db),
	}
}

func (s *WidgetService) CreateWidget(userID uuid.UUID, projectID uuid.UUID, name string, template string, theme string, primaryColor string, allowedOrigins []string, fields datatypes.JSON) (*model.Widget, error) {
	project, err := s.projectRepo.GetByID(projectID)
	if err != nil {
		return nil, err
	}
	if project.UserID != userID {
		return nil, errors.New("unauthorized to create widget for this project")
	}

	widget := &model.Widget{
		ProjectID:      projectID,
		Name:           name,
		Template:       template,
		Theme:          theme,
		PrimaryColor:   primaryColor,
		AllowedOrigins: allowedOrigins,
		Fields:         fields,
	}
	return s.widgetRepo.Create(widget)
}

func (s *WidgetService) GetWidgetByID(id uuid.UUID) (*model.Widget, error) {
	return s.widgetRepo.GetByID(id)
}

func (s *WidgetService) UpdateWidget(userID uuid.UUID, widgetID uuid.UUID, updates map[string]any) (*model.Widget, error) {
	widget, err := s.widgetRepo.GetByID(widgetID)
	if err != nil {
		return nil, err
	}

	// Verify project ownership
	project, err := s.projectRepo.GetByID(widget.ProjectID)
	if err != nil {
		return nil, err
	}
	if project.UserID != userID {
		return nil, errors.New("unauthorized to update widget")
	}

	return s.widgetRepo.Update(widgetID.String(), updates)
}

func (s *WidgetService) DeleteWidget(userID uuid.UUID, widgetID uuid.UUID) error {
	widget, err := s.widgetRepo.GetByID(widgetID)
	if err != nil {
		return err
	}

	// Verify project ownership
	project, err := s.projectRepo.GetByID(widget.ProjectID)
	if err != nil {
		return err
	}
	if project.UserID != userID {
		return errors.New("unauthorized to delete widget")
	}

	return s.widgetRepo.Delete(widgetID.String())
}
