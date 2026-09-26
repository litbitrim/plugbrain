$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
& node --experimental-strip-types (Join-Path $scriptDir "..\src\cli.ts") @args
