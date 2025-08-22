# 🚀 QUICK SETUP - Get GPT Working in 5 Minutes

## Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

## Step 2: Navigate to Your Project
```bash
cd "C:\Users\Ibrahim\Desktop\Toddlerlunch.AI\Webflow and Cursor Collab\toddlerchefai"
```

## Step 3: Deploy to Vercel
```bash
# Login to Vercel (opens browser)
vercel login

# Deploy your project
vercel

# Answer the prompts:
# ? Set up and deploy "toddlerchefai"? [Y/n] Y
# ? Which scope? (Use arrow keys) [Your Account]
# ? Link to existing project? [y/N] N
# ? What's your project's name? toddlerchefai
# ? In which directory is your code located? ./
```

## Step 4: Add Your OpenAI API Key
```bash
# Add environment variable
vercel env add OPENAI_API_KEY

# When prompted:
# ? What's the value of OPENAI_API_KEY? [paste your sk-... key here]
# ? Add OPENAI_API_KEY to which Environments? (all) [Press Enter]
```

## Step 5: Redeploy with API Key
```bash
vercel --prod
```

## Step 6: Get Your Live URL
After deployment, you'll see something like:
```
✅  Production: https://toddlerchefai-abc123.vercel.app [copied to clipboard] [1m 45s]
```

**That's your live website URL!** Open it and test your recipe generator.

## 🧪 Test It Works

1. **Open your Vercel URL** (e.g., https://toddlerchefai-abc123.vercel.app)
2. **Fill out the recipe form** with ingredients like "chicken, rice, carrots"
3. **Click "Generate Recipe"**
4. **You should see:** "GPT is crafting your perfect recipe..."
5. **Then see:** A detailed, creative Jamie Oliver-style recipe!

## ❌ If Something Goes Wrong

**Problem: "API Error" or "Fallback to local generation"**
```bash
# Check your environment variables are set:
vercel env ls

# Should show: OPENAI_API_KEY (Production, Preview, Development)
# If missing, add it again:
vercel env add OPENAI_API_KEY
vercel --prod
```

**Problem: OpenAI billing/quota exceeded**
- Check: https://platform.openai.com/usage
- Add billing: https://platform.openai.com/account/billing

**Problem: CORS errors in browser**
- This should be handled by vercel.json
- Check browser console for specific errors

## 💰 Cost Estimate
- **Per recipe:** ~$0.01-0.03 (GPT-3.5-turbo)
- **100 recipes:** ~$1-3
- **Set a limit:** Go to OpenAI billing and set monthly limit ($5-10 to start)

## 🎉 Success Indicators

✅ **Form submits** and shows "GPT is crafting..."
✅ **Recipe appears** with creative, detailed content
✅ **Jamie Oliver style** language ("Right then!", "Absolutely brilliant!")
✅ **Specific measurements** still maintained (60g chicken, 1cm cubes)
✅ **Dietary restrictions** properly handled
✅ **No API errors** in browser console

Your recipe generator is now **GPT-powered**! 🤖✨