# 从品牌 Logo 生成站点图标（PNG 多尺寸 + favicon.ico）
# 用法：powershell -ExecutionPolicy Bypass -File scripts/make-icons.ps1
param(
  [string]$Source = (Join-Path $PSScriptRoot '..\src\assets\yuxin-run.png'),
  [string]$OutDir = (Join-Path $PSScriptRoot '..\public')
)

Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile((Resolve-Path $Source))
# 保留完整品牌标志（鱼 + 两侧代码尖括号），居中放入透明方形画布
$subject = $src

function New-IconBitmap([int]$size, [System.Drawing.Color]$background) {
  $bmp = New-Object System.Drawing.Bitmap -ArgumentList $size, $size, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.Clear($background)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

  $margin = if ($size -le 32) { 0.01 } elseif ($size -le 64) { 0.03 } else { 0.04 }
  $pad = [math]::Round($size * $margin)
  $box = $size - 2 * $pad
  $scale = [math]::Min($box / $subject.Width, $box / $subject.Height)
  $w = [math]::Round($subject.Width * $scale)
  $h = [math]::Round($subject.Height * $scale)
  $x = [math]::Round(($size - $w) / 2)
  $y = [math]::Round(($size - $h) / 2)

  $g.DrawImage($subject, [int]$x, [int]$y, [int]$w, [int]$h)
  $g.Dispose()
  return $bmp
}

$targets = @(
  @{ Name = 'favicon-16.png'; Size = 16; Background = [System.Drawing.Color]::Transparent },
  @{ Name = 'favicon-32.png'; Size = 32; Background = [System.Drawing.Color]::Transparent },
  @{ Name = 'favicon-48.png'; Size = 48; Background = [System.Drawing.Color]::Transparent },
  # iOS 不处理透明背景，Apple touch icon 用品牌浅色底
  @{ Name = 'apple-touch-icon.png'; Size = 180; Background = [System.Drawing.ColorTranslator]::FromHtml('#F6F4EE') },
  @{ Name = 'icon-192.png'; Size = 192; Background = [System.Drawing.Color]::Transparent },
  @{ Name = 'icon-512.png'; Size = 512; Background = [System.Drawing.Color]::Transparent }
)

foreach ($target in $targets) {
  $bmp = New-IconBitmap $target.Size $target.Background
  $path = Join-Path $OutDir $target.Name
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
  Write-Host ("wrote {0} ({1}x{1})" -f $target.Name, $target.Size)
}

# favicon.ico：ICO 容器 + PNG 压缩帧（16 / 32 / 48）
$entries = @()
foreach ($size in 16, 32, 48) {
  $bytes = [System.IO.File]::ReadAllBytes((Join-Path $OutDir ("favicon-{0}.png" -f $size)))
  $entries += [PSCustomObject]@{ Size = $size; Bytes = $bytes }
}

$stream = New-Object System.IO.MemoryStream
$writer = New-Object System.IO.BinaryWriter($stream)
$writer.Write([UInt16]0)
$writer.Write([UInt16]1)
$writer.Write([UInt16]$entries.Count)

$offset = 6 + 16 * $entries.Count
foreach ($entry in $entries) {
  $writer.Write([byte]$entry.Size)
  $writer.Write([byte]$entry.Size)
  $writer.Write([byte]0)
  $writer.Write([byte]0)
  $writer.Write([UInt16]1)
  $writer.Write([UInt16]32)
  $writer.Write([UInt32]$entry.Bytes.Length)
  $writer.Write([UInt32]$offset)
  $offset += $entry.Bytes.Length
}
foreach ($entry in $entries) {
  $writer.Write($entry.Bytes)
}
$writer.Flush()
[System.IO.File]::WriteAllBytes((Join-Path $OutDir 'favicon.ico'), $stream.ToArray())
$writer.Dispose()
$stream.Dispose()
Write-Host 'wrote favicon.ico (16/32/48)'

$subject.Dispose()
$src.Dispose()
