package model

import (
	"time"

	"github.com/google/uuid"
)
type Project struct {
    ID        uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
    UserID    uuid.UUID
    Name      string
    CreatedAt time.Time
    UpdatedAt time.Time

    Widgets  []Widget
}