package model

import (
	"time"

	"github.com/google/uuid"
)

type User struct {
    ID        uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
    Auth0ID   string    `gorm:"uniqueIndex"`
    Email     string
    CreatedAt time.Time
    UpdatedAt time.Time

    Projects []Project
}
