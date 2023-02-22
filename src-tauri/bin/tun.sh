#!/bin/sh

# 路径 /etc/clash/enable_tun_route.sh

StartService() {
    while true; do
        tun_ip=$(ifconfig -a | grep 198.18.0.2)
        if [ -z "$tun_ip" ]
        then
            sleep 1
        else
            break
        fi
    done
    route -n add -net 198.18.0.0/16 198.18.0.1
    networksetup -setdnsservers Wi-Fi 198.18.0.2
    dscacheutil -flushcache
    killall -HUP mDNSResponder
    echo "启动 Clash 的 tun 路由"
}

StopService() {
    route -n delete 198.18.0.0/16
    networksetup -setdnsservers Wi-Fi "Empty"
    dscacheutil -flushcache
    killall -HUP mDNSResponder
    echo "停止 Clash 的 tun 路由"
    exit 0
}

StartService
trap StopService SIGTERM SIGHUP SIGINT
while true; do
    sleep 86400 &
    wait $!
done
