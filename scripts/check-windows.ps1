Add-Type @"
using System;
using System.Runtime.InteropServices;
using System.Text;

public class DesktopChecker {
    public delegate bool EnumDesktopWindowsProc(IntPtr hWnd, IntPtr lParam);

    [DllImport("user32.dll", SetLastError = true)]
    public static extern IntPtr OpenInputDesktop(uint dwFlags, bool fInherit, uint dwDesiredAccess);

    [DllImport("user32.dll", SetLastError = true)]
    public static extern bool EnumDesktopWindows(IntPtr hDesktop, EnumDesktopWindowsProc lpfn, IntPtr lParam);

    [DllImport("user32.dll", SetLastError = true)]
    public static extern bool CloseDesktop(IntPtr hDesktop);

    [DllImport("user32.dll")]
    public static extern bool IsWindowVisible(IntPtr hWnd);

    [DllImport("user32.dll", CharSet = CharSet.Auto, SetLastError = true)]
    public static extern int GetWindowText(IntPtr hWnd, StringBuilder lpString, int nMaxCount);

    [DllImport("user32.dll")]
    public static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint lpdwProcessId);
}
"@

$hDesk = [DesktopChecker]::OpenInputDesktop(0, $false, 0x0100) # DESKTOP_ENUMERATE (0x0040) | DESKTOP_READOBJECTS (0x0001)
Write-Host "OpenInputDesktop handle: $hDesk"

$titles = [System.Collections.Generic.List[string]]::new()
if ($hDesk -ne [IntPtr]::Zero) {
    [DesktopChecker]::EnumDesktopWindows($hDesk, {
        param($hwnd, $lparam)
        if ([DesktopChecker]::IsWindowVisible($hwnd)) {
            $sb = [System.Text.StringBuilder]::new(256)
            [DesktopChecker]::GetWindowText($hwnd, $sb, 256) | Out-Null
            $t = $sb.ToString()
            if ($t) {
                $p = 0
                [DesktopChecker]::GetWindowThreadProcessId($hwnd, [ref]$p) | Out-Null
                $titles.Add("${p} - ${t}")
            }
        }
        return $true
    }, [IntPtr]::Zero) | Out-Null
    [DesktopChecker]::CloseDesktop($hDesk) | Out-Null
}

$titles | Where-Object { $_ -match "PlugBrain|Electron|Chrome|Edge" } | ForEach-Object { Write-Host "MATCH: $_" }
Write-Host "Total visible windows: $($titles.Count)"
