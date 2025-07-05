package repository

import (
	"github.com/jsndz/pingback/internal/app/model"
	"gorm.io/gorm"
)

type ProjectRepository struct{
	db *gorm.DB
}

func NewProjectRepository(db *gorm.DB) *ProjectRepository{
	return &ProjectRepository{db:db}
}


func (r *ProjectRepository) Create(project *model.Project) (*model.Project ,error) {
	if err := r.db.Create(project).Error; err != nil {
		return  nil,err
	}
	return  project,nil
}

func (r *ProjectRepository) Get(Email string) (*model.Project, error) {
    var project model.Project

	err := r.db.First(&project, "Email = ?", Email).Error
    if err != nil {
        return nil, err 
    }
    return &project, nil
}

func (r *ProjectRepository) Update(ID string,data map[string]any) (*model.Project,error){
	var project model.Project
	if err:= r.db.Model(&project).Where("ID = ?", ID).Updates(data).Error; err!=nil{
		return nil, err
	}
	r.db.First(&project, ID)
	return &project,nil
}

func (r *ProjectRepository) Delete(ID string) (error){
	var project model.Project
	return  r.db.Delete(&project,ID).Error
	
}

