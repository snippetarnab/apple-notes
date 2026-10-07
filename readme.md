- Basic routing for Crud Operation.
```js

app.get("/api/applenotes",(req,res)=>{
    res.status(200).json({message:`Note fetches successfully.`})
})
app.post("/api/applenotes",(req,res)=>{
    res.status(201).json({message:`Note created successfully.`})
})
app.put("/api/applenotes/:id",(req,res)=>{
    res.status(200).json({message:`Note updated successfully.`})
})
app.delete("/api/applenotes",(req,res)=>{
    res.status(200).json({message:`Notes fetch successfully.`})
})
```

## Clerk authentication

1. Create a Clerk application in the Clerk Dashboard and enable your preferred sign-in methods.
2. Copy `ui/.env.example` to `ui/.env.local` and set `VITE_CLERK_PUBLISHABLE_KEY` to the application's publishable key.
3. In `server/.env`, preserve/set `DATABASE_URL` and add both `CLERK_PUBLISHABLE_KEY` (`pk_test_...` or `pk_live_...`) and `CLERK_SECRET_KEY` (`sk_test_...` or `sk_live_...`) from the Clerk Dashboard. The Express middleware needs both keys. Keep the secret key private.
4. Install dependencies with `npm install --prefix server` and `npm install --prefix ui`, then start the API and UI using their development scripts.

The UI provides Clerk sign-up and sign-in pages at `/sign-up` and `/sign-in`. Note API requests include a Clerk session token, and the API stores and filters notes by Clerk user ID. Existing notes without a `userId` are not exposed to signed-in users; assign them to an account explicitly if they need to be retained.