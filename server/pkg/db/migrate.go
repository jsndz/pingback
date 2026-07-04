package db

import (
	"log"

	"github.com/jsndz/pingback/internal/app/model"
	"gorm.io/gorm"
)

func MigrateDB(db *gorm.DB) {
	// Enable UUID extension
	if err := db.Exec("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";").Error; err != nil {
		log.Printf("Warning: Failed to create uuid-ossp extension: %v", err)
	}

	err := db.AutoMigrate(
		&model.User{},
		&model.Project{},
		&model.Widget{},
		&model.Feedback{},
	)
	if err != nil {
		log.Fatal("Migration failed: ", err)
	}
	log.Println("Database migrated successfully")
}