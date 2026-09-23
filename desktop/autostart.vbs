' PlugBrain at sign-in: start the owned Core hidden, and only when none answers.
'
' The Run key calls this through wscript because a .cmd there opens a console
' window at every sign-in. The health probe comes first for the same reason
' launch.cmd has one: `serve` starts the index daemon before it binds 4310, so
' a second Core would begin a run and only then fail on the port. The PLUG
' runtime attaches to a Core that already answers, so the runtime and this
' script may start in either order.
Option Explicit

Function CoreAnswers()
  Dim http
  CoreAnswers = False
  On Error Resume Next
  Set http = CreateObject("MSXML2.ServerXMLHTTP.6.0")
  http.setTimeouts 1000, 1000, 2000, 2000
  http.Open "GET", "http://127.0.0.1:4310/api/health", False
  http.Send
  If Err.Number = 0 Then CoreAnswers = (http.Status = 200)
  On Error GoTo 0
End Function

Dim shell, fso, root, node, bundle
Set shell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
root = fso.GetParentFolderName(fso.GetParentFolderName(WScript.ScriptFullName))
node = root & "\dist\node.exe"
bundle = root & "\dist\plugbrain.mjs"

If Not CoreAnswers() Then
  If fso.FileExists(node) And fso.FileExists(bundle) Then
    shell.Run """" & node & """ """ & bundle & """ serve 4310", 0, False
  End If
End If
