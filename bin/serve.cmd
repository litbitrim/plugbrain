@echo off
node --experimental-strip-types "%~dp0..\src\cli.ts" serve %*
