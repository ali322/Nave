use tauri::{Builder, Manager, Wry, api::process};

pub fn apply_setup(builder: Builder<Wry>) -> Builder<Wry>{
  builder.setup(|app| {
    app.listen_global("stop-sidecar", |_| {
      process::kill_children();
    });
    // app.unlisten(id);
    Ok(())
  })
}