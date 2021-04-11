# [nomadcoders.co] Uber Eats Clone [ENG, 2020]

<br/>

## 01. Backend

<br/>

### 004. Backend Setup

    $ npm install -g @nestjs/cli

<br/>

    $ cd app
    $ nest new backend
    $ cd backend
    $ npm run start

<br/>

http://localhost:3000/

<br/>

### 006. Apollo Server Setup

https://docs.nestjs.com/graphql/quick-start

    $ npm i @nestjs/graphql graphql-tools graphql apollo-server-express

<br/>

### 007. Our First Resolver

https://docs.nestjs.com/graphql/quick-start#code-first

<br/>

    $ nest generate module restaurants

<br/>

http://localhost:3000/graphql

<br/>

![Application](/img/pic-part01-les007-pic01.png?raw=true)

<br/>

### 008. ObjectType

<br/>

### 009. Arguments

<br/>

### 010. InputTypes and ArgumentTypes

<br/>

### 011. Validating ArgsTypes

    $ npm install class-validator class-transformer

<br/>

### 012. TypeORM and PostgreSQL

    $ docker-compose up -d

<br/>

### 015. TypeORM Setup

https://docs.nestjs.com/techniques/database

    $ npm install @nestjs/typeorm typeorm pg

<br/>

### 016. Introducing ConfigService

    $ npm install @nestjs/config
    $ npm install cross-env

<br/>

### 017. Configuring ConfigService

<br/>

### 018. Validating ConfigService

    $ npm install joi

<br/>

### 019. Our First Entity

<br/>

Run pgadmin in docker container:

```
$ docker run -e PGADMIN_DEFAULT_EMAIL='username' -e PGADMIN_DEFAULT_PASSWORD='password' -p 5555:80 --name pgadmin dpage/pgadmin4
```

<br/>

http://localhost:5555/

<br/>

Try to connect to local "host ip" - not localhost

<br/>

### 020. Data Mapper vs Active Record

<br/>

### 021. Injecting The Repository

<br/>

http://localhost:3000/graphql

<br/>

```
{
    restaurants {
        id
    }
}
```

<br/>

![Application](/img/pic-part01-les021-pic01.png?raw=true)

<br/>

### 022. Recap

<br/>

### 023. Create Restaurant

<br/>

### 024. Mapped Types

<br/>

### 025. Optional Types and Columns

<br/>

```
mutation {
  createRestaurant(input: {
    name: "Nico N",
    isVegan: false,
    address: "nico address"
  })
}
```

<br/>

**returns:**

```
{
  "data": {
    "createRestaurant": true
  }
}
```

<br/>

### 026-027. Update Restaurant

<br/>

```
mutation {
  updateRestaurant(input: {
    id: 2,
    data: {
      name: "Nico K",
    isVegan: true,
    address: "nico address upd"
    }

  })
}
```

<br/>

```
{
    restaurants {
        id,
      name,
      isVegan
      address
    }
}
```

<br/>

### 028. User Module Introduction

<br/>

### 029. User Model

    $ nest generate module users
    $ nest generate module common

<br/>

### 030. User Resolver and Service

<br/>

### 031-033. Create Account Mutation

```
// CREATE ACCOUNT
mutation {
  createAccount(input: {
    email: "myemail@gmail.com",
    password: "pass1234"
    role:Client
  }){
    ok
    error
  }
}
```

<br/>

**returns:**

```
{
  "data": {
    "createAccount": {
      "ok": true,
      "error": null
    }
  }
}
```

<br/>

### 034. An Alternative Error

<br/>

### 035. Hashing Passwords

    $ npm install bcrypt
    $ npm install --save-dev @types/bcrypt

<br/>

### 036-037. Log In

```
// LOGIN
mutation {
  login(input: {
    email: "myemail@gmail.com",
    password: "pass1234"
  }){
    ok
    error
    token
  }
}
```

<br/>

