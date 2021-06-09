# GitHub Actions for Hetzner Cloud

This action enables you to interact with [hetzner cloud](https://www.hetzner.com/cloud) services by installing [the `hcloud` command-line client](https://github.com/hetznercloud/cli/).

## Usage

To install the latest version of `hcloud` and use it in GitHub Actions workflows, add the following step:

```yaml
    - name: Install hcloud
      uses: techknowlogick/action-hcloud@v2
      with:
        token: ${{ secrets.HCLOUD_TOKEN }}
```

`hcloud` will now be available in the virtual environment and can be used directly in following steps. 

### Arguments

- `token` – (**Required**) A Hetzner Cloud API Key
- `version` – (Optional) The version of `hcloud` to install. If excluded, the latest release will be used.

## Contributing

To install the needed dependencies, run `npm install`. The resulting `node_modules/` directory _is not_ checked in to Git.

Before submitting a pull request, run `npm run package` to package the code [using `ncc`](https://github.com/zeit/ncc#ncc). Packaging assembles the code including dependencies into one file in the `dist/` directory that is checked in to Git.

Pull requests should be made against the `v2` branch.

## License

This GitHub Action and associated scripts and documentation in this project are released under the [MIT License](LICENSE).

## Credits

Forked from DigitalOcean's doctl action
