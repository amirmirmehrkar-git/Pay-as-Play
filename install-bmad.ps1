# BMAD Method Installation Script
# This script helps install BMAD Method in the current directory

$projectPath = "C:\Amir\pay-as-play-project"
Write-Host "Installing BMAD Method in: $projectPath" -ForegroundColor Green

# Change to project directory
Set-Location $projectPath

# Run the installation
# Note: You may need to manually enter the path when prompted
npx --yes bmad-method install

Write-Host "`nInstallation complete!" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "1. If prompted, enter this path: $projectPath" -ForegroundColor Cyan
Write-Host "2. Select 'Cursor' as your IDE when prompted" -ForegroundColor Cyan
Write-Host "3. The following folders will be created:" -ForegroundColor Cyan
Write-Host "   - .bmad-core/ (with all agents)" -ForegroundColor White
Write-Host "   - .cursor/rules/ (with agent rule files)" -ForegroundColor White