```
{
  "data": {
    "login": {
      "ok": true,
      "error": null,
      "token": "llllllllllllll"
    }
  }
}
```

<br/>

### 038. Introduction to Authentication

<br/>

### 039. Generating JWT

    $ npm install jsonwebtoken
    $ npm install --save-dev @types/jsonwebtoken

<br/>

https://randomkeygen.com/

<br/>

### 040. JWT and Modules

https://jwt.io/

    $ nest generate module jtw

<br/>

### 041-043. JWT Module

    $ nest generate service jwt

<br/>

### 044. Middlewares in NestJS

<br/>

### 045. JWT Middleware

<br/>

### 046. GraphQL Context

```
// LOGIN
```

<br/>

```
// ME
{
  me {
    email
  }
}
```

<br/>

```
// HTTP Headers
{
  "x-jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE3NjMxMTQyfQ.ggR22bX-sBM-hAOv5gcYylEL6-fvAfd7VIYgJVu1y5I"
}
```

<br/>

### 047. AuthGuard

    $ nest generate module auth

<br/>

### 048. AuthUser Decorator

<br/>

```
// ME
```

<br/>

**returns**

```
{
  "data": {
    "me": {
      "email": "myemail@gmail.com"
    }
  }
}
```

<br/>

### 049. Recap

<br/>

### 050. userProfile Mutation

```
{
  userProfile(userId:1) {
    ok,
    error,
    user {
      id
    }

  }
}
```

<br/>

**returns**

```
{
  "data": {
    "userProfile": {
      "ok": true,
      "error": null,
      "user": {
        "id": 1
      }
    }
  }
}
```

<br/>

### 051-053. updateProfile

```
// UPDATE PASSWORD
mutation{
  editProfile(input: {
    password:"123"
  }){
    ok
    error
  }
}
```

<br/>

```
mutation {
  login(input: {
    email: "myemail@gmail.com",
    password: "123"
  }){
    ok
    error
    token
  }
}
```

<br/>

### 054. Recap

<br/>

### 055. Verification Entity

<br/>

### 056. Creating Verifications

    $ npm install uuid @types/uuid

<br/>

### 056-057. Verifying User

<br/>

### 059. Cleaning the Code

<br/>

### 060. Mailgun Setup

Domain -> Sandbox###### -> Authorized Recipients

Add your email address

<br/>

### 061. Mail Module Setup

    $ nest genete module mail

<br/>

**Specify in .dev.env:**

```
MAILGUN_API_KEY=
MAILGUN_DOMAIN_NAME=
MAILGUN_FROM_EMAIL=
```

<br/>

### 062. Mailgun API

    $ npm install got
    $ npm install form-data

<br/>

### 063. Beautiful Emails

MailGun -> Templates -> Create -> Alert

```
Name: verify-email
Description: description
```

<br/>

![Application](/img/pic-part01-les063-pic01.png?raw=true)

<br/>

### 064. Refactor

<br/>

### 065. Setting Up Tests

    $ npm run test:watch

<br/>

### 066. Mocking

<br/>

### 067. Mocking part Two

<br/>

### 068. Writing Our First Test

<br/>

### 069. Recap

<br/>

### 070-071. createAccount Test

<br/>

### 072-073. login Test

<br/>

### 074. findById Test

<br/>

### 075-076. editProfile Test

<br/>

### 077. verifyEmail Test

<br/>

### 078. Conclusions

<br/>

### 079. JWT Service Test Setup

<br/>

### 080. JWT Sign Test

<br/>

### 081. JWT Verify Test

<br/>

### 082. sendVerificationEmail Test

<br/>

### 083. sendEmail Test

<br/>

### 084-085. e2e Setup

    $ docker-compose down
    $ docker-compose up -d

<br/>

    $ npm run test:e2e

<br/>

### 086-087. Testing createAccount

<br/>

### 088. Testing login

<br/>

### 089. Testing userProfile

<br/>

### 090. Testing me

<br/>

### 091. Testing editProfile

<br/>

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
