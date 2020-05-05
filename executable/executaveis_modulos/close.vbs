strComputer ="."
set objNetwork = CreateObject("Wscript.Network")

set objWMIService = GetObject("winmgmts:" _
	& "{impersonationLevel=impersonate}!\\" & strComputer & "\root\cimv2")

set colProcesses=objWMIService.ExecQuery _
	("Select * from Win32_Process Where Name = 'node.exe'")

set colProcesses1=objWMIService.ExecQuery _
	("Select * from Win32_Process Where Name = 'mongod.exe'")

For Each Processo In colProcesses
	Processo.Terminate()
Next

For Each Processo1 In colProcesses1
	Processo1.Terminate()
Next


Set WshShell1 = WScript.CreateObject( "WScript.shell" )
WshShell1.Run "C:\\gresppro-x64\\executaveis_modulos\\startView.vbs",0,0