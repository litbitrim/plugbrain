Unicode true

!define PRODUCT_NAME "PlugBrain"
!define PRODUCT_VERSION "0.1.2"
!define PRODUCT_PUBLISHER "PLUG"

Name "${PRODUCT_NAME} ${PRODUCT_VERSION}"
OutFile "..\release\PlugBrain-${PRODUCT_VERSION}-win-x64.exe"
InstallDir "$LOCALAPPDATA\Programs\PlugBrain"
RequestExecutionLevel user
ShowInstDetails show
ShowUninstDetails show

Page directory
Page instfiles
UninstPage uninstConfirm
UninstPage instfiles

; The directory page is allowed only for a new, empty location. The installer
; never overlays an arbitrary user folder or upgrades an existing tree in
; place: an upgrade must first be explicitly uninstalled after its Core stops.
Function .onVerifyInstDir
  IfFileExists "$INSTDIR\.plugbrain-install.marker" 0 +3
    MessageBox MB_OK|MB_ICONSTOP "An existing PlugBrain installation was found here. Close PlugBrain and uninstall that installation before continuing."
    Abort
  IfFileExists "$INSTDIR\*.*" 0 +3
    MessageBox MB_OK|MB_ICONSTOP "Choose a new empty folder. PlugBrain will never merge with an existing folder."
    Abort
FunctionEnd

Section "PlugBrain Core" SEC_CORE
  SetOutPath "$INSTDIR\dist"
  File /r "..\dist\*"
  SetOutPath "$INSTDIR\desktop"
  File "launch.cmd"
  SetOutPath "$INSTDIR"
  File "..\README.md"

  CreateDirectory "$SMPROGRAMS\PLUG"
  CreateShortCut "$SMPROGRAMS\PLUG\PlugBrain.lnk" "$INSTDIR\desktop\launch.cmd"
  FileOpen $0 "$INSTDIR\.plugbrain-install.marker" w
  FileWrite $0 "PlugBrain ${PRODUCT_VERSION}$\r$\n"
  FileClose $0
  WriteRegStr HKCU "Software\PLUG\PlugBrain" "InstallPath" "$INSTDIR"
  WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\PlugBrain" "DisplayName" "${PRODUCT_NAME} ${PRODUCT_VERSION}"
  WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\PlugBrain" "Publisher" "${PRODUCT_PUBLISHER}"
  WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\PlugBrain" "DisplayVersion" "${PRODUCT_VERSION}"
  WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\PlugBrain" "UninstallString" '"$INSTDIR\Uninstall PlugBrain.exe"'
  WriteUninstaller "$INSTDIR\Uninstall PlugBrain.exe"
SectionEnd

Section "Uninstall"
  ; Refuse to act on a folder that was not created by this installer.
  IfFileExists "$INSTDIR\.plugbrain-install.marker" +3 0
    MessageBox MB_OK|MB_ICONSTOP "This folder is not a verified PlugBrain installation. Nothing was removed."
    Abort

  ; A live portable Core locks its owned runtime. Test that first, before
  ; touching any other payload file, so a running service cannot yield a
  ; partially deleted product tree.
  Delete "$INSTDIR\dist\node.exe"
  IfFileExists "$INSTDIR\dist\node.exe" 0 +3
    MessageBox MB_OK|MB_ICONSTOP "PlugBrain Core is still running or its runtime is locked. Close it and run uninstall again."
    Abort

  Delete "$SMPROGRAMS\PLUG\PlugBrain.lnk"
  RMDir "$SMPROGRAMS\PLUG"
  DeleteRegKey HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\PlugBrain"
  DeleteRegKey HKCU "Software\PLUG\PlugBrain"
  ; Generated from the exact dist tree by package-nsis.mjs. It deletes only
  ; files this candidate installed, then removes directories only if empty.
  !include "..\release\PlugBrain-owned-files.nsh"
  Delete "$INSTDIR\.plugbrain-install.marker"
  Delete "$INSTDIR\Uninstall PlugBrain.exe"
  RMDir "$INSTDIR\desktop"
  RMDir "$INSTDIR"
SectionEnd
