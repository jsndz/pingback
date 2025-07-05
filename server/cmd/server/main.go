package main

import (
	"github.com/gin-gonic/gin"
	"github.com/jsndz/pingback/routes"
)

func main() {
  router := gin.Default()

  api := router.Group("/api")
  routes.UserRoutes(api.Group("/user"))
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