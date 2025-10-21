# MCP Servers Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Node.js
1. Go to [nodejs.org](https://nodejs.org/)
2. Download and install Node.js (version 14 or higher)
3. Restart your terminal after installation
4. Verify installation: `node --version`

### Step 2: Install Dependencies
```bash
cd berserk-tattoos-website
npm install
```

### Step 3: Environment Already Configured ✅
Your `.env` file is already set up with:
- ✅ Vercel token: `[REDACTED_FOR_SECURITY]`
- ✅ Sentry token: `[REDACTED_FOR_SECURITY]`

### Step 4: Start MCP Servers
```bash
# Start all servers
npm run mcp:all

# Or start individual servers
npm run mcp:playwright  # Browser testing
npm run mcp:vercel      # Deployment
npm run mcp:sentry      # Error monitoring
npm run mcp:github      # Project management
npm run mcp:context7   # Documentation
npm run mcp:ref         # Code analysis
npm run mcp:web-search # Research
```

## 🎯 What Each Server Does

| Server | Purpose | Key Features |
|--------|---------|--------------|
| **Playwright** | Browser Testing | Automated tests, screenshots, form testing |
| **Vercel** | Deployment | Deploy site, monitor performance, analytics |
| **Sentry** | Error Monitoring | Track errors, performance, user sessions |
| **GitHub** | Project Management | Issues, PRs, CI/CD, releases |
| **Context7** | Documentation | Stripe docs, Netlify help, best practices |
| **Ref** | Code Analysis | Code search, architecture, optimization |
| **Web Search** | Research | Competitor analysis, market research |

## 🔧 Common Commands

```bash
# Development workflow
npm run test              # Run Playwright tests
npm run mcp:playwright    # Start browser testing
npm run mcp:context7      # Look up documentation

# Deployment workflow
npm run mcp:vercel        # Deploy to Vercel
npm run mcp:sentry        # Monitor errors
npm run test:headed       # Test before deployment

# Research workflow
npm run mcp:web-search    # Research competitors
npm run mcp:ref           # Analyze code
npm run mcp:github        # Manage issues
```

## 🚨 Troubleshooting

### Server Won't Start
```bash
# Check Node.js version (need 14+)
node --version

# Reinstall dependencies
npm install

# Check environment variables
cat .env
```

### Authentication Errors
- Verify tokens are correct
- Check token permissions
- Regenerate tokens if expired

### Port Conflicts
- Check if ports are in use
- Restart terminal
- Restart computer if needed

## 📚 Next Steps

1. **Read the full guide**: `MCP-SERVERS-GUIDE.md`
2. **Set up monitoring**: Configure Sentry alerts
3. **Create CI/CD**: Use GitHub MCP for automation
4. **Monitor performance**: Use Vercel analytics
5. **Research competitors**: Use Web Search MCP

## 🆘 Need Help?

- Check `MCP-SERVERS-GUIDE.md` for detailed instructions
- Look at terminal output for error messages
- Verify all environment variables are set
- Test individual servers to isolate issues

---

**Ready to go?** Start with `npm run mcp:playwright` to test your website!
