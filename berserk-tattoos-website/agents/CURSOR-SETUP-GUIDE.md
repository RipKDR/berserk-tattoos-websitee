# CURSOR IDE SETUP GUIDE
**Complete workspace configuration for Berserk Tattoos project**

---

## 🚀 **STEP 1: IMPORT PROJECT INTO CURSOR**

### **Initial Setup (5 minutes)**

1. **Download all files** from the outputs folder
2. **Create project folder** on your computer:
   ```
   ~/Projects/berserk-tattoos-website/
   ```
3. **Open Cursor** and select "Open Folder"
4. **Navigate** to your project folder
5. **Drag and drop** all downloaded files into the folder in Cursor

### **Expected Folder Structure:**
```
berserk-tattoos-website/
├── index.html ✅
├── artists.html ✅
├── book.html ✅
├── 404.html ✅
├── robots.txt ✅
├── sitemap.xml ✅
├── manifest.json ✅
├── netlify.toml ✅
├── .gitignore ✅
├── README.md ✅
├── IMPLEMENTATION-CHECKLIST.md ✅
├── ASSETS-GENERATION-GUIDE.md ✅
├── PROMPT-OPTIMIZATION-GUIDE.md ✅
├── CURSOR-SETUP-GUIDE.md ✅ (this file)
├── favicon.ico ⏳ (you'll create)
├── apple-touch-icon.png ⏳
├── icon-192.png ⏳
├── icon-512.png ⏳
├── og-image.jpg ⏳
└── images/
    ├── artists/
    │   ├── amelia.jpg ⏳
    │   ├── ben.jpg ⏳
    │   └── monique.jpg ⏳
    └── portfolio/
        ├── amelia-1.jpg through amelia-8.jpg ⏳
        ├── ben-1.jpg through ben-8.jpg ⏳
        └── monique-1.jpg through monique-8.jpg ⏳
```

---

## ⚙️ **STEP 2: CURSOR CONFIGURATION**

### **Recommended Settings**

Press `Cmd + ,` (Mac) or `Ctrl + ,` (Windows) to open Settings, then configure:

#### **Editor Settings:**
```json
{
  "editor.fontSize": 14,
  "editor.fontFamily": "'Fira Code', 'Cascadia Code', Consolas, monospace",
  "editor.fontLigatures": true,
  "editor.lineHeight": 1.6,
  "editor.formatOnSave": true,
  "editor.tabSize": 2,
  "editor.wordWrap": "on",
  "editor.minimap.enabled": false,
  "editor.bracketPairColorization.enabled": true,
  "editor.guides.bracketPairs": true,
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000
}
```

#### **HTML Settings:**
```json
{
  "html.format.wrapLineLength": 120,
  "html.format.wrapAttributes": "auto",
  "html.autoClosingTags": true,
  "emmet.includeLanguages": {
    "html": "html"
  }
}
```

#### **File Associations:**
```json
{
  "files.associations": {
    "*.html": "html",
    "*.css": "css",
    "*.js": "javascript",
    "*.md": "markdown"
  }
}
```

---

## 🔌 **STEP 3: RECOMMENDED EXTENSIONS**

Install these extensions for optimal workflow:

### **Essential:**
1. **Live Server** (Ritwick Dey)
   - Right-click HTML → "Open with Live Server"
   - Auto-refresh on save
   - Install: Search "Live Server" in Extensions

2. **HTMLHint** (HTMLHint)
   - HTML linting and validation
   - Catches errors automatically

3. **Prettier - Code Formatter** (Prettier)
   - Auto-format HTML/CSS/JS
   - Configure: Format on Save

### **Recommended:**
4. **Auto Rename Tag** (Jun Han)
   - Auto-rename paired HTML tags
   
5. **IntelliSense for CSS** (Zignd)
   - CSS class name completion
   
6. **Path Intellisense** (Christian Kohler)
   - Autocomplete file paths
   
7. **Color Highlight** (Sergii Naumov)
   - Visualize colors in code

### **Optional (Nice to Have):**
8. **Error Lens** (Alexander)
   - Show errors inline in code
   
9. **TODO Highlight** (Wayou Liu)
   - Highlight TODO comments
   
10. **GitLens** (GitKraken)
    - Enhanced Git capabilities

---

## 🎨 **STEP 4: CURSOR AI FEATURES**

### **Using Cursor AI for This Project**

