# adv (name to be determined)
The Spotify search you don't need and never wanted.

## Setup

You will need [Node.js](https://nodejs.org/en/) installed on your platform.

**1. Get the code**
```
git clone https://github.com/csteinmetz1/adv
```

**2. Install modules**
```
npm install
```

**3. Setup [Spotify Web API keys](https://developer.spotify.com/dashboard)**

You will need a Spotify account and then create an application to get the keys.
Once you have the keys create a new file `app/keys.ts`, with the following structure:

```typescript
export const keys = {
  client_id: 'YOUR_CLIENT_ID',
  client_secret: 'YOUR_CLIENT_SECRET',
  redirect_uri: 'http://localhost:8888/callback'
}
```

(For judging the Hackathon just message us and we can send you the `keys.ts` file)

**4. Download model**

Download the latest trained model from [here](https://drive.google.com/drive/folders/1NSJYIw4Hi5iZ7QeZ8zO5EbPCgvRiaHTs?usp=sharing).
Unzip the archive and place the model assets in the `app/public/models/` directory.s

**5. Build and run**
```
npm run prod
```

## More details

If you want to train the model with your own data follow these steps.

Navigate to the `train` directory
```
cd train
```

Install Python dependencies
```
pip install -r requirements.txt
```

Run the training script
```
python train.py
```

## License
The MIT License
Copyright (c) 2010-2019 [Christian Steinmetz](https://www.christiansteinmetz.com/) & [Sean Myers](https://seanmyers.xyz/)