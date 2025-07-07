package model

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/datatypes"
)
type Feedback struct {
	ID          uuid.UUID      `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	WidgetID    uuid.UUID      `gorm:"type:uuid;not null"`
	Widget      Widget         `gorm:"foreignKey:WidgetID"`

	SubmittedAt time.Time      `gorm:"autoCreateTime"`

	Data        datatypes.JSON `gorm:"type:jsonb;not null"`
	Metadata    datatypes.JSON `gorm:"type:jsonb"`
}