#### **Cmd+K (Quick Edit)**
- Select code you want to modify
- Press `Cmd+K` (Mac) or `Ctrl+K` (Windows)
- Type your instruction, e.g.:
  - "Add a fade-in animation to this section"
  - "Make this responsive for mobile"
  - "Add alt text to all images"

#### **Cmd+L (Chat)**
- Press `Cmd+L` to open Cursor Chat
- Ask questions about your code:
  - "How do I add lazy loading to images?"
  - "Explain this JavaScript function"
  - "Debug this CSS layout issue"

#### **Useful Prompts for This Project:**
```
"Add lazy loading to all images in the gallery"
"Make the mobile menu accessible with keyboard navigation"
"Add a loading state to the booking form"
"Optimize the hero section for Core Web Vitals"
"Add proper ARIA labels to navigation"
```

---

## 🧪 **STEP 5: LOCAL DEVELOPMENT SERVER**

### **Option A: Live Server Extension (Recommended)**

1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"
4. Browser opens at `http://localhost:5500`
5. Changes auto-reload on save

### **Option B: Python SimpleHTTPServer**

```bash
# In project folder, run:
python3 -m http.server 8000

# Or Python 2:
python -m SimpleHTTPServer 8000

# Open browser to:
http://localhost:8000
```

### **Option C: Node.js http-server**

```bash
# Install globally:
npm install -g http-server

# Run in project folder:
http-server

# Opens at:
http://localhost:8080
```

---

## ⌨️ **STEP 6: ESSENTIAL KEYBOARD SHORTCUTS**

### **Cursor-Specific:**
- `Cmd+K` / `Ctrl+K` - Quick AI Edit
- `Cmd+L` / `Ctrl+L` - Open AI Chat
- `Cmd+I` / `Ctrl+I` - Inline AI Completions

### **General Editing:**
- `Cmd+P` / `Ctrl+P` - Quick File Open
- `Cmd+Shift+P` / `Ctrl+Shift+P` - Command Palette
- `Cmd+F` / `Ctrl+F` - Find in File
- `Cmd+Shift+F` / `Ctrl+Shift+F` - Find in All Files
- `Cmd+D` / `Ctrl+D` - Select Next Occurrence
- `Alt+Up/Down` - Move Line Up/Down
- `Shift+Alt+Up/Down` - Duplicate Line Up/Down

### **Multi-Cursor:**
- `Alt+Click` - Add Cursor
- `Cmd+Alt+Up/Down` / `Ctrl+Alt+Up/Down` - Add Cursor Above/Below
- `Cmd+Shift+L` / `Ctrl+Shift+L` - Select All Occurrences

### **HTML-Specific:**
- `!` then `Tab` - HTML5 Boilerplate
- `.classname` then `Tab` - Create div with class
- `#idname` then `Tab` - Create div with ID
- `ul>li*5` then `Tab` - Create list with 5 items

---

## 🐛 **STEP 7: DEBUGGING & TESTING**

### **HTML Validation:**
1. Open Command Palette (`Cmd+Shift+P`)
2. Type "View in Browser"
3. Right-click → "Inspect" → Check Console for errors

### **Check for Issues:**
```
Common Issues to Look For:
✓ Missing image files
✓ Broken internal links
✓ JavaScript console errors
✓ CSS not applying
✓ Forms not submitting
```

### **Browser DevTools Workflow:**
1. Open site in browser
2. Press `F12` or right-click → "Inspect"
3. Check **Console** tab for errors
4. Check **Network** tab for 404s
5. Check **Elements** tab for CSS issues
6. Use **Lighthouse** for performance audit

---

## 📁 **STEP 8: FILE ORGANIZATION TIPS**

### **Cursor Workspace Tips:**

