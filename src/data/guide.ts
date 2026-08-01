export type Command = {
  label: string;
  command: string;
  description: string;
};

export type Issue = {
  id: string;
  title: string;
  symptom: string;
  icon: string;
  steps: string[];
};

export type Faq = {
  q: string;
  a: string;
};

export const commonIssues: Issue[] = [
  {
    id: 'no-connection',
    title: 'No Internet Connection',
    symptom: 'Your device shows "Connected, no internet" or cannot load any pages.',
    icon: 'WifiOff',
    steps: [
      'Restart your router — unplug it, wait 30 seconds, then plug it back in.',
      'Restart your computer or phone to refresh the network adapter.',
      'Check that the Ethernet cable between your modem and router is firmly connected.',
      'Confirm your ISP is not experiencing an outage in your area.',
      'Try connecting a second device to rule out a device-specific problem.',
    ],
  },
  {
    id: 'slow-speed',
    title: 'Slow Internet Speeds',
    symptom: 'Pages load, but video buffers and downloads crawl.',
    icon: 'Gauge',
    steps: [
      'Move closer to the router or remove physical obstructions.',
      'Switch from 2.4 GHz to 5 GHz Wi-Fi if your router supports it.',
      'Disconnect devices that are not in use to free up bandwidth.',
      'Run a speed test and compare it to the speed you pay for.',
      'Update your router firmware through the admin panel.',
    ],
  },
  {
    id: 'keeps-dropping',
    title: 'Connection Keeps Dropping',
    symptom: 'Wi-Fi disconnects randomly and reconnects on its own.',
    icon: 'Unplug',
    steps: [
      'Check for wireless interference from microwaves, baby monitors, or neighbors.',
      'Change the Wi-Fi channel in your router settings to a less crowded one.',
      'Update your device\'s network driver or Wi-Fi adapter firmware.',
      'Disable "auto-connect" for public networks you no longer use.',
      'If the problem persists, your router hardware may be failing.',
    ],
  },
  {
    id: 'dns-issues',
    title: 'DNS / "Site Not Found" Errors',
    symptom: 'Some sites won\'t load while others work fine.',
    icon: 'ServerCrash',
    steps: [
      'Flush your DNS cache using the command for your OS (see the Commands section).',
      'Change your DNS server to 1.1.1.1 (Cloudflare) or 8.8.8.8 (Google).',
      'Restart your browser after changing DNS settings.',
      'Try loading the site in an incognito window to rule out extensions.',
      'If only one site fails, the problem is likely on their end — try later.',
    ],
  },
];

export const commands: Command[] = [
  {
    label: 'Flush DNS — Windows',
    command: 'ipconfig /flushdns',
    description: 'Clears the DNS resolver cache so your computer fetches fresh domain records.',
  },
  {
    label: 'Release IP — Windows',
    command: 'ipconfig /release',
    description: 'Releases your current IP address back to the router\'s pool.',
  },
  {
    label: 'Renew IP — Windows',
    command: 'ipconfig /renew',
    description: 'Requests a new IP address from the DHCP server (your router).',
  },
  {
    label: 'Ping Test — Windows',
    command: 'ping 8.8.8.8 -t',
    description: 'Continuously pings Google\'s DNS to check live connectivity.',
  },
  {
    label: 'Flush DNS — macOS',
    command: 'sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder',
    description: 'Clears the DNS cache on modern macOS versions.',
  },
  {
    label: 'Renew IP — macOS',
    command: 'sudo ipconfig set en0 DHCP',
    description: 'Releases and renews the DHCP lease on your Wi-Fi interface.',
  },
  {
    label: 'Ping Test — macOS / Linux',
    command: 'ping 8.8.8.8',
    description: 'Sends packets to Google DNS until you stop it with Ctrl+C.',
  },
  {
    label: 'Flush DNS — Linux',
    command: 'sudo systemctl restart systemd-resolved',
    description: 'Restarts the systemd-resolved service to clear the DNS cache.',
  },
];

export const faqs: Faq[] = [
  {
    q: 'What does "ping" actually measure?',
    a: 'Ping measures round-trip time — how long a small packet takes to reach a server and come back. Lower numbers (under 30ms) feel instant; anything over 150ms may cause lag in video calls or gaming.',
  },
  {
    q: 'Is it safe to flush my DNS cache?',
    a: 'Yes. Flushing DNS only clears the temporary list of website addresses your computer has memorized. The next time you visit a site, your computer simply looks it up again. No personal data is lost.',
  },
  {
    q: 'Why does releasing and renewing my IP help?',
    a: 'Your router hands out IP addresses on a lease. If two devices ever grabbed the same address, or your lease got stuck, releasing and renewing forces the router to give you a fresh, clean assignment.',
  },
  {
    q: 'Should I use 2.4 GHz or 5 GHz Wi-Fi?',
    a: 'Use 5 GHz when you\'re close to the router — it\'s faster and less crowded. Use 2.4 GHz when you\'re far away or need to pass through walls, since it travels farther but carries less data.',
  },
  {
    q: 'What is a good DNS server to switch to?',
    a: 'Cloudflare (1.1.1.1) and Google (8.8.8.8) are the most popular free alternatives. They are often faster and more private than the default your ISP assigns. Cloudflare also offers 1.1.1.2 for malware blocking.',
  },
  {
    q: 'How do I know if my ISP is down?',
    a: 'Check your provider\'s outage page, use a site like downdetector.com, or ask a neighbor on the same provider. If your router\'s lights look normal but there\'s no internet, the issue is usually outside your home.',
  },
  {
    q: 'Will a new router fix my slow internet?',
    a: 'Only if your current router is old (over 5 years) or only supports outdated Wi-Fi standards. If you pay for 500 Mbps but have a Wi-Fi 4 router, upgrading to Wi-Fi 6 will unlock the speed you already pay for.',
  },
];
