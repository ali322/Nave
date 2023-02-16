use pinger::{ping, PingResult};
use std::fs;
use tauri::{
    api::process::{Command, CommandEvent},
    Builder, Wry,
};

use crate::sysproxy::Sysproxy;

#[tauri::command]
fn latency(addr: String) -> u64 {
    let streams = ping(addr).expect("Failed to ping");
    let mut cnt = 0;
    let mut sum: u128 = 0;
    for msg in streams {
        if cnt > 3 {
            break;
        }
        cnt += 1;
        match msg {
            PingResult::Pong(d, _) => {
                let d = d.as_millis();
                sum = sum + d;
            }
            PingResult::Timeout(_) => {}
            PingResult::Unknown(_) => {}
        }
    }
    let avg = sum / 3;
    avg as u64
}

#[tauri::command]
fn latencies(window: tauri::Window, addrs: Vec<String>) {
    let mut all: Vec<u64> = vec![];
    tauri::async_runtime::spawn(async move {
        for addr in addrs {
            all.push(latency(addr));
        }
        window.emit("latency", all).expect("Failed to emit latency");
    });
}

#[tauri::command]
fn run_sidecar(window: tauri::Window, app_handle: tauri::AppHandle, config: String) {
    let res_dir = app_handle
        .path_resolver()
        .resource_dir()
        .expect("Failed to get resource_dir");
    print!("{:?}", res_dir);
    let dest_dir = res_dir.join("etc");
    if !dest_dir.is_dir() {
        fs::create_dir_all(&dest_dir).expect("Failed to create etc dir");
    }
    fs::write(dest_dir.join("config.json"), config).expect("Failed to write config.json");
    tauri::async_runtime::spawn(async move {
        let (mut rx, _child) = Command::new_sidecar("naive")
            .expect("Failed to setup `naive` sidecar")
            .args(vec![dest_dir.join("config.json").to_str().unwrap()])
            .current_dir(res_dir)
            .spawn()
            .expect("Failed to spawn naive run");
        while let Some(event) = rx.recv().await {
            if let CommandEvent::Stderr(line) = event {
                println!("{}", &line);
                window
                    .emit("sidecar-running", Some(format!("{}", line)))
                    .expect("failed to emit event");
            }
        }
    });
}

#[tauri::command]
fn run_clash(window: tauri::Window, app_handle: tauri::AppHandle, config: String) {
    let res_dir = app_handle
        .path_resolver()
        .resource_dir()
        .expect("Failed to get resource_dir");
    let dest_dir = res_dir.join("etc");
    if !dest_dir.is_dir() {
        fs::create_dir_all(&dest_dir).expect("Failed to create etc dir");
    }
    fs::write(dest_dir.join("clash.yaml"), config).expect("Failed to write clash.yaml");
    tauri::async_runtime::spawn(async move {
      let (mut rx, _child) = Command::new_sidecar("clash")
          .expect("Failed to setup `clash` sidecar")
          .args(vec!["-f", dest_dir.join("clash.yaml").to_str().unwrap()])
          .current_dir(res_dir)
          .spawn()
          .expect("Failed to spawn clash run");
      while let Some(event) = rx.recv().await {
          if let CommandEvent::Stdout(line) = event {
              println!("{}", &line);
              window
                  .emit("sidecar-running", Some(format!("{}", line)))
                  .expect("failed to emit event");
          }
      }
  });
}

#[tauri::command]
fn toggle_sysproxy(is_enabled: bool, port: u16) {
  // println!("is actived {} {}", is_enabled, port);
  let sysproxy = Sysproxy{
    enable: is_enabled,
    host: "127.0.0.1".into(),
    port: port,
    bypass: "localhost,127.0.0.1/8".into(),
  };
  sysproxy.set_system_proxy().unwrap();
}

pub fn apply_command(builder: Builder<Wry>) -> Builder<Wry> {
    builder.invoke_handler(tauri::generate_handler![run_sidecar, run_clash, toggle_sysproxy, latency, latencies])
}
