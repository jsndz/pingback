package repository

import (
	"github.com/jsndz/pingback/internal/app/model"
	"gorm.io/gorm"
)

type FeedbackRepository struct{
	db *gorm.DB
}

func NewFeedbackRepository(db *gorm.DB) *FeedbackRepository{
	return &FeedbackRepository{db:db}
}


func (r *FeedbackRepository) Create(feedback *model.Feedback) (*model.Feedback ,error) {
	if err := r.db.Create(feedback).Error; err != nil {
		return  nil,err
	}
	return  feedback,nil
}

func (r *FeedbackRepository) Get(Email string) (*model.Feedback, error) {
    var feedback model.Feedback

	err := r.db.First(&feedback, "Email = ?", Email).Error
    if err != nil {
        return nil, err 
    }
    return &feedback, nil
}

func (r *FeedbackRepository) Update(ID string,data map[string]any) (*model.Feedback,error){
	var feedback model.Feedback
	if err:= r.db.Model(&feedback).Where("ID = ?", ID).Updates(data).Error; err!=nil{
		return nil, err
	}
	r.db.First(&feedback, ID)
	return &feedback,nil
}

func (r *FeedbackRepository) Delete(ID string) (error){
	var feedback model.Feedback
	return  r.db.Delete(&feedback,ID).Error
	
}

