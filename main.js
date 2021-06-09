const core = require('@actions/core');
const exec = require('@actions/exec');
const tc = require('@actions/tool-cache');
const { Octokit } = require("@octokit/rest");

const baseDownloadURL = "https://github.com/hetznercloud/cli/releases/download"
const fallbackVersion = "1.23.0"
const octokit = new Octokit();

async function downloadDoctl(version) {
    if (process.platform === 'win32') {
        const doctlDownload = await tc.downloadTool(`${baseDownloadURL}/v${version}/hcloud-windows-amd64.zip`);
        return tc.extractZip(doctlDownload);
    }
    if (process.platform === 'darwin') {
        const doctlDownload = await tc.downloadTool(`${baseDownloadURL}/v${version}/hcloud-macos-amd64.zip`);
        return tc.extractZip(doctlDownload);
    }
    const doctlDownload = await tc.downloadTool(`${baseDownloadURL}/v${version}/hcloud-linux-amd64.tar.gz`);
    return tc.extractTar(doctlDownload);
}

async function run() {
  try { 
    var version = core.getInput('version');
    if ((!version) || (version.toLowerCase() === 'latest')) {
        version = await octokit.repos.getLatestRelease({
            owner: 'hetznercloud',
            repo: 'cli'
        }).then(result => {
            return result.data.name;
        }).catch(error => {
            // GitHub rate-limits are by IP address and runners can share IPs.
            // This mostly effects macOS where the pool of runners seems limited.
            // Fallback to a known version if API access is rate limited.
            core.warning(`${error.message}

Failed to retrieve latest version; falling back to: ${fallbackVersion}`);
            return fallbackVersion;
        });
    }
    if (version.charAt(0) === 'v') {
        version = version.substr(1);
    }

    var path = tc.find("hcloud", version);
    if (!path) {
        const installPath = await downloadDoctl(version);
        path = await tc.cacheDir(installPath, 'hcloud', version);
    }
    core.addPath(path);
    core.info(`>>> hcloud version v${version} installed to ${path}`);

    var token = core.getInput('token', { required: true });
    process.env.HCLOUD_TOKEN = token;
    await exec.exec('hcloud datacenter list');
    core.info('>>> Successfully installed hcloud and confirmed API key');
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run();
