set FSo = CreateObject("Scripting.FileSystemObject")
FSo.DeleteFile("C:\data\backup\*")
FSo.DeleteFolder("C:\data\backup\*")