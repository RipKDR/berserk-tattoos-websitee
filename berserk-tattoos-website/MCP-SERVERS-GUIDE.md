# MCP Servers Setup Guide - Berserk Tattoos

This guide covers the complete setup of all MCP (Model Context Protocol) servers for the Berserk Tattoos website development.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd berserk-tattoos-website
npm install
```

### 2. Configure Environment
```bash
# Copy the example environment file
cp env.example .env

# Edit .env with your actual tokens
nano .env
```

### 3. Start MCP Servers
```bash
# Start all MCP servers
npm run mcp:all

# Or start individual servers
npm run mcp:playwright
npm run mcp:vercel
npm run mcp:sentry
```

---

## 📋 Available MCP Servers

### 1. **Playwright MCP** ✅ (Already Configured)
**Purpose:** Browser automation and testing
**Benefits:**
- Automated testing across browsers
- Screenshot capture
- Form interaction testing
- Performance monitoring
- Mobile responsiveness testing

**Usage:**
```bash
npm run mcp:playwright
```

### 2. **Vercel MCP** 🆕
**Purpose:** Deployment and analytics
**Benefits:**
- Deploy to Vercel platform
- Monitor deployment status
- View analytics and performance
- Manage domains and SSL
- Preview deployments

**Setup:**
1. Create Vercel account at [vercel.com](https://vercel.com)
2. Get API token from [vercel.com/account/tokens](https://vercel.com/account/tokens)
3. Add to `.env`: `VERCEL_TOKEN=your_token_here`

**Usage:**
```bash
npm run mcp:vercel
```

### 3. **Sentry MCP** 🆕
**Purpose:** Error monitoring and performance tracking
**Benefits:**
- Real-time error monitoring
- Performance insights
- User session tracking
- Release tracking
- Custom alerts

**Setup:**
1. Create Sentry account at [sentry.io](https://sentry.io)
2. Create organization: `berserk-tattoos`
3. Create project: `berserk-tattoos-website`
4. Get auth token from [sentry.io/settings/account/api/auth-tokens/](https://sentry.io/settings/account/api/auth-tokens/)
5. Add to `.env`:
   ```
   SENTRY_AUTH_TOKEN=your_token_here
   SENTRY_ORG=berserk-tattoos
   SENTRY_PROJECT=berserk-tattoos-website
   ```

**Usage:**
```bash
npm run mcp:sentry
```

### 4. **GitHub MCP** 🆕
**Purpose:** Project management and CI/CD
**Benefits:**
- Issue and project management
- Pull request automation
- CI/CD workflow management
- Code review assistance
- Release management

**Setup:**
1. Create GitHub token at [github.com/settings/tokens](https://github.com/settings/tokens)
2. Add to `.env`: `GITHUB_TOKEN=your_token_here`

**Usage:**
```bash
npm run mcp:github
```

### 5. **Context7 MCP** 🆕
**Purpose:** Documentation and reference
**Benefits:**
- Access to Stripe documentation
- Netlify configuration help
- Playwright testing guides
- Web development best practices
- API reference materials

**Usage:**
```bash
npm run mcp:context7
```

### 6. **Ref MCP** 🆕
**Purpose:** Code analysis and search
**Benefits:**
- Code search and analysis
- Architecture insights
- Dependency analysis
- Performance optimization suggestions
- Security vulnerability scanning

**Usage:**
```bash
npm run mcp:ref
```

### 7. **Web Search MCP** 🆕
**Purpose:** Research and competitor analysis
**Benefits:**
- Competitor research
- Market analysis
- Feature research
- SEO insights
- Industry trends

**Usage:**
```bash
npm run mcp:web-search
```

---

## 🔧 Configuration Files

### Main Configuration (`mcp-config.json`)
```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"],
      "env": {
        "NODE_ENV": "development"
      }
    },
    "vercel": {
      "command": "npx",
      "args": ["@vercel/mcp@latest"],
      "env": {
        "VERCEL_TOKEN": "${VERCEL_TOKEN}"
      }
    },
    "sentry": {
      "command": "npx",
      "args": ["@sentry/mcp@latest"],
      "env": {
        "SENTRY_AUTH_TOKEN": "${SENTRY_AUTH_TOKEN}",
        "SENTRY_ORG": "berserk-tattoos",
        "SENTRY_PROJECT": "berserk-tattoos-website"
      }
    },
    "github": {
      "command": "npx",
      "args": ["@github/mcp@latest"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "context7": {
      "command": "npx",
      "args": ["@context7/mcp@latest"]
    },
    "ref": {
      "command": "npx",
      "args": ["@ref/mcp@latest"]
    },
    "web-search": {
      "command": "npx",
      "args": ["@web-search/mcp@latest"]
    }
  }
}
```

### Environment Variables (`.env`)
```env
# Vercel Configuration
VERCEL_TOKEN=your_vercel_token_here

