package middleware

import (
	"context"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/MicahParks/keyfunc/v3"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/jsndz/pingback/pkg/utils"
)


var AUTH0_AUDIENCE = utils.GetEnv("AUTH0_AUDIENCE")
var AUTH0_DOMAIN = utils.GetEnv("AUTH0_DOMAIN")
var Auth0JWKSURL = AUTH0_DOMAIN + ".well-known/jwks.json"


func InitJWTS()(keyfunc.Keyfunc, error){    
	ctx := context.Background()
	var err error
    override := keyfunc.Override{
        RefreshInterval: 1 * time.Hour,
        RefreshErrorHandlerFunc: func(u string) func(ctx context.Context, err error) {
            return func(ctx context.Context, err error) {
                log.Printf("[JWKS ERROR] URL: %s, error: %v", u, err)
            }
        },
    }

    kf, err := keyfunc.NewDefaultOverrideCtx(ctx, []string{Auth0JWKSURL}, override)
    if err != nil {
        log.Fatalf("Could not load JWKS: %v", err)
    }
    return kf,err
}

func JWTMiddleware( kf keyfunc.Keyfunc) (gin.HandlerFunc) {
	return func( c *gin.Context){
		authHeader := c.GetHeader("Authorization")
		if(!strings.HasPrefix(authHeader, "Bearer ")){
			c.AbortWithStatusJSON(http.StatusUnauthorized,gin.H{"error": "Missing token"})
			return 
		}

		tokenStr := strings.TrimPrefix(authHeader, "Bearer ")


		jwtToken,err :=jwt.Parse(tokenStr,kf.Keyfunc ,jwt.WithValidMethods([]string{"RS256"}))
		if err!=nil{
			c.AbortWithStatusJSON(http.StatusUnauthorized,gin.H{"error": "Couldn't parse token"})
			return 
		}

		claims,ok:= jwtToken.Claims.(jwt.MapClaims)
		if !ok {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid claims"})
			return
		}
		userId := claims["sub"]	
		email := claims["email"]	

		c.Set("user", userId)
		c.Set("email", email)	
		c.Next()
	}
}