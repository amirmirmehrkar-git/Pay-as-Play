# Verify GitHub Deployment
# Play and Pay Project

Write-Host "🔍 Verifying GitHub Deployment..." -ForegroundColor Cyan
Write-Host ""

# 1. Check Git Status
Write-Host "1️⃣ Git Status:" -ForegroundColor Yellow
git status
Write-Host ""

# 2. Check Remote
Write-Host "2️⃣ Remote Configuration:" -ForegroundColor Yellow
git remote -v
Write-Host ""

# 3. Check Last Commits
Write-Host "3️⃣ Last 5 Commits:" -ForegroundColor Yellow
git log --oneline -5
Write-Host ""

# 4. Check Files Count
Write-Host "4️⃣ Files in Repository:" -ForegroundColor Yellow
$fileCount = (git ls-tree -r main --name-only | Measure-Object -Line).Lines
Write-Host "   Total files: $fileCount" -ForegroundColor White
Write-Host ""

# 5. Check Key Files
Write-Host "5️⃣ Key Files Check:" -ForegroundColor Yellow
$keyFiles = @(
    "README.md",
    "playandpay-sdk/package.json",
    ".bmad-core/knowledge/KNOWLEDGE_INDEX.md",
    ".gitignore"
)

foreach ($file in $keyFiles) {
    $exists = git ls-tree -r main --name-only | Select-String -Pattern "^$([regex]::Escape($file))$"
    if ($exists) {
        Write-Host "   ✅ $file" -ForegroundColor Green
    } else {
        Write-Host "   ❌ $file (NOT FOUND)" -ForegroundColor Red
    }
}
Write-Host ""

# 6. Check Remote Sync
Write-Host "6️⃣ Remote Sync Status:" -ForegroundColor Yellow
git fetch origin 2>&1 | Out-Null
$localCommit = git rev-parse HEAD
$remoteCommit = git rev-parse origin/main 2>$null

if ($remoteCommit) {
    if ($localCommit -eq $remoteCommit) {
        Write-Host "   ✅ Local and remote are in sync" -ForegroundColor Green
        Write-Host "   Commit: $($localCommit.Substring(0,7))" -ForegroundColor Gray
    } else {
        Write-Host "   ⚠️  Local and remote are different" -ForegroundColor Yellow
        Write-Host "   Local:  $($localCommit.Substring(0,7))" -ForegroundColor Gray
        Write-Host "   Remote: $($remoteCommit.Substring(0,7))" -ForegroundColor Gray
    }
} else {
    Write-Host "   ❌ Cannot connect to remote" -ForegroundColor Red
}
Write-Host ""

# 7. Test Authentication
Write-Host "7️⃣ Authentication Test:" -ForegroundColor Yellow
$authTest = git ls-remote origin 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✅ Authentication successful" -ForegroundColor Green
} else {
    Write-Host "   ❌ Authentication failed" -ForegroundColor Red
    Write-Host "   Error: $authTest" -ForegroundColor Gray
}
Write-Host ""

# 8. Summary
Write-Host "📋 Summary:" -ForegroundColor Cyan
Write-Host "   Repository: https://github.com/amirmirmehrkar-git/Pay-as-Play.git" -ForegroundColor White
Write-Host "   Branch: main" -ForegroundColor White
Write-Host "   Files: $fileCount" -ForegroundColor White
Write-Host "   Latest Commit: $(git log -1 --format='%h - %s')" -ForegroundColor White
Write-Host ""

# 9. Next Steps
Write-Host "🔗 Next Steps:" -ForegroundColor Cyan
Write-Host "   1. Open repository in browser:" -ForegroundColor White
Write-Host "      https://github.com/amirmirmehrkar-git/Pay-as-Play" -ForegroundColor Gray
Write-Host "   2. Verify files are visible" -ForegroundColor White
Write-Host "   3. Check README.md displays correctly" -ForegroundColor White
Write-Host ""

