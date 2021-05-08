'--------------------------------------
'Condicao para executar script
'--------------------------------------
set exiteArquivo = CreateObject("Scripting.FileSystemObject")
set condicao = exiteArquivo.getFolder("C:\gresppro-x64\backend\commands\proofCreate\")
variavel = 0
for each file in condicao.files
variavel = variavel+1
next
if variavel>0 then
'--------------------------------------
' Movendo arquivos para impress�o
'--------------------------------------
set MoverArquivo = CreateObject("Scripting.FileSystemObject")
MoverArquivo.MoveFile "C:\gresppro-x64\backend\commands\proofCreate\*.*", "C:\gresppro-x64\backend\commands\proofPrint\"
'--------------------------------------
' Mandando arquivos para impress�o
'--------------------------------------
Wscript.sleep 3000
Set objPrinter = CreateObject("WScript.Network")
objPrinter.SetDefaultPrinter "Microsoft XPS Document Writer"
TargetFolder = "C:\gresppro-x64\backend\commands\proofPrint\"
Set objShell = CreateObject("Shell.Application")
Set objFolder = objShell.Namespace(TargetFolder)
Set colItems = objFolder.Items
For Each objItem in colItems
objItem.InvokeVerbEx("Print")
Next
Wscript.Sleep 5000
Set oldPrinter = CreateObject("WScript.Network")
oldPrinter.SetDefaultPrinter "Microsoft XPS Document Writer"
'--------------------------------------
' apagando arquivo ap�s 60 segundos
'--------------------------------------
Wscript.sleep 10000
set ApagaArquivo=CreateObject("Scripting.FileSystemObject")
set folder = ApagaArquivo.getFolder("C:\gresppro-x64\backend\commands\proofPrint\")
for each file in folder.files
file.delete
next
'--------------------------------------
end If
Wscript.sleep 10000
set WshShell = WScript.CreateObject("WScript.Shell")
WshShell.Run "C:\gresppro-x64\executaveis_modulos\impressaoComprovant.vbs"