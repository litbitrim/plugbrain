@echo off
setlocal
rem This launcher starts exactly one local Core and opens its browser UI only
rem after that child owns port 4310 and serves /api/health. The portable
rem bundle owns the Node runtime; it never adopts a machine-wide node command.
set "PLUGBRAIN_BUNDLE=%~dp0..\dist\plugbrain.mjs"
set "PLUGBRAIN_RUNTIME=%~dp0..\dist\node.exe"
if not exist "%PLUGBRAIN_BUNDLE%" (
  echo PlugBrain Core bundle is missing: "%PLUGBRAIN_BUNDLE%"
  exit /b 1
)
if not exist "%PLUGBRAIN_RUNTIME%" (
  echo PlugBrain owned runtime is missing: "%PLUGBRAIN_RUNTIME%"
  exit /b 1
)
rem A Core that already answers - the PLUG runtime keeps the installed one
rem running - is simply opened; only an idle port gets a Core from here.
powershell -NoProfile -Command "try { $r = Invoke-WebRequest -UseBasicParsing -Uri 'http://127.0.0.1:4310/api/health' -TimeoutSec 2; if ($r.StatusCode -eq 200 -and $r.Content -match '\"ok\":true') { exit 0 } else { exit 1 } } catch { exit 1 }"
if not errorlevel 1 (
  start "PlugBrain" "http://127.0.0.1:4310/"
  exit /b 0
)
rem Refuse a possibly stale or unrelated server rather than treating its 200 as ours.
powershell -NoProfile -Command "try { $listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, 4310); $listener.Start(); $listener.Stop(); exit 0 } catch { exit 2 }"
if errorlevel 1 (
  echo Port 4310 is already in use. Stop the existing Core before launching this bundle.
  exit /b 2
)
rem Start-Process joins ArgumentList into a command line. Quote the bundle
rem ourselves so an installed path such as C:\Program Files\PlugBrain stays
rem one Node argv value. Windows paths cannot contain a double quote.
for /f %%P in ('powershell -NoProfile -Command "$node = $env:PLUGBRAIN_RUNTIME; $bundleArgument = [string][char]34 + $env:PLUGBRAIN_BUNDLE + [char]34; $child = Start-Process -FilePath $node -ArgumentList @($bundleArgument, 'serve') -WindowStyle Hidden -PassThru; [Console]::Write($child.Id)"') do set "PLUGBRAIN_CORE_PID=%%P"
if not defined PLUGBRAIN_CORE_PID (
  echo PlugBrain Core could not be started.
  exit /b 1
)
powershell -NoProfile -Command "$pid = [int]$env:PLUGBRAIN_CORE_PID; $deadline = (Get-Date).AddSeconds(15); do { $listener = Get-NetTCPConnection -State Listen -LocalPort 4310 -ErrorAction SilentlyContinue | Where-Object { $_.OwningProcess -eq $pid } | Select-Object -First 1; if ($null -ne $listener) { try { $response = Invoke-WebRequest -UseBasicParsing -Uri 'http://127.0.0.1:4310/api/health' -TimeoutSec 1; if ($response.StatusCode -eq 200) { exit 0 } } catch {} }; if ($null -eq (Get-Process -Id $pid -ErrorAction SilentlyContinue)) { exit 3 }; Start-Sleep -Milliseconds 250 } while ((Get-Date) -lt $deadline); Stop-Process -Id $pid -ErrorAction SilentlyContinue; exit 1"
if errorlevel 1 (
  echo PlugBrain Core did not become ready as the process this launcher started.
  exit /b 1
)
start "PlugBrain" "http://127.0.0.1:4310/"
endlocal
