# Git & GitHub Quick Reference

## 🎯 Most Common Commands

### First Time Setup
```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

### Starting a New Project
```bash
git init                                    # Initialize repository
git add .                                   # Stage all files
git commit -m "Initial commit"              # First commit
git remote add origin <your-github-url>     # Connect to GitHub
git push -u origin main                     # Push to GitHub
```

### Daily Workflow
```bash
git status                    # Check what changed
git add .                     # Stage all changes
git commit -m "your message"  # Commit changes
git push                      # Push to GitHub
```

### Getting Updates
```bash
git pull                      # Get latest from GitHub
```

### Viewing History
```bash
git log                       # See commit history
git log --oneline            # Compact view
git diff                     # See unstaged changes
```

## 📋 Step-by-Step Guide

### Making and Pushing Changes

1. **Make changes** to your files in VS Code
2. **Save** your files (Ctrl+S)
3. **Stage** changes:
   ```bash
   git add .
   ```
4. **Commit** with a message:
   ```bash
   git commit -m "Describe what you changed"
   ```
5. **Push** to GitHub:
   ```bash
   git push
   ```

## 🔧 VS Code Shortcuts

| Action | VS Code Method |
|--------|----------------|
| View changes | Source Control icon (Ctrl+Shift+G) |
| Stage files | Click `+` next to filename |
| Stage all | Click `+` next to "Changes" |
| Commit | Type message, press Ctrl+Enter |
| Push | Click "..." → Push |

## ⚡ Quick Fixes

### Undo Last Commit (Keep Changes)
```bash
git reset --soft HEAD~1
```

### Undo Changes to a File
```bash
git checkout -- filename
```

### See Remote URL
```bash
git remote -v
```

### Change Remote URL
```bash
git remote set-url origin <new-url>
```

## 💡 Pro Tips

1. **Commit often** - Small commits are better than big ones
2. **Write clear messages** - "Update homepage" is better than "fix"
3. **Pull before push** - Especially when working with others
4. **Check status** - Use `git status` frequently

## 🆘 Need More Help?

See the full guide: [GITHUB_GUIDE.md](GITHUB_GUIDE.md)
