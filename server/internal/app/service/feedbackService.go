package service

import (
	"github.com/google/uuid"
	"github.com/jsndz/pingback/internal/app/model"
	"github.com/jsndz/pingback/internal/app/repository"
	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type FeedbackService struct{
	feedbackRepo *repository.FeedbackRepository
}

func NewFeedbackService(db *gorm.DB) *FeedbackService{
	return &FeedbackService{
		feedbackRepo : repository.NewFeedbackRepository(db),
	}
}


func (s *FeedbackService) CreateFeedback(widgetID uuid.UUID, data datatypes.JSON, metadata datatypes.JSON) (*model.Feedback, error) {
	feedback := &model.Feedback{
		WidgetID: widgetID,
		Data:     data,
		Metadata: metadata,
	}

	return s.feedbackRepo.Create(feedback)
}

func (s *FeedbackService) GetFeedback(widgetID uuid.UUID) (*model.Feedback, error) {
	return s.feedbackRepo.GetAll(widgetID)
}