# Sentry Configuration
SENTRY_AUTH_TOKEN=your_sentry_auth_token_here
SENTRY_ORG=berserk-tattoos
SENTRY_PROJECT=berserk-tattoos-website

# GitHub Configuration
GITHUB_TOKEN=your_github_token_here

# Stripe Configuration (existing)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Development Configuration
NODE_ENV=development
URL=http://localhost:8888
```

---

## 🎯 Use Cases for Each MCP Server

### **Development Workflow**
1. **Playwright** - Test new features and bug fixes
2. **Context7** - Look up documentation and best practices
3. **Ref** - Analyze code quality and performance
4. **GitHub** - Manage issues and pull requests

### **Deployment & Monitoring**
1. **Vercel** - Deploy and monitor deployments
2. **Sentry** - Monitor errors and performance
3. **Playwright** - Run automated tests before deployment

### **Business & Research**
1. **Web Search** - Research competitors and market trends
2. **Sentry** - Analyze user behavior and performance
3. **Vercel** - Monitor site analytics and traffic

---

## 🚨 Troubleshooting

### Common Issues

#### 1. **MCP Server Not Starting**
```bash
# Check if Node.js is installed
node --version

# Check if dependencies are installed
npm list

# Reinstall dependencies
npm install
```

#### 2. **Authentication Errors**
- Verify tokens are correct in `.env`
- Check token permissions and expiration
- Regenerate tokens if needed

#### 3. **Port Conflicts**
- Check if ports are already in use
- Modify port configuration if needed
- Restart your system if necessary

#### 4. **Permission Errors**
- Run terminal as administrator (Windows)
- Check file permissions (Linux/Mac)
- Verify npm global permissions

### Getting Help

1. **Check Logs**: Look at terminal output for error messages
2. **Verify Configuration**: Ensure all environment variables are set
3. **Test Individual Servers**: Start servers one by one to isolate issues
4. **Check Documentation**: Refer to individual MCP server documentation

---

## 📈 Performance Optimization

### **Resource Management**
- Start only needed MCP servers
- Use `npm run mcp:all` for development
- Stop unused servers to free resources

### **Monitoring**
- Use Sentry MCP for performance monitoring
- Use Vercel MCP for deployment analytics
- Use Playwright MCP for automated performance testing

---

## 🔄 Maintenance

### **Regular Updates**
```bash
# Update all MCP dependencies
npm update

# Check for security vulnerabilities
npm audit

# Update individual packages
npm install @playwright/mcp@latest
```

### **Backup Configuration**
- Keep `.env` file secure and backed up
- Version control `mcp-config.json`
- Document any custom configurations

---

## 🎉 Next Steps

1. **Set up tokens** for Vercel, Sentry, and GitHub
2. **Test each MCP server** individually
3. **Integrate with your development workflow**
4. **Set up monitoring and alerts**
5. **Train team members** on MCP server usage

---

## 📚 Additional Resources

- [MCP Documentation](https://modelcontextprotocol.io/)
- [Playwright Documentation](https://playwright.dev/)
- [Vercel Documentation](https://vercel.com/docs)
- [Sentry Documentation](https://docs.sentry.io/)
- [GitHub API Documentation](https://docs.github.com/en/rest)

---

**Need help?** Check the troubleshooting section or refer to the individual MCP server documentation.
