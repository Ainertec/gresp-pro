strComputer ="."
set objNetwork = CreateObject("Wscript.Network")

set objWMIService = GetObject("winmgmts:" _
	& "{impersonationLevel=impersonate}!\\" & strComputer & "\root\cimv2")

set colProcesses=objWMIService.ExecQuery _
	("Select * from Win32_Process Where Name = 'wscript.exe'")

For Each Processo In colProcesses
	Processo.Terminate()
Next