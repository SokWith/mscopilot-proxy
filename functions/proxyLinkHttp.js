
// src/proxyLink/proxyLinkHttp.ts
export async function proxyLinkHttp(req, reqTranslators, resTranslators) {
  let reqConfig = {
    url: req.url,
    init: {
      method: req.method,
      headers: req.headers,
      body: req.body,
      redirect: "manual"
    }
  };
  for (const reqT of reqTranslators) {
    reqConfig = await reqT(reqConfig, req);
  }
  if (req.url === reqConfig.url) {
    return new Response("not curl", { status: 400 });
  }
  const res = await fetch(reqConfig.url, reqConfig.init);
  let resConfig = {
    body: res.body,
    init: {
      status: res.status,
      headers: res.headers
    }
  };
  for (const resT of resTranslators) {
    resConfig = await resT(resConfig, res);
  }
  return new Response(resConfig.body, resConfig.init);
}

// src/ips/usIps.ts
export let usIps = [
["104.29.1.17","IN"],
["104.29.1.44","IN"],
["104.29.1.45","IN"],
["104.29.1.9","IN"],
["104.29.1.53","IN"],
["104.29.1.54","IN"],
["104.29.1.22","IN"],
["104.29.1.46","IN"],
["104.29.1.75","IN"],
["104.29.1.80","IN"],
["104.29.1.76","IN"],
["104.29.1.108","IN"],
["104.29.1.125","IN"],
["104.29.1.126","IN"],
["104.29.1.135","IN"],
["104.29.1.129","IN"],
["104.29.1.87","IN"],
["104.29.1.150","IN"],
["104.29.1.159","IN"],
["104.29.1.200","IN"],
["104.29.1.222","IN"],
["104.29.1.213","IN"],
["104.29.1.248","IN"],
["104.29.1.241","IN"],
["104.29.2.16","IN"],
["104.29.2.51","IN"],
["104.29.2.60","IN"],
["104.29.2.74","IN"],
["104.29.2.108","IN"],
["104.29.2.102","IN"],
["104.29.2.147","IN"],
["104.29.2.183","IN"],
["104.29.2.185","IN"],
["104.29.2.196","IN"],
["104.29.2.194","IN"],
["104.29.2.244","IN"],
["104.29.2.243","IN"],
["104.29.2.238","IN"],
["104.29.3.13","IN"],
["104.29.3.20","IN"],
["104.29.3.26","IN"],
["104.29.3.39","IN"],
["104.29.3.71","IN"],
["104.29.3.66","IN"],
["104.29.3.111","IN"],
["104.29.3.114","IN"],
["104.29.3.135","IN"],
["104.29.3.126","IN"],
["104.29.3.154","IN"],
["104.29.3.159","IN"],
["104.29.3.214","IN"],
["104.29.3.232","IN"],
["104.29.3.243","IN"],
["104.29.3.253","IN"],
["104.29.4.17","US"],
["104.29.4.19","US"],
["104.29.4.48","US"],
["104.29.4.51","US"],
["104.29.4.44","US"],
["104.29.4.72","US"],
["104.29.4.79","US"],
["104.29.4.115","US"],
["104.29.4.136","US"],
["104.29.4.131","US"],
["104.29.4.147","US"],
["104.29.4.158","US"],
["104.29.4.184","US"],
["104.29.4.198","US"],
["104.29.4.216","US"],
["104.29.4.238","US"],
["104.29.4.254","US"],
["104.29.5.17","JP"],
["104.29.5.47","JP"],
["104.29.5.63","JP"],
["104.29.5.62","JP"],
["104.29.5.166","JP"],
["104.29.5.167","JP"],
["104.29.5.175","JP"],
["104.29.5.179","JP"],
["104.29.5.190","JP"],
["104.29.5.200","JP"],
["104.29.5.206","JP"],
["104.29.5.223","JP"],
["104.29.5.215","JP"],
["104.29.5.222","JP"],
["104.29.5.231","JP"],
["104.29.6.2","JP"],
["104.29.6.3","JP"],
["104.29.6.23","JP"],
["104.29.6.30","JP"],
["104.29.6.37","JP"],
["104.29.6.77","JP"],
["104.29.6.70","JP"],
["104.29.6.91","JP"],
["104.29.6.111","JP"],
["104.29.6.113","JP"],
["104.29.6.121","JP"],
["104.29.6.135","JP"],
["104.29.6.142","JP"],
["104.29.6.167","JP"],
["104.29.6.183","JP"],
["104.29.6.211","JP"],
["104.29.6.229","JP"],
["104.29.7.16","US"],
["104.29.7.40","US"],
["104.29.7.63","US"],
["104.29.7.74","US"],
["104.29.7.73","US"],
["104.29.7.71","US"],
["104.29.7.88","US"],
["104.29.7.95","US"],
["104.29.7.90","US"],
["104.29.7.173","US"],
["104.29.7.178","US"],
["104.29.7.197","US"],
["104.29.7.198","US"],
["104.29.7.214","US"],
["104.29.7.232","US"],
["104.29.7.229","US"],
["104.29.7.249","US"],
["104.29.8.3","MX"],
["104.29.7.254","US"],
["104.29.7.255","US"],
["104.29.8.9","MX"],
["104.29.8.13","MX"],
["104.29.8.20","MX"],
["104.29.8.28","MX"],
["104.29.8.31","MX"],
["104.29.8.49","MX"],
["104.29.8.65","MX"],
["104.29.8.56","MX"],
["104.29.8.80","MX"],
["104.29.8.79","MX"],
["104.29.8.88","MX"],
["104.29.8.93","MX"],
["104.29.8.110","MX"],
["104.29.8.105","MX"],
["104.29.8.106","MX"],
["104.29.8.101","MX"],
["104.29.8.109","MX"],
["104.29.8.103","MX"],
["104.29.8.115","MX"],
["104.29.8.113","MX"],
["104.29.8.114","MX"],
["104.29.8.136","MX"],
["104.29.8.133","MX"],
["104.29.8.151","MX"],
["104.29.8.175","MX"],
["104.29.8.188","MX"],
["104.29.8.204","MX"],
["104.29.8.215","MX"],
["104.29.8.213","MX"],
["104.29.8.228","MX"],
["104.29.8.239","MX"],
["104.29.9.5","US"],
["104.29.9.12","US"],
["104.29.9.38","US"],
["104.29.9.50","US"],
["104.29.9.49","US"],
["104.29.9.59","US"],
["104.29.9.87","US"],
["104.29.9.103","US"],
["104.29.9.105","US"],
["104.29.9.115","US"],
["104.29.9.140","US"],
["104.29.9.151","US"],
["104.29.9.149","US"],
["104.29.9.156","US"],
["104.29.9.178","US"],
["104.29.9.170","US"],
["104.29.9.176","US"],
["104.29.9.179","US"],
["104.29.9.192","US"],
["104.29.9.189","US"],
["104.29.9.196","US"],
["104.29.9.195","US"],
["104.29.9.217","US"],
["104.29.9.216","US"],
["104.29.9.224","US"],
["104.29.9.234","US"],
["104.29.9.247","US"],
["104.29.9.245","US"],
["104.29.10.3","AU"],
["104.29.10.12","AU"],
["104.29.10.29","AU"],
["104.29.10.77","AU"],
["104.29.10.68","AU"],
["104.29.10.96","AU"],
["104.29.10.112","AU"],
["104.29.10.168","AU"],
["104.29.10.179","AU"],
["104.29.10.171","AU"],
["104.29.10.187","AU"],
["104.29.10.207","AU"],
["104.29.10.208","AU"],
["104.29.10.235","AU"],
["104.29.11.33","NZ"],
["104.29.11.43","NZ"],
["104.29.11.49","NZ"],
["104.29.11.50","NZ"],
["104.29.11.76","NZ"],
["104.29.11.102","NZ"],
["104.29.11.118","NZ"],
["104.29.11.132","NZ"],
["104.29.11.136","NZ"],
["104.29.11.169","NZ"],
["104.29.11.171","NZ"],
["104.29.11.184","NZ"],
["104.29.11.181","NZ"],
["104.29.11.185","NZ"],
["104.29.11.187","NZ"],
["104.29.11.226","NZ"],
["104.29.11.219","NZ"],
["104.29.12.42","PH"],
["104.29.12.67","PH"],
["104.29.12.66","PH"],
["104.29.12.69","PH"],
["104.29.12.79","PH"],
["104.29.12.76","PH"],
["104.29.12.98","PH"],
["104.29.12.99","PH"],
["104.29.12.106","PH"],
["104.29.12.112","PH"],
["104.29.12.162","PH"],
["104.29.12.163","PH"],
["104.29.12.174","PH"],
["104.29.12.184","PH"],
["104.29.12.206","PH"],
["104.29.12.201","PH"],
["104.29.12.197","PH"],
["104.29.12.202","PH"],
["104.29.12.208","PH"],
["104.29.12.233","PH"],
["104.29.12.247","PH"],
["104.29.15.2","WW"],
["104.29.15.0","WW"],
["104.29.15.1","WW"],
["104.29.15.3","WW"],
["104.29.15.7","WW"],
["104.29.15.15","WW"],
["104.29.15.14","WW"],
["104.29.15.8","WW"],
["104.29.15.18","WW"],
["104.29.15.4","WW"],
["104.29.15.12","WW"],
["104.29.15.17","WW"],
["104.29.15.13","WW"],
["104.29.15.11","WW"],
["104.29.15.16","WW"],
["104.29.15.5","WW"],
["104.29.15.6","WW"],
["104.29.15.10","WW"],
["104.29.15.21","WW"],
["104.29.15.19","WW"],
["104.29.15.22","WW"],
["104.29.15.20","WW"],
["104.29.15.27","WW"],
["104.29.15.37","WW"],
["104.29.15.23","WW"],
["104.29.15.30","WW"],
["104.29.15.28","WW"],
["104.29.15.36","WW"],
["104.29.15.25","WW"],
["104.29.15.35","WW"],
["104.29.15.33","WW"],
["104.29.15.9","WW"],
["104.29.15.24","WW"],
["104.29.15.26","WW"],
["104.29.15.29","WW"],
["104.29.15.32","WW"],
["104.29.15.34","WW"],
["104.29.15.31","WW"],
["104.29.15.38","WW"],
["104.29.15.39","WW"],
["104.29.15.40","WW"],
["104.29.15.45","WW"],
["104.29.15.56","WW"],
["104.29.15.43","WW"],
["104.29.15.51","WW"],
["104.29.15.44","WW"],
["104.29.15.42","WW"],
["104.29.15.41","WW"],
["104.29.15.55","WW"],
["104.29.15.48","WW"],
["104.29.15.54","WW"],
["104.29.15.52","WW"],
["104.29.15.53","WW"],
["104.29.15.47","WW"],
["104.29.15.50","WW"],
["104.29.15.49","WW"],
["104.29.15.46","WW"],
["104.29.15.58","WW"],
["104.29.15.57","WW"],
["104.29.15.62","WW"],
["104.29.15.61","WW"],
["104.29.15.74","WW"],
["104.29.15.68","WW"],
["104.29.15.66","WW"],
["104.29.15.59","WW"],
["104.29.15.60","WW"],
["104.29.15.73","WW"],
["104.29.15.69","WW"],
["104.29.15.65","WW"],
["104.29.15.71","WW"],
["104.29.15.67","WW"],
["104.29.15.63","WW"],
["104.29.15.72","WW"],
["104.29.15.64","WW"],
["104.29.15.70","WW"],
["104.29.15.75","WW"],
["104.29.15.77","WW"],
["104.29.15.76","WW"],
["104.29.15.82","WW"],
["104.29.15.87","WW"],
["104.29.15.81","WW"],
["104.29.15.79","WW"],
["104.29.15.92","WW"],
["104.29.15.80","WW"],
["104.29.15.88","WW"],
["104.29.15.85","WW"],
["104.29.15.78","WW"],
["104.29.15.86","WW"],
["104.29.15.89","WW"],
["104.29.15.83","WW"],
["104.29.15.84","WW"],
["104.29.15.91","WW"],
["104.29.15.90","WW"],
["104.29.15.93","WW"],
["104.29.15.96","WW"],
["104.29.15.94","WW"],
["104.29.15.109","WW"],
["104.29.15.104","WW"],
["104.29.15.103","WW"],
["104.29.15.102","WW"],
["104.29.15.108","WW"],
["104.29.15.99","WW"],
["104.29.15.100","WW"],
["104.29.15.97","WW"],
["104.29.15.105","WW"],
["104.29.15.101","WW"],
["104.29.15.106","WW"],
["104.29.15.98","WW"],
["104.29.15.95","WW"],
["104.29.15.110","WW"],
["104.29.15.111","WW"],
["104.29.15.112","WW"],
["104.29.15.126","WW"],
["104.29.15.120","WW"],
["104.29.15.121","WW"],
["104.29.15.118","WW"],
["104.29.15.116","WW"],
["104.29.15.117","WW"],
["104.29.15.125","WW"],
["104.29.15.114","WW"],
["104.29.15.124","WW"],
["104.29.15.122","WW"],
["104.29.15.115","WW"],
["104.29.15.123","WW"],
["104.29.15.119","WW"],
["104.29.15.113","WW"],
["104.29.15.127","WW"],
["104.29.15.128","WW"],
["104.29.15.129","WW"],
["104.29.15.140","WW"],
["104.29.15.130","WW"],
["104.29.15.135","WW"],
["104.29.15.138","WW"],
["104.29.15.143","WW"],
["104.29.15.141","WW"],
["104.29.15.133","WW"],
["104.29.15.134","WW"],
["104.29.15.132","WW"],
["104.29.15.131","WW"],
["104.29.15.136","WW"],
["104.29.15.137","WW"],
["104.29.15.142","WW"],
["104.29.15.139","WW"],
["104.29.15.107","WW"],
["104.29.15.144","WW"],
["104.29.15.145","WW"],
["104.29.15.146","WW"],
["104.29.15.152","WW"],
["104.29.15.147","WW"],
["104.29.15.148","WW"],
["104.29.15.160","WW"],
["104.29.15.156","WW"],
["104.29.15.153","WW"],
["104.29.15.150","WW"],
["104.29.15.151","WW"],
["104.29.15.154","WW"],
["104.29.15.157","WW"],
["104.29.15.158","WW"],
["104.29.15.159","WW"],
["104.29.15.149","WW"],
["104.29.15.155","WW"],
["104.29.15.163","WW"],
["104.29.15.162","WW"],
["104.29.15.161","WW"],
["104.29.15.169","WW"],
["104.29.15.174","WW"],
["104.29.15.166","WW"],
["104.29.15.165","WW"],
["104.29.15.173","WW"],
["104.29.15.171","WW"],
["104.29.15.172","WW"],
["104.29.15.170","WW"],
["104.29.15.175","WW"],
["104.29.15.168","WW"],
["104.29.15.164","WW"],
["104.29.15.167","WW"],
["104.29.15.176","WW"],
["104.29.15.177","WW"],
["104.29.15.179","WW"],
["104.29.15.178","WW"],
["104.29.15.195","WW"],
["104.29.15.183","WW"],
["104.29.15.188","WW"],
["104.29.15.182","WW"],
["104.29.15.180","WW"],
["104.29.15.189","WW"],
["104.29.15.187","WW"],
["104.29.15.190","WW"],
["104.29.15.181","WW"],
["104.29.15.186","WW"],
["104.29.15.185","WW"],
["104.29.15.193","WW"],
["104.29.15.192","WW"],
["104.29.15.191","WW"],
["104.29.15.184","WW"],
["104.29.15.194","WW"],
["104.29.15.196","WW"],
["104.29.15.200","WW"],
["104.29.15.202","WW"],
["104.29.15.206","WW"],
["104.29.15.198","WW"],
["104.29.15.212","WW"],
["104.29.15.205","WW"],
["104.29.15.207","WW"],
["104.29.15.204","WW"],
["104.29.15.197","WW"],
["104.29.15.199","WW"],
["104.29.15.201","WW"],
["104.29.15.211","WW"],
["104.29.15.208","WW"],
["104.29.15.209","WW"],
["104.29.15.210","WW"],
["104.29.15.203","WW"],
["104.29.15.213","WW"],
["104.29.15.222","WW"],
["104.29.15.229","WW"],
["104.29.15.219","WW"],
["104.29.15.224","WW"],
["104.29.15.218","WW"],
["104.29.15.223","WW"],
["104.29.15.214","WW"],
["104.29.15.215","WW"],
["104.29.15.216","WW"],
["104.29.15.217","WW"],
["104.29.15.228","WW"],
["104.29.15.227","WW"],
["104.29.15.220","WW"],
["104.29.15.221","WW"],
["104.29.15.225","WW"],
["104.29.15.226","WW"],
["104.29.15.230","WW"],
["104.29.15.235","WW"],
["104.29.15.246","WW"],
["104.29.15.239","WW"],
["104.29.15.236","WW"],
["104.29.15.240","WW"],
["104.29.15.231","WW"],
["104.29.15.242","WW"],
["104.29.15.233","WW"],
["104.29.15.244","WW"],
["104.29.15.241","WW"],
["104.29.15.243","WW"],
["104.29.15.237","WW"],
["104.29.15.245","WW"],
["104.29.15.238","WW"],
["104.29.15.234","WW"],
["104.29.15.232","WW"],
["104.29.15.248","WW"],
["104.29.15.249","WW"],
["104.29.15.251","WW"],
["104.29.15.254","WW"],
["104.29.15.252","WW"],
["104.29.15.253","WW"],
["104.29.15.247","WW"],
["104.29.15.255","WW"],
["104.29.15.250","WW"],
["104.29.16.31","IN"],
["104.29.16.38","IN"],
["104.29.16.69","IN"],
["104.29.16.73","IN"],
["104.29.16.105","IN"],
["104.29.16.102","IN"],
["104.29.16.106","IN"],
["104.29.16.117","IN"],
["104.29.16.53","IN"],
["104.29.16.138","IN"],
["104.29.16.150","IN"],
["104.29.16.171","IN"],
["104.29.16.168","IN"],
["104.29.16.183","IN"],
["104.29.16.185","IN"],
["104.29.16.209","IN"],
["104.29.16.216","IN"],
["104.29.16.228","IN"],
["104.29.16.235","IN"],
["104.29.16.251","IN"],
["104.29.17.4","WW"],
["104.29.17.14","WW"],
["104.29.17.41","WW"],
["104.29.17.40","WW"],
["104.29.17.43","WW"],
["104.29.17.80","WW"],
["104.29.17.84","WW"],
["104.29.17.109","WW"],
["104.29.17.108","WW"],
["104.29.17.118","WW"],
["104.29.17.140","WW"],
["104.29.17.143","WW"],
["104.29.17.162","WW"],
["104.29.17.174","WW"],
["104.29.17.184","WW"],
["104.29.17.190","WW"],
["104.29.17.185","WW"],
["104.29.17.200","WW"],
["104.29.17.220","WW"],
["104.29.17.246","WW"],
["104.29.17.234","WW"],
["104.29.17.247","WW"],
["104.29.21.42","BR"],
["104.29.21.47","BR"],
["104.29.21.45","BR"],
["104.29.21.58","BR"],
["104.29.21.108","BR"],
["104.29.21.99","BR"],
["104.29.21.107","BR"],
["104.29.21.112","BR"],
["104.29.21.132","BR"],
["104.29.21.152","BR"],
["104.29.21.186","BR"],
["104.29.21.214","BR"],
["104.29.21.220","BR"],
["104.29.21.240","BR"],
["104.29.21.234","BR"],
["104.29.21.247","BR"],
["104.29.22.2","BR"],
["104.29.22.17","BR"],
["104.29.22.33","BR"],
["104.29.22.29","BR"],
["104.29.22.32","BR"],
["104.29.22.44","BR"],
["104.29.22.50","BR"],
["104.29.22.55","BR"],
["104.29.22.73","BR"],
["104.29.22.75","BR"],
["104.29.22.92","BR"],
["104.29.22.93","BR"],
["104.29.22.96","BR"],
["104.29.22.108","BR"],
["104.29.22.112","BR"],
["104.29.22.109","BR"],
["104.29.22.144","BR"],
["104.29.22.152","BR"],
["104.29.22.180","BR"],
["104.29.22.176","BR"],
["104.29.22.181","BR"],
["104.29.22.185","BR"],
["104.29.22.196","BR"],
["104.29.22.210","BR"],
["104.29.22.211","BR"],
["104.29.22.223","BR"],
["104.29.22.229","BR"],
["104.29.22.224","BR"],
["104.29.22.237","BR"],
["104.29.23.4","BR"],
["104.29.23.32","BR"],
["104.29.23.31","BR"],
["104.29.23.27","BR"],
["104.29.23.42","BR"],
["104.29.23.73","BR"],
["104.29.23.85","BR"],
["104.29.23.137","BR"],
["104.29.23.148","BR"],
["104.29.23.160","BR"],
["104.29.23.196","BR"],
["104.29.23.185","BR"],
["104.29.23.198","BR"],
["104.29.23.202","BR"],
["104.29.23.209","BR"],
["104.29.23.224","BR"],
["104.29.23.232","BR"],
["104.29.23.236","BR"],
["104.29.23.229","BR"],
["104.29.23.231","BR"],
["104.29.23.240","BR"],
["104.29.24.16","BR"],
["104.29.24.32","BR"],
["104.29.24.93","BR"],
["104.29.24.107","BR"],
["104.29.24.108","BR"],
["104.29.24.112","BR"],
["104.29.24.137","BR"],
["104.29.24.186","BR"],
["104.29.24.207","BR"],
["104.29.24.211","BR"],
["104.29.24.221","BR"],
["104.29.24.237","BR"],
["104.29.24.242","BR"],
["104.29.24.250","BR"],
["104.29.24.253","BR"],
["104.29.25.2","BR"],
["104.29.24.246","BR"],
["104.29.25.23","BR"],
["104.29.25.47","BR"],
["104.29.25.59","BR"],
["104.29.25.78","BR"],
["104.29.25.76","BR"],
["104.29.25.80","BR"],
["104.29.25.95","BR"],
["104.29.25.113","BR"],
["104.29.25.103","BR"],
["104.29.25.124","BR"],
["104.29.25.141","BR"],
["104.29.25.147","BR"],
["104.29.25.183","BR"],
["104.29.25.186","BR"],
["104.29.25.191","BR"],
["104.29.25.204","BR"],
["104.29.25.211","BR"],
["104.29.25.222","BR"],
["104.29.25.218","BR"],
["104.29.25.242","BR"],
["104.29.25.246","BR"],
["104.29.26.6","BR"],
["104.29.26.40","BR"],
["104.29.26.44","BR"],
["104.29.26.45","BR"],
["104.29.26.58","BR"],
["104.29.26.64","BR"],
["104.29.26.72","BR"],
["104.29.26.79","BR"],
["104.29.26.99","BR"],
["104.29.26.102","BR"],
["104.29.26.110","BR"],
["104.29.26.124","BR"],
["104.29.26.137","BR"],
["104.29.26.154","BR"],
["104.29.26.157","BR"],
["104.29.26.173","BR"],
["104.29.26.181","BR"],
["104.29.26.206","BR"],
["104.29.26.205","BR"],
["104.29.26.210","BR"],
["104.29.26.231","BR"],
["104.29.26.243","BR"],
["104.29.26.244","BR"],
["104.29.26.236","BR"],
["104.29.27.3","BR"],
["104.29.26.253","BR"],
["104.29.27.21","BR"],
["104.29.27.30","BR"],
["104.29.27.33","BR"],
["104.29.27.38","BR"],
["104.29.27.56","BR"],
["104.29.27.46","BR"],
["104.29.27.75","BR"],
["104.29.27.78","BR"],
["104.29.27.100","BR"],
["104.29.27.105","BR"],
["104.29.27.111","BR"],
["104.29.27.120","BR"],
["104.29.27.159","BR"],
["104.29.27.177","BR"],
["104.29.27.171","BR"],
["104.29.27.206","BR"],
["104.29.27.196","BR"],
["104.29.27.227","BR"],
["104.29.27.225","BR"],
["104.29.27.244","BR"],
["104.29.28.11","BR"],
["104.29.28.24","BR"],
["104.29.28.44","BR"],
["104.29.28.58","BR"],
["104.29.28.67","BR"],
["104.29.28.73","BR"],
["104.29.28.106","BR"],
["104.29.28.112","BR"],
["104.29.28.127","BR"],
["104.29.28.117","BR"],
["104.29.28.125","BR"],
["104.29.28.116","BR"],
["104.29.28.132","BR"],
["104.29.28.142","BR"],
["104.29.28.159","BR"],
["104.29.28.176","BR"],
["104.29.28.175","BR"],
["104.29.28.172","BR"],
["104.29.28.192","BR"],
["104.29.28.218","BR"],
["104.29.28.222","BR"],
["104.29.28.225","BR"],
["104.29.28.246","BR"],
["104.29.29.8","BR"],
["104.29.29.18","BR"],
["104.29.29.14","BR"],
["104.29.29.12","BR"],
["104.29.29.30","BR"],
["104.29.29.48","BR"],
["104.29.29.49","BR"],
["104.29.29.58","BR"],
["104.29.29.67","BR"],
["104.29.29.72","BR"],
["104.29.29.76","BR"],
["104.29.29.73","BR"],
["104.29.29.91","BR"],
["104.29.29.114","BR"],
["104.29.29.131","BR"],
["104.29.29.128","BR"],
["104.29.29.141","BR"],
["104.29.29.140","BR"],
["104.29.29.157","BR"],
["104.29.29.162","BR"],
["104.29.29.155","BR"],
["104.29.29.165","BR"],
["104.29.29.187","BR"],
["104.29.29.202","BR"],
["104.29.29.214","BR"],
["104.29.29.226","BR"],
["104.29.29.225","BR"],
["104.29.29.232","BR"],
["104.29.29.238","BR"],
["104.29.30.16","BR"],
["104.29.30.18","BR"],
["104.29.30.20","BR"],
["104.29.30.32","BR"],
["104.29.30.21","BR"],
["104.29.30.42","BR"],
["104.29.30.41","BR"],
["104.29.30.61","BR"],
["104.29.30.54","BR"],
["104.29.30.64","BR"],
["104.29.30.79","BR"],
["104.29.30.135","BR"],
["104.29.30.166","BR"],
["104.29.30.165","BR"],
["104.29.30.180","BR"],
["104.29.30.196","BR"],
["104.29.30.211","BR"],
["104.29.30.215","BR"],
["104.29.30.225","BR"],
["104.29.30.220","BR"],
["104.29.30.243","BR"],
["104.29.30.234","BR"],
["104.29.31.0","XL"],
["104.29.31.17","XL"],
["104.29.31.55","XL"],
["104.29.31.57","XL"],
["104.29.31.68","XL"],
["104.29.31.69","XL"],
["104.29.31.62","XL"],
["104.29.31.78","XL"],
["104.29.31.95","XL"],
["104.29.31.100","XL"],
["104.29.31.128","XL"],
["104.29.31.122","XL"],
["104.29.31.154","XL"],
["104.29.31.162","XL"],
["104.29.31.175","XL"],
["104.29.31.192","XL"],
["104.29.31.193","XL"],
["104.29.31.235","XL"],
["104.29.32.11","BR"],
["104.29.32.27","BR"],
["104.29.32.43","BR"],
["104.29.32.51","BR"],
["104.29.32.52","BR"],
["104.29.32.85","BR"],
["104.29.32.110","BR"],
["104.29.32.112","BR"],
["104.29.32.130","BR"],
["104.29.32.135","BR"],
["104.29.32.131","BR"],
["104.29.32.136","BR"],
["104.29.32.150","BR"],
["104.29.32.153","BR"],
["104.29.32.165","BR"],
["104.29.32.105","BR"],
["104.29.32.183","BR"],
["104.29.32.215","BR"],
["104.29.32.224","BR"],
["104.29.32.234","BR"],
["104.29.32.241","BR"],
["104.29.32.252","BR"],
["104.29.33.10","BR"],
["104.29.33.16","BR"],
["104.29.33.54","BR"],
["104.29.33.48","BR"],
["104.29.33.63","BR"],
["104.29.33.62","BR"],
["104.29.33.69","BR"],
["104.29.33.81","BR"],
["104.29.33.120","BR"],
["104.29.33.132","BR"],
["104.29.33.124","BR"],
["104.29.33.123","BR"],
["104.29.33.147","BR"],
["104.29.33.136","BR"],
["104.29.33.137","BR"],
["104.29.33.188","BR"],
["104.29.33.195","BR"],
["104.29.33.194","BR"],
["104.29.33.199","BR"],
["104.29.33.207","BR"],
["104.29.33.217","BR"],
["104.29.33.221","BR"],
["104.29.33.236","BR"],
["104.29.34.3","BR"],
["104.29.34.2","BR"],
["104.29.34.12","BR"],
["104.29.34.48","BR"],
["104.29.34.74","BR"],
["104.29.33.232","BR"],
["104.29.34.104","BR"],
["104.29.34.129","BR"],
["104.29.34.120","BR"],
["104.29.34.127","BR"],
["104.29.34.141","BR"],
["104.29.34.155","BR"],
["104.29.34.153","BR"],
["104.29.34.161","BR"],
["104.29.34.175","BR"],
["104.29.34.187","BR"],
["104.29.34.182","BR"],
["104.29.34.204","BR"],
["104.29.34.235","BR"],
["104.29.34.253","BR"],
["104.29.35.75","AR"],
["104.29.35.68","AR"],
["104.29.35.90","AR"],
["104.29.35.107","AR"],
["104.29.35.132","AR"],
["104.29.35.171","AR"],
["104.29.35.244","AR"],
["104.29.36.4","BR"],
["104.29.36.10","BR"],
["104.29.36.19","BR"],
["104.29.36.36","BR"],
["104.29.36.93","BR"],
["104.29.36.123","BR"],
["104.29.36.140","BR"],
["104.29.36.155","BR"],
["104.29.36.201","BR"],
["104.29.36.246","BR"],
["104.29.37.56","XL"],
["104.29.37.66","XL"],
["104.29.37.79","XL"],
["104.29.37.100","XL"],
["104.29.37.148","XL"],
["104.29.37.180","XL"],
["104.29.37.201","XL"],
["104.29.37.220","XL"],
["104.29.37.247","XL"],
["104.29.38.50","BR"],
["104.29.38.98","BR"],
["104.29.38.161","BR"],
["104.29.38.225","BR"],
["104.29.39.24","BR"],
["104.29.39.30","BR"],
["104.29.39.42","BR"],
["104.29.39.35","BR"],
["104.29.39.65","BR"],
["104.29.39.145","BR"],
["104.29.39.150","BR"],
["104.29.39.202","BR"],
["104.29.39.226","BR"],
["104.29.40.74","WW"],
["104.29.40.81","WW"],
["104.29.40.97","WW"],
["104.29.40.122","WW"],
["104.29.40.112","WW"],
["104.29.40.138","WW"],
["104.29.40.153","WW"],
["104.29.40.169","WW"],
["104.29.40.165","WW"],
["104.29.40.184","WW"],
["104.29.40.227","WW"],
["104.29.41.3","FR"],
["104.29.41.42","FR"],
["104.29.41.50","FR"],
["104.29.41.62","FR"],
["104.29.41.110","FR"],
["104.29.41.139","FR"],
["104.29.41.150","FR"],
["104.29.41.156","FR"],
["104.29.41.175","FR"],
["104.29.41.166","FR"],
["104.29.41.224","FR"],
["104.29.41.235","FR"],
["104.29.41.237","FR"],
["104.29.41.245","FR"],
["104.29.41.251","FR"],
["104.29.42.27","FR"],
["104.29.42.72","FR"],
["104.29.42.97","FR"],
["104.29.42.106","FR"],
["104.29.42.137","FR"],
["104.29.42.109","FR"],
["104.29.42.144","FR"],
["104.29.42.166","FR"],
["104.29.42.185","FR"],
["104.29.42.184","FR"],
["104.29.42.196","FR"],
["104.29.42.245","FR"],
["104.29.42.247","FR"],
["104.29.43.5","FR"],
["104.29.43.1","FR"],
["104.29.43.11","FR"],
["104.29.43.15","FR"],
["104.29.43.27","FR"],
["104.29.43.52","FR"],
["104.29.43.42","FR"],
["104.29.43.78","FR"],
["104.29.43.99","FR"],
["104.29.43.111","FR"],
["104.29.43.106","FR"],
["104.29.43.130","FR"],
["104.29.43.136","FR"],
["104.29.43.145","FR"],
["104.29.43.178","FR"],
["104.29.43.177","FR"],
["104.29.43.185","FR"],
["104.29.44.42","FR"],
["104.29.44.47","FR"],
["104.29.44.54","FR"],
["104.29.44.63","FR"],
["104.29.44.95","FR"],
["104.29.44.154","FR"],
["104.29.44.186","FR"],
["104.29.44.207","FR"],
["104.29.44.220","FR"],
["104.29.44.225","FR"],
["104.29.45.27","IT"],
["104.29.45.47","IT"],
["104.29.45.96","IT"],
["104.29.45.104","IT"],
["104.29.45.125","IT"],
["104.29.45.133","IT"],
["104.29.45.184","IT"],
["104.29.45.186","IT"],
["104.29.45.199","IT"],
["104.29.45.203","IT"],
["104.29.45.213","IT"],
["104.29.46.1","US"],
["104.29.46.22","US"],
["104.29.46.37","US"],
["104.29.46.58","US"],
["104.29.46.78","US"],
["104.29.46.110","US"],
["104.29.46.132","US"],
["104.29.46.138","US"],
["104.29.46.168","US"],
["104.29.46.229","US"],
["104.29.47.13","US"],
["104.29.47.32","US"],
["104.29.47.38","US"],
["104.29.47.50","US"],
["104.29.47.87","US"],
["104.29.47.123","US"],
["104.29.47.133","US"],
["104.29.47.179","US"],
["104.29.47.186","US"],
["104.29.47.249","US"],
["104.29.48.97","US"],
["104.29.48.94","US"],
["104.29.48.99","US"],
["104.29.48.129","US"],
["104.29.48.147","US"],
["104.29.48.185","US"],
["104.29.49.105","US"],
["104.29.49.121","US"],
["104.29.49.162","US"],
["104.29.49.184","US"],
["104.29.49.182","US"],
["104.29.49.212","US"],
["104.29.49.220","US"],
["104.29.50.0","US"],
["104.29.50.41","US"],
["104.29.50.51","US"],
["104.29.50.82","US"],
["104.29.50.88","US"],
["104.29.50.111","US"],
["104.29.50.110","US"],
["104.29.50.147","US"],
["104.29.50.169","US"],
["104.29.50.190","US"],
["104.29.50.215","US"],
["104.29.50.231","US"],
["104.29.50.254","US"],
["104.29.51.68","FR"],
["104.29.51.55","FR"],
["104.29.51.71","FR"],
["104.29.51.106","FR"],
["104.29.51.112","FR"],
["104.29.51.125","FR"],
["104.29.51.157","FR"],
["104.29.51.169","FR"],
["104.29.51.206","FR"],
["104.29.52.12","CL"],
["104.29.52.62","CL"],
["104.29.52.48","CL"],
["104.29.52.74","CL"],
["104.29.52.75","CL"],
["104.29.52.77","CL"],
["104.29.52.104","CL"],
["104.29.52.121","CL"],
["104.29.52.156","CL"],
["104.29.52.167","CL"],
["104.29.52.163","CL"],
["104.29.52.181","CL"],
["104.29.52.178","CL"],
["104.29.52.189","CL"],
["104.29.52.193","CL"],
["104.29.52.197","CL"],
["104.29.52.209","CL"],
["104.29.53.9","US"],
["104.29.53.25","US"],
["104.29.53.22","US"],
["104.29.53.54","US"],
["104.29.53.104","US"],
["104.29.53.117","US"],
["104.29.53.109","US"],
["104.29.53.124","US"],
["104.29.53.123","US"],
["104.29.53.139","US"],
["104.29.53.145","US"],
["104.29.53.212","US"],
["104.29.53.211","US"],
["104.29.53.244","US"],
["104.29.54.17","US"],
["104.29.54.37","US"],
["104.29.54.53","US"],
["104.29.54.76","US"],
["104.29.54.141","US"],
["104.29.54.164","US"],
["104.29.54.196","US"],
["104.29.54.210","US"],
["104.29.54.212","US"],
["104.29.54.249","US"],
["104.29.54.252","US"],
["104.29.55.41","US"],
["104.29.55.66","US"],
["104.29.55.84","US"],
["104.29.55.96","US"],
["104.29.55.144","US"],
["104.29.55.167","US"],
["104.29.55.209","US"],
["104.29.55.204","US"],
["104.29.55.231","US"],
["104.29.56.5","GB"],
["104.29.56.23","GB"],
["104.29.56.108","GB"],
["104.29.56.171","GB"],
["104.29.56.194","GB"],
["104.29.57.23","GB"],
["104.29.57.106","GB"],
["104.29.57.135","GB"],
["104.29.57.170","GB"],
["104.29.57.223","GB"],
["104.29.57.213","GB"],
["104.29.59.2","HK"],
["104.29.59.26","HK"],
["104.29.59.104","HK"],
["104.29.59.148","HK"],
["104.29.59.176","HK"],
["104.29.59.230","HK"],
["104.29.59.249","HK"],
["104.29.59.252","HK"],
["104.29.60.1","FR"],
["104.29.60.101","FR"],
["104.29.60.95","FR"],
["104.29.60.127","FR"],
["104.29.60.148","FR"],
["104.29.60.167","FR"],
["104.29.60.158","FR"],
["104.29.60.194","FR"],
["104.29.60.198","FR"],
["104.29.60.212","FR"],
["104.29.60.225","FR"],
["104.29.60.195","FR"]
];

