package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/jsndz/pingback/middleware"
	"github.com/jsndz/pingback/pkg/db"
	"github.com/jsndz/pingback/routes"
)

func main() {
  router := gin.Default()

  // Configure CORS
  router.Use(func(c *gin.Context) {
    c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
    c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
    c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
    c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

    if c.Request.Method == "OPTIONS" {
      c.AbortWithStatus(204)
      return
    }

    c.Next()
  })

  gormDB, err := db.InitDB()
  if err != nil {
    log.Fatal(err)
  }
  db.MigrateDB(gormDB)

  kf, err := middleware.InitJWTS()
  if err != nil {
    log.Fatalf("Could not load JWKS: %v", err)
  }
  authMiddleware := middleware.JWTMiddleware(kf)

  api := router.Group("/api")
  routes.UserRoutes(api.Group("/user"), gormDB, authMiddleware)
  routes.ProjectRoutes(api.Group("/project"), gormDB, authMiddleware)
  routes.FeedbackRoutes(api.Group("/feedback"), gormDB, authMiddleware)
  routes.WidgetRoutes(api.Group("/widget"), gormDB, authMiddleware)
  
  router.StaticFile("/widget.js", "./public/widget.js")

  router.GET("/", func(c *gin.Context) {
    c.JSON(200, gin.H{
      "message": "pong",
    })
  })


  router.Run(":8080")
}