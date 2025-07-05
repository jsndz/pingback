package model

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/datatypes"
)
type Feedback struct {
    ID         uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
    WidgetID   uuid.UUID
    SubmittedAt time.Time
    Data       datatypes.JSON 
    Metadata   datatypes.JSON 
}