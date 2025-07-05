package repository

import (
	"github.com/jsndz/pingback/internal/app/model"
	"gorm.io/gorm"
)

type WidgetRepository struct{
	db *gorm.DB
}

func NewWidgetRepository(db *gorm.DB) *WidgetRepository{
	return &WidgetRepository{db:db}
}


func (r *WidgetRepository) Create(widget *model.Widget) (*model.Widget ,error) {
	if err := r.db.Create(widget).Error; err != nil {
		return  nil,err
	}
	return  widget,nil
}

func (r *WidgetRepository) Get(Email string) (*model.Widget, error) {
    var widget model.Widget

	err := r.db.First(&widget, "Email = ?", Email).Error
    if err != nil {
        return nil, err 
    }
    return &widget, nil
}

func (r *WidgetRepository) Update(ID string,data map[string]any) (*model.Widget,error){
	var widget model.Widget
	if err:= r.db.Model(&widget).Where("ID = ?", ID).Updates(data).Error; err!=nil{
		return nil, err
	}
	r.db.First(&widget, ID)
	return &widget,nil
}

func (r *WidgetRepository) Delete(ID string) (error){
	var widget model.Widget
	return  r.db.Delete(&widget,ID).Error
	
}

