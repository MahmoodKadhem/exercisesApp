@echo off
setlocal EnabledelayedExpansion

Set "Pattern=-%"
Set "Replace=-"

for /r "E:\work projects\exercisesApp\docs\Other" %%a in (*) do (
set "newname=%%~na"
set "newname=!newname:%Pattern%=%Replace%!
ren "%%~a" "!newname!%%~xa"
)
