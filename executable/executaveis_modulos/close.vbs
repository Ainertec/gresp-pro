strComputer ="."
On Error Resume Next

set objWMIService = GetObject("winmgmts:" _
	& "{impersonationLevel=impersonate}!\\" & strComputer & "\root\cimv2")

set colProcesses1=objWMIService.ExecQuery _
	("Select * from Win32_Process Where Name = 'node.exe'")

set colProcesses2=objWMIService.ExecQuery _
	("Select * from Win32_Process Where Name = 'mongod.exe'")

set colProcesses3=objWMIService.ExecQuery _
	("Select * from Win32_Process Where Name = 'cmd.exe'")

For Each Processo1 In colProcesses1
	Processo1.Terminate()
Next

For Each Processo2 In colProcesses2
	Processo2.Terminate()
Next

For Each Processo3 In colProcesses3
	Processo3.Terminate()
Next

On Error GoTo 0
WScript.Quit