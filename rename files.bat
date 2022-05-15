@echo off
setlocal EnabledelayedExpansion

Set "Pattern= "
Set "Replace=_"

for /r "H:\work projects\exercisesApp\docs\Neuro" %%a in (*) do (
set "newname=%%~na"
set "newname=!newname:%Pattern%=%Replace%!
ren "%%~a" "!newname!%%~xa"
)
