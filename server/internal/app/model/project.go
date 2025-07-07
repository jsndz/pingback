package model

import (
	"time"

	"github.com/google/uuid"
)
type Project struct {
	ID        uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`

	UserID    uuid.UUID `gorm:"type:uuid;not null"`
	User      User      `gorm:"foreignKey:UserID"`

	Name      string    `gorm:"type:text;not null"`

	CreatedAt time.Time `gorm:"autoCreateTime"`
	UpdatedAt time.Time `gorm:"autoUpdateTime"`

	Widgets   []Widget  `gorm:"constraint:OnDelete:CASCADE"`
}
