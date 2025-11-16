# Check GitHub Deployment Status
# Play and Pay Project

Write-Host "🔍 Checking GitHub Deployment Status..." -ForegroundColor Cyan
Write-Host ""

# Check Git status
Write-Host "📊 Git Status:" -ForegroundColor Yellow
git status
Write-Host ""

# Check remote
Write-Host "🔗 Remote Configuration:" -ForegroundColor Yellow
git remote -v
Write-Host ""

# Check last commits
Write-Host "📝 Last 5 Commits:" -ForegroundColor Yellow
git log --oneline -5
Write-Host ""

# Check if local is ahead of remote
Write-Host "🔄 Local vs Remote:" -ForegroundColor Yellow
$localCommit = git rev-parse HEAD
$remoteCommit = git rev-parse origin/main 2>$null

if ($remoteCommit) {
    if ($localCommit -eq $remoteCommit) {
        Write-Host "✅ Local and remote are in sync" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Local and remote are different" -ForegroundColor Yellow
        Write-Host "   Local:  $localCommit" -ForegroundColor Gray
        Write-Host "   Remote: $remoteCommit" -ForegroundColor Gray
    }
} else {
    Write-Host "❌ Cannot connect to remote" -ForegroundColor Red
}
Write-Host ""

# Check authentication
Write-Host "🔐 Testing Authentication:" -ForegroundColor Yellow
$testResult = git ls-remote origin 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Authentication successful" -ForegroundColor Green
} else {
    Write-Host "❌ Authentication failed" -ForegroundColor Red
    Write-Host "   Error: $testResult" -ForegroundColor Gray
}
Write-Host ""

# Summary
Write-Host "📋 Summary:" -ForegroundColor Cyan
Write-Host "   Repository: https://github.com/amirmirmehrkar-git/Pay-as-Play.git" -ForegroundColor White
Write-Host "   Branch: main" -ForegroundColor White
Write-Host ""

