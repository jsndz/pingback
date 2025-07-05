package model

import (
	"time"

	"github.com/google/uuid"
	"github.com/lib/pq"
	"gorm.io/datatypes"
)


type Widget struct {
    ID              uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
    ProjectID       uuid.UUID
    Name            string
    Template        string            
    Theme           string   
    PrimaryColor    string          
    AllowedOrigins  pq.StringArray    `gorm:"type:text[]"` 
    Fields          datatypes.JSON  
    CreatedAt       time.Time
    UpdatedAt       time.Time

    Feedbacks []Feedback
}