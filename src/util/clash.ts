import YAML from 'yaml'

export default (origin: number, dest: number, resDir: string) => {
  const config = YAML.stringify({
    "mixed-port": dest,
    "profile": {
      "store-selected": false,
      "store-fake-ip": false,
    },
    "proxies": [
      {
        "name": "PROXY",
        "type": "socks5",
        "server": "127.0.0.1",
        "port": origin,
        "udp": true
      }
    ],
    "dns": {
      "enable": true,
      "ipv6": true,
      "enhanced-mode": "fake-ip",
      "fake-ip-range": "198.18.0.1/16",
      "default-nameserver": [
        "119.29.29.29",
        "1.1.1.1",
        "8.8.8.8"
      ],
      "nameserver": [
        "https://doh.pub/dns-query", 
        "https://dns.alidns.com/dns-query"
      ],
      "fake-ip-filter": [
        "*.lan",
        "localhost.ptlogin2.qq.com"
      ]
    },
    // "tun":{
    //   "enable": false,
    //   "stack": "system",
    //   "auto-route": true,
    //   "auto-detect-interface": true,
    // },
    "rule-providers": {
      "applications": {
        "type": "file",
        "behavior": "domain",
        "path": `${resDir}etc/ruleset/applications.yaml`,
        "interval": 86400
      },
      "icloud": {
        "type": "file",
        "behavior": "domain",
        "path": `${resDir}etc/ruleset/icloud.yaml`,
        "interval": 86400
      },
      "apple": {
        "type": "file",
        "behavior": "domain",
        "path": `${resDir}etc/ruleset/apple.yaml`,
        "interval": 86400
      },
      "proxy": {
        "type": "file",
        "behavior": "domain",
        "path": `${resDir}etc/ruleset/proxy.yaml`,
        "interval": 86400
      },
      "reject": {
        "type": "file",
        "behavior": "domain",
        "path": `${resDir}etc/ruleset/reject.yaml`,
        "interval": 86400
      },
      "direct": {
        "type": "file",
        "behavior": "domain",
        "path": `${resDir}etc/ruleset/direct.yaml`,
        "interval": 86400
      },
      "private": {
        "type": "file",
        "behavior": "domain",
        "path": `${resDir}etc/ruleset/private.yaml`,
        "interval": 86400
      },
      "cncidr": {
        "type": "file",
        "behavior": "domain",
        "path": `${resDir}etc/ruleset/cncidr.yaml`,
        "interval": 86400
      },
      "lancidr": {
        "type": "file",
        "behavior": "domain",
        "path": `${resDir}etc/ruleset/lancidr.yaml`,
        "interval": 86400
      },
    },
    "rules": [
      "RULE-SET,applications,DIRECT",
      "RULE-SET,icloud,DIRECT",
      "RULE-SET,apple,DIRECT",
      "RULE-SET,private,DIRECT",
      "RULE-SET,reject,REJECT",
      "RULE-SET,proxy,PROXY",
      "RULE-SET,direct,DIRECT",
      "RULE-SET,lancidr,DIRECT",
      "RULE-SET,cncidr,DIRECT",
      "GEOIP,LAN,DIRECT",
      "GEOIP,CN,DIRECT",
      "MATCH,PROXY"
    ]
  })
  return config
}