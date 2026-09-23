@echo off
rem The PlugBrain CLI from the installed, self-contained runtime.
rem It runs on the owned node.exe beside the bundle, never on a machine-wide node.
"%~dp0..\dist\node.exe" "%~dp0..\dist\plugbrain.mjs" %*