1. **Use Breadcrumbs** - Shows file path at top
2. **Split Editor** - `Cmd+\` to view multiple files
3. **File Explorer** - `Cmd+Shift+E` to toggle sidebar
4. **Search Across Files** - `Cmd+Shift+F` for project-wide search

### **Recommended Layout:**
```
Left Sidebar: File Explorer
Center: HTML file (main editor)
Right: Split view for CSS/JS
Bottom: Terminal (for commands)
```

---

## 🔄 **STEP 9: VERSION CONTROL (GIT)**

### **Initialize Git Repository:**

```bash
# In Cursor's integrated terminal (Ctrl+`):
git init
git add .
git commit -m "Initial commit - Berserk Tattoos website"
```

### **Create GitHub Repository:**

1. Go to [github.com](https://github.com)
2. Click "New Repository"
3. Name: `berserk-tattoos-website`
4. Don't initialize with README (you have one)
5. Copy the commands shown:

```bash
git remote add origin https://github.com/yourusername/berserk-tattoos-website.git
git branch -M main
git push -u origin main
```

### **Useful Git Commands in Cursor:**
```bash
git status                    # Check changes
git add .                     # Stage all changes
git commit -m "message"       # Commit changes
git push                      # Push to GitHub
git log --oneline             # View commit history
```

---

## 🎯 **STEP 10: WORKFLOW CHECKLIST**

### **Daily Workflow:**

1. **Open Cursor** → Open project folder
2. **Start Live Server** → Right-click index.html → "Open with Live Server"
3. **Make Changes** → Edit HTML/CSS/JS
4. **Auto-Save** → Changes auto-save and reload
5. **Test in Browser** → Check functionality
6. **Commit Changes** → Git commit when feature complete

### **Before Deployment:**

- [ ] All images added and optimized
- [ ] Formspree ID configured in book.html
- [ ] Google Analytics ID added to all pages
- [ ] Test all links (internal and external)
- [ ] Test form submission
- [ ] Test mobile responsiveness (Chrome DevTools)
- [ ] Run HTML validator (validator.w3.org)
- [ ] Check browser console for errors
- [ ] Test in multiple browsers (Chrome, Safari, Firefox)

---

## 🚨 **COMMON ISSUES & SOLUTIONS**

### **Issue: Live Server Not Working**
**Solution:**
1. Uninstall and reinstall Live Server extension
2. Check port isn't in use (kill process on port 5500)
3. Try different port in settings

### **Issue: Changes Not Showing**
**Solution:**
1. Hard refresh browser (`Cmd+Shift+R` / `Ctrl+F5`)
2. Clear browser cache
3. Check file is actually saved (dot in tab means unsaved)

### **Issue: Images Not Loading**
**Solution:**
1. Check file paths (case-sensitive!)
2. Verify images are in correct folders
3. Check file extensions (.jpg not .JPG)
4. Use browser DevTools → Network tab to see 404s

### **Issue: CSS Not Applying**
**Solution:**
1. Check for typos in class names
2. Check CSS selector specificity
3. Use browser DevTools → Elements → Styles panel
4. Check if CSS is in correct `<style>` tag

---

## 📊 **CURSOR AI BEST PRACTICES**

### **Effective Prompts:**

**Good:**
```
"Add lazy loading to all images in the gallery section 
with a fadeIn animation when they load"
```

**Bad:**
```
"make images better"
```

### **Project-Specific AI Workflows:**

1. **Batch Updates:**
   ```
   Select all image tags → Cmd+K → 
   "Add alt text describing each image's content"
   ```

2. **Accessibility Improvements:**
   ```
   Select navigation → Cmd+K → 
   "Add proper ARIA labels for screen readers"
   ```

3. **Performance Optimization:**
   ```
   Select gallery section → Cmd+K → 
   "Add IntersectionObserver for lazy loading"
   ```

---

## ✅ **FINAL SETUP CHECKLIST**

Before you start coding, verify:

- [ ] Cursor installed and opened
- [ ] Project folder created and opened in Cursor
- [ ] All 14 files from downloads present
- [ ] images/ folder structure created
- [ ] Live Server extension installed
- [ ] Prettier extension installed
- [ ] HTMLHint extension installed
- [ ] Settings configured (format on save, etc.)
- [ ] Git initialized (optional but recommended)
- [ ] Local dev server working (Live Server)
- [ ] Browser DevTools open and ready
- [ ] This guide bookmarked for reference

---

## 🎓 **LEARNING RESOURCES**

### **Cursor Docs:**
- Official Docs: https://cursor.sh/docs
- Keyboard Shortcuts: `Cmd+K` then `Cmd+S`

### **HTML/CSS/JS:**
- MDN Web Docs: https://developer.mozilla.org
- CSS-Tricks: https://css-tricks.com
- Can I Use: https://caniuse.com

### **Performance:**
- PageSpeed Insights: https://pagespeed.web.dev
- GTmetrix: https://gtmetrix.com

---

## 🚀 **YOU'RE READY!**

Your Cursor workspace is now fully configured for the Berserk Tattoos project.

**Next Steps:**
1. Follow the ASSETS-GENERATION-GUIDE.md to create missing images
2. Use IMPLEMENTATION-CHECKLIST.md for deployment steps
3. Reference README.md for troubleshooting

**Start coding! Your environment is production-ready.** 💪