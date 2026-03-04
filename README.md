# ChatByMuaaz Frontend - VS Code Setup Guide

Complete step-by-step instructions to run the ChatByMuaaz frontend application in Visual Studio Code.

## 📋 Prerequisites

Before you begin, make sure you have installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **pnpm** - [Install pnpm](https://pnpm.io/installation)
- **Visual Studio Code** - [Download](https://code.visualstudio.com/)
- **Git** (optional) - [Download](https://git-scm.com/)

## ✅ Step-by-Step Setup

### Step 1: Extract the ZIP File

1. Download the `chat-by-muaaz-frontend.zip` file
2. Right-click on the ZIP file
3. Select **"Extract All"** (Windows) or **"Extract"** (Mac)
4. Choose a location (e.g., Desktop or Documents)

### Step 2: Open Project in VS Code

**Option A: Using VS Code GUI**
1. Open Visual Studio Code
2. Click **File** → **Open Folder**
3. Navigate to the extracted `chat-by-muaaz-frontend` folder
4. Click **Select Folder**

**Option B: Using Terminal**
```bash
# Navigate to the project folder
cd path/to/chat-by-muaaz-frontend

# Open in VS Code
code .
```

### Step 3: Open Terminal in VS Code

1. Press **Ctrl + `** (backtick) on Windows/Linux
2. Or press **Cmd + `** on Mac
3. Or go to **Terminal** → **New Terminal** in the menu

You should see a terminal panel at the bottom of VS Code.

### Step 4: Install Dependencies

Run ONE of these commands in the VS Code terminal:

**Using npm (recommended for beginners):**
```bash
npm install
```

**Using pnpm (faster):**
```bash
pnpm install
```

**Using yarn:**
```bash
yarn install
```

⏳ This will take 2-5 minutes. Wait for it to complete.

### Step 5: Start the Development Server

Run this command in the terminal:

```bash
npm run dev
```

Or if you used pnpm:
```bash
pnpm dev
```

You should see output like:
```
➜  Local:   http://localhost:3000/
➜  Network: http://192.168.x.x:3000/
```

### Step 6: Open in Browser

1. Click on the **Local URL** (http://localhost:3000/) in the terminal
2. Or manually open your browser and go to: **http://localhost:3000**

✅ The ChatByMuaaz application should now be running!

## 🔧 Configure API Endpoint (Important)

To connect to your backend API:

1. In VS Code, open: `client/src/utils/constants.js`
2. Find line 4:
```javascript
BASE_URL: import.meta.env.VITE_FRONTEND_FORGE_API_URL || 'http://localhost:5300/api',
```

3. Replace `http://localhost:5300/api` with your actual backend URL:
```javascript
BASE_URL: 'http://your-backend-url:port/api',
```

4. Save the file (Ctrl+S or Cmd+S)
5. The app will automatically reload

## 🧪 Test the Application

### Login Page
- You should see the ChatByMuaaz login page
- Try creating a test account or logging in with existing credentials

### Chat Interface
- After login, you'll see the main chat interface
- The sidebar shows your chats
- Click on a chat to open the message panel

## 📝 Useful Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Check code quality |
| `npm run format` | Format code |

## 🐛 Troubleshooting

### Issue: "Port 3000 is already in use"
**Solution:**
```bash
# Kill the process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

Then run `npm run dev` again.

### Issue: "npm: command not found"
**Solution:** Node.js is not installed. Download and install from [nodejs.org](https://nodejs.org/)

### Issue: Module not found errors
**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Issue: "Cannot find module 'vite'"
**Solution:**
```bash
npm install
npm run dev
```

### Issue: Blank page or errors in browser console
**Solution:**
1. Open browser DevTools (F12)
2. Check the Console tab for errors
3. Make sure the API endpoint is correctly configured
4. Check that your backend API is running

## 🌐 Access from Other Devices

To access the app from another computer on your network:

1. Find your computer's IP address:
   - **Windows:** Run `ipconfig` in command prompt, look for "IPv4 Address"
   - **Mac/Linux:** Run `ifconfig` in terminal, look for "inet"

2. Use this URL on another device:
   ```
   http://YOUR_IP_ADDRESS:3000
   ```

## 📁 Project Structure Quick Reference

```
chat-by-muaaz-frontend/
├── client/
│   ├── src/
│   │   ├── api/              # API integration
│   │   ├── pages/            # Login, Chat pages
│   │   ├── styles/           # CSS files
│   │   ├── utils/            # Helper functions
│   │   ├── App.js            # Main app component
│   │   └── main.js           # Entry point
│   └── index.html            # HTML template
├── package.json              # Dependencies
├── vite.config.js            # Vite configuration
├── README.md                 # Full documentation
└── DESIGN.md                 # Design system
```

## 🚀 Next Steps

1. **Test Authentication** - Create an account and login
2. **Connect Backend** - Make sure your ChatByMuaaz backend is running
3. **Test Messaging** - Send messages and verify they work
4. **Customize** - Modify colors, fonts, or features as needed

## 📚 Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [JavaScript MDN Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [VS Code Shortcuts](https://code.visualstudio.com/docs/getstarted/keybindings)

## ✨ Tips for Development

1. **Hot Reload** - Changes to files automatically reload in the browser
2. **DevTools** - Press F12 to open browser developer tools
3. **Terminal** - Use Ctrl+` to toggle terminal in VS Code
4. **Extensions** - Install "Live Server" or "Thunder Client" for better development

## 🆘 Need Help?

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the error message in the browser console (F12)
3. Check the terminal output for error messages
4. Ensure all prerequisites are installed

---

**Happy Coding! 🎉**

For more detailed information, see README.md and DESIGN.md in the project folder.
