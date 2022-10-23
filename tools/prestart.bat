echo "Starting prestart script at:" %cd%

REM Copy the templates to output
if exist .\build\templates rmdir .\build\templates /s /q
mkdir .\build\templates
copy .\src\templates\* .\build\templates /Y /V

REM Copy the demo page for debugging
copy .\src\index.html .\build /Y /V