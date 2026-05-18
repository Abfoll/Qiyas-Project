import { request, Router } from "express";
import { userList } from "../utils/userList.js";

import { body, checkSchema, matchedData } from "express-validator";
import { validationResult } from "express-validator";
import { userValidationSchema } from "../utils/schema/userValidation.js";

const  userRoute  =  Router();

//Step One
userRoute.get("/api/users", (request, response) => {
  // Require an authenticated session to list users
  if (!request.session || !request.session.user) {
    return response.status(401).send({ message: "Unauthorized" });
  }
  return response.send(userList);
});

// Development helper: bypass auth and return users when not in production
if (process.env.NODE_ENV !== "production") {
  userRoute.get("/api/_dev/users", (_request, response) => {
    console.warn("Dev bypass route used: returning users without auth");
    return response.status(200).send(userList);
  });
}



//URL PARAMETRS
userRoute.get("/api/users/:id", (request, response) => {
  const userId = parseInt(request.params.id);
  if (isNaN(userId))
    return response.status(400).send({ message: "Bad reques" });
  const user = userList.find((user) => user.id === userId);
  if (!user) {
    return response.status(404).send({ message: "User not found " });
  }
  return response.send(user);
});

userRoute.delete("/api/users/:id",(request, response)=>{
  // const {params:{id}} = request;
   const userId = parseInt(request.params.id);

   const findUserIndex = userList.findIndex((user)=>user.id ===userId)
    if(findUserIndex=== -1)
      return response.sendStatus(400)
   userList.splice(findUserIndex,1)

   return  response.status(200).send(userList)

})

userRoute.patch("/api/users/:id", (request, response) => {
  const {
    body,
    params: { id },
  } = request;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return response.sendStatus(400);
  const findUserIndex = userList.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return response.sendStatus(404);
  userList[findUserIndex] = { ...userList[findUserIndex], ...body };
  return response.status(200).send(userList);
});


userRoute.put("/api/users/:id", (request, response) => {
  const { body } = request;
  const parsedId = parseInt(request.params.id);

  if (isNaN(parsedId)) return response.sendStatus(400);

  const findUserIndex = userList.findIndex((user) => user.id === parsedId);

  if (findUserIndex === -1) return response.sendStatus(404);
  userList[findUserIndex] = { id: parsedId, ...body };
  //return response.status(200).send(userList[findUserIndex]);
  return response.status(200).send(userList);
});

// userRoute.post("/api/users",
//   checkSchema(userValidationSchema),
//   [body("username")
//   .not().isEmpty()
//   .withMessage("Username is required")
//   .isString()
//   .isLength({ min: 3, max: 100 })
//   .withMessage("Username should be characters between  3- 30"),
//   body("displayName")
//   .not().isEmpty()
//   .withMessage("Display name is required")
//   .isString()
//   .isLength({ min: 2, max: 100 }),
//   body("email")
//   .not().isEmpty()
//   .withMessage("Email is required")
//   .isEmail()
//   .withMessage("Invalid email format"),
//   ],

//   (request, response) => {
//   const result = validationResult(request);
//   const data = matchedData(request);
//   console.log(result);
//   console.log(data);
//   const { body } = request;
//   const newUser = { id: userList[userList.length - 1].id + 1, ...data };
//   userList.push(newUser);
//   return response.status(201).send(newUser);
// });

userRoute.post("/api/users", (request, response) => {
  const { body } = request;
  const nextId = userList.length ? userList[userList.length - 1].id + 1 : 1;
  const newUser = { id: nextId, ...body };
  userList.push(newUser);
  return response.status(201).send(newUser);
});

export default userRoute