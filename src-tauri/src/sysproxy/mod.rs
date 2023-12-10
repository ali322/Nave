#[cfg(target_os = "linux")]
mod linux;
#[cfg(target_os = "macos")]
mod macos;
#[cfg(target_os = "windows")]
mod windows;

#[derive(Debug, Default, Clone, PartialEq, Eq)]
pub struct Sysproxy {
    pub enable: bool,
    pub host: String,
    pub port: u16,
    pub bypass: String,
}

#[derive(thiserror::Error, Debug)]
pub enum Error {
    #[error("failed to parse string")]
    ParseStr,

    #[error(transparent)]
    Io(#[from] std::io::Error),

    #[error("failed to get default network interface")]
    NetworkInterface,
}

pub type Result<T> = std::result::Result<T, Error>;

impl Sysproxy {
    pub fn is_support() -> bool {
        cfg!(any(
            target_os = "linux",
            target_os = "macos",
            target_os = "windows",
        ))
    }
}