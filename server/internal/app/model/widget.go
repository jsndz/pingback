package model

import (
	"time"

	"github.com/google/uuid"
	"github.com/lib/pq"
	"gorm.io/datatypes"
)


type Widget struct {
	ID             uuid.UUID      `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	ProjectID      uuid.UUID      `gorm:"type:uuid;not null"`
	Project        Project        `gorm:"foreignKey:ProjectID"`

	Name           string         `gorm:"type:text;not null"`
	Template       string         `gorm:"type:text"`
	Theme          string         `gorm:"type:text"`
	IsActive       bool           `gorm:"default:true"`
	PrimaryColor   string         `gorm:"type:text"`
	AllowedOrigins pq.StringArray `gorm:"type:text[]"`

	Fields         datatypes.JSON `gorm:"type:jsonb"`

	CreatedAt      time.Time      `gorm:"autoCreateTime"`
	UpdatedAt      time.Time      `gorm:"autoUpdateTime"`

	Feedbacks      []Feedback     `gorm:"constraint:OnDelete:CASCADE"`
}
