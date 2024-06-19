# Setup project

**Step 1:** Create a new folder and open it in VS Code. run on terminal `npm init -y` create package.json file.

**Step2:**

   install express ⇒ `npm install express`

   install mongoose ⇒ `npm install mongoose --save`

   install typescript ⇒ `npm install typescript --save-dev`

   install cors ⇒ `npm install cors`

   install dotenv ⇒ `npm install dotenv`

**Step3:** create a tsconfig file ⇒ `tsc --init`

   set rootDir as src and outDir as dist

**Step 4: C**onnect Mongoose to the server

   ```tsx
   import mongoose from "mongoose"
   async function main() {
     try {
       await mongoose.connect(config.db_url as string)
       app.listen(config.port, () => {
         console.log(`Example first app listening on port ${config.port}`)
       })
     } catch (err) {
       console.log(err)
     }
   }
   main()
   ```


**Step5:** install ts node dev ⇒ `npm i ts-node-dev --save-dev`

**Step6:** run server ⇒ `ts-node-dev --respawn --transpile-only server.ts`
<br> <br> 
These feathers are implimented:
1. create a new user
2. get all users
3. get a single user
4. update user
5. add order
6. get all orders
7. get total price of orders
8. delete a user
