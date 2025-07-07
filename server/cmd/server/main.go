package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/jsndz/pingback/pkg/db"
	"github.com/jsndz/pingback/routes"
)

func main() {
  router := gin.Default()
  db,err:= db.InitDB()
  if err!=nil {
    log.Fatal(err)
  }
  api := router.Group("/api")
  routes.UserRoutes(api.Group("/user"),db)
  routes.ProjectRoutes(api.Group("/project"))
  routes.FeedbackRoutes(api.Group("/feedback"))
  routes.WidgetRoutes(api.Group("/widget"))
  
  router.GET("/", func(c *gin.Context) {
    c.JSON(200, gin.H{
      "message": "pong",
    })
  })


  router.Run(":8080")
}