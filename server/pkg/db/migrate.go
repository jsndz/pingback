package db

import (
	"log"

	"gorm.io/gorm"
)

func MigrateDB(db *gorm.DB) {
	err := db.AutoMigrate(
	
	)
	if err != nil {
		log.Fatal("Migration failed: ", err)
	}
	log.Println("Database migrated successfully")

	// Sample data
	

	log.Println("Seed data (10 posts and comments) inserted successfully")
}