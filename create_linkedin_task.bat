@echo off
schtasks /create /tn "Kairos-LinkedIn-Post" /tr "\"C:\Program Files\nodejs\node.exe\" \"C:\Users\chapo\Documents\Agent Marketing V1\linkedin_agent.mjs\"" /sc daily /st 09:00 /f
if %errorlevel% == 0 (
    echo [OK] Tache Kairos-LinkedIn-Post creee - 7j/7 a 09h00
) else (
    echo [ERREUR] Echec creation tache
)
pause
