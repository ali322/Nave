
icon:
	@pnpm tauri icon public/nave.png
start:
	@pnpm tauri dev
build:
	@TAURI_PRIVATE_KEY=~/.tauri/vess.key TAURI_KEY_PASSWORD=1988 pnpm tauri build
opz:
	@upx --ultra-brute src-tauri/target/release/bundle/macos/Nave.app/Contents/macOS/Nave
cp:
	@cp -R src-tauri/target/release/bundle/macos/Nave.app /Applications
.PHONY: icon build opz