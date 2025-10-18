# GitHub Guide for Beginners

Welcome! This guide will help you push your code from VS Code to GitHub. Don't worry if you're new to this - we'll walk through everything step by step.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Setting Up Git and GitHub](#setting-up-git-and-github)
3. [Using VS Code's Built-in Git Features](#using-vs-codes-built-in-git-features)
4. [Command Line Method (Alternative)](#command-line-method-alternative)
5. [Common Issues and Solutions](#common-issues-and-solutions)

## Prerequisites

Before you start, make sure you have:
- [ ] Visual Studio Code installed
- [ ] A GitHub account (sign up at [github.com](https://github.com))
- [ ] Git installed on your computer

### Installing Git

**Windows:**
- Download from [git-scm.com](https://git-scm.com/)
- Run the installer with default settings

**Mac:**
- Open Terminal and type: `git --version`
- If not installed, it will prompt you to install

**Linux:**
- Ubuntu/Debian: `sudo apt-get install git`
- Fedora: `sudo dnf install git`

## Setting Up Git and GitHub

### 1. Configure Git (First Time Only)

Open VS Code's integrated terminal (View → Terminal or Ctrl+`) and run:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Replace "Your Name" and email with your actual details.

### 2. Connect to GitHub

You have two options:

#### Option A: Using GitHub's VS Code Extension (Recommended)
1. Install the "GitHub Pull Requests and Issues" extension in VS Code
2. Click on the Accounts icon (bottom left)
3. Select "Sign in with GitHub"
4. Follow the authentication steps

#### Option B: Using Personal Access Token
1. Go to GitHub.com → Settings → Developer settings → Personal access tokens
2. Generate a new token with "repo" permissions
3. Save this token securely (you'll use it as your password)

## Using VS Code's Built-in Git Features

### Step 1: Initialize Your Repository (If Not Already Done)

1. Open your portfolio folder in VS Code
2. Click on the Source Control icon (left sidebar, looks like a branch)
3. Click "Initialize Repository"

### Step 2: Stage Your Changes

In the Source Control panel:
1. You'll see all your changed files
2. Hover over each file and click the `+` icon to stage it
   - Or click `+` next to "Changes" to stage all files at once

### Step 3: Commit Your Changes

1. Type a commit message in the text box at the top (e.g., "Initial portfolio commit")
2. Click the checkmark icon (✓) above the message box or press Ctrl+Enter

### Step 4: Connect to GitHub Repository

If this is your first time pushing:

1. Go to GitHub.com and create a new repository
2. Name it (e.g., "portfolio")
3. DO NOT initialize with README (since you already have files)
4. Copy the repository URL

In VS Code terminal, run:
```bash
git remote add origin https://github.com/YOUR-USERNAME/portfolio.git
git branch -M main
```

### Step 5: Push Your Code

Click the "..." menu in Source Control panel and select:
- "Push" (if branch is already set up)
- Or "Publish Branch" (first time)

Alternatively, in the terminal:
```bash
git push -u origin main
```

## Command Line Method (Alternative)

If you prefer using commands, here's the complete workflow:

### First Time Setup

```bash
# Navigate to your portfolio folder
cd /path/to/your/portfolio

# Initialize git (if needed)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Connect to GitHub (replace with your URL)
git remote add origin https://github.com/YOUR-USERNAME/portfolio.git

# Push
git branch -M main
git push -u origin main
```

### Regular Workflow (After Initial Setup)

Every time you make changes:

```bash
# Check what changed
git status

# Stage all changes
git add .

# Or stage specific files
git add filename.html filename.css

# Commit with a message
git commit -m "Describe what you changed"

# Push to GitHub
git push
```

## Common Issues and Solutions

### Issue 1: "Permission denied" or "Authentication failed"

**Solution:**
- Make sure you're signed in to GitHub in VS Code
- Or use a Personal Access Token instead of your password
- Check that your email/username are configured correctly

### Issue 2: "Remote origin already exists"

**Solution:**
```bash
# Remove the existing remote
git remote remove origin

# Add it again with correct URL
git remote add origin https://github.com/YOUR-USERNAME/portfolio.git
```

### Issue 3: "Nothing to commit, working tree clean"

**Solution:**
- This means you haven't made any changes since your last commit
- Make some changes to your files first, then commit and push

### Issue 4: "Please tell me who you are"

**Solution:**
```bash
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
```

### Issue 5: "Failed to push some refs"

**Solution:**
```bash
# Pull the latest changes first
git pull origin main

# Then push again
git push origin main
```

## Quick Reference Commands

```bash
git status          # See what changed
git add .           # Stage all changes
git add filename    # Stage specific file
git commit -m "msg" # Commit with message
git push            # Push to GitHub
git pull            # Get latest from GitHub
git log             # See commit history
git branch          # See branches
```

## Tips for Success

1. **Commit Often**: Make small, frequent commits with clear messages
2. **Meaningful Messages**: Write commit messages that explain what you changed
3. **Check Status**: Use `git status` frequently to see what's happening
4. **Pull Before Push**: Always pull latest changes before pushing (especially when collaborating)
5. **Use .gitignore**: Create a `.gitignore` file to exclude unnecessary files

## Example .gitignore for Portfolio Projects

Create a file named `.gitignore` in your project root:

```
# Dependencies
node_modules/
npm-debug.log

# Build files
dist/
build/

# OS files
.DS_Store
Thumbs.db

# IDE files
.vscode/
.idea/

# Environment files
.env
.env.local
```

## Getting Help

- VS Code Git Documentation: [code.visualstudio.com/docs/sourcecontrol/overview](https://code.visualstudio.com/docs/sourcecontrol/overview)
- GitHub Guides: [guides.github.com](https://guides.github.com/)
- Git Documentation: [git-scm.com/doc](https://git-scm.com/doc)

## Next Steps

Now that you can push code to GitHub:
1. Keep your repository updated regularly
2. Explore GitHub features like Issues and Projects
3. Learn about branches for feature development
4. Consider enabling GitHub Pages to host your portfolio

Good luck with your portfolio project! 🚀
