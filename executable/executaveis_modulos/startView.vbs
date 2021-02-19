strComputer ="."

set objWMIService = GetObject("winmgmts:" _
	& "{impersonationLevel=impersonate}!\\" & strComputer & "\root\cimv2")

set colProcesses=objWMIService.ExecQuery _
	("Select * from Win32_Process Where Name = 'GrespPro.exe'")

For Each Processo In colProcesses
	msgbox"Programa já aberto ou em andamento de abertura!",vbInformation,"Sisvep - Aviso"
	WScript.Quit
Next

Set WshShell = WScript.CreateObject( "WScript.shell" )
WshShell.Run "C:\\gresppro-x64\\frontend\\GrespPro.exe",0,0
WScript.Quit