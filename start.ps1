param(
	[int]$ApiPort = 5000,
	[int]$FrontPort = 3000
)

$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Definition

# Start API
Write-Host "Starting API on http://localhost:$ApiPort ..."
Start-Process -FilePath "dotnet" -ArgumentList @("run", "--project", "WebApp2", "--urls", "http://localhost:$ApiPort") -WorkingDirectory $repoRoot

# Start frontend
Write-Host "Starting frontend (Next.js) ..."
Push-Location (Join-Path $repoRoot "ClientApp")
if (-not (Test-Path "node_modules")) {
	npm install
}
Start-Process -FilePath "npm" -ArgumentList @("run", "dev") -WorkingDirectory (Join-Path $repoRoot "ClientApp")
Pop-Location

# Wait until frontend responds on any port (3000..3010), then open browser
$maxAttempts = 30
$attempt = 0
$foundUri = $null
$ports = $FrontPort..($FrontPort + 10)
Write-Host "Waiting for frontend on ports: $($ports -join ', ') ..."
while ($attempt -lt $maxAttempts -and -not $foundUri) {
	foreach ($p in $ports) {
		$uri = "http://localhost:$p"
		try {
			$resp = Invoke-WebRequest -Uri $uri -UseBasicParsing -TimeoutSec 2
			if ($resp.StatusCode -eq 200) { $foundUri = $uri; break }
		} catch {}
	}
	if ($foundUri) { break }
	Start-Sleep -Seconds 1
	$attempt++
}
if ($foundUri) {
	Write-Host "Opening $foundUri"
	Start-Process $foundUri
} else {
	Write-Host "Frontend did not respond on ports $($ports -join ', ')"
}

Write-Host "Done."
